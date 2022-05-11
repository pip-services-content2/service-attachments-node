import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IBlobsClientV1 } from 'client-blobs-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from '../persistence/IAttachmentsPersistence';
import { IAttachmentsController } from './IAttachmentsController';
import { AttachmentsCommandSet } from './AttachmentsCommandSet';

export class AttachmentsController implements IConfigurable, IReferenceable, ICommandable, IAttachmentsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-attachments:persistence:*:*:1.0',
        'dependencies.blobs', 'pip-services-blos:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(AttachmentsController._defaultConfig);
    private _persistence: IAttachmentsPersistence;
    private _blobsClient: IBlobsClientV1;
    private _commandSet: AttachmentsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IAttachmentsPersistence>('persistence');
        this._blobsClient = this._dependencyResolver.getOneOptional<IBlobsClientV1>('blobs');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new AttachmentsCommandSet(this);
        return this._commandSet;
    }

    public async getAttachmentById(correlationId: string, id: string): Promise<BlobAttachmentV1> {
        return await this._persistence.getOneById(correlationId, id);
    }
    
    public async addAttachments(correlationId: string, reference: ReferenceV1, ids: string[]): Promise<BlobAttachmentV1[]> {
        let attachments: BlobAttachmentV1[] = [];

        // Record new references to all blobs
        for (let id of ids) {
            let attachment = await this._persistence.addReference(correlationId, id, reference);
            if (attachment)
                attachments.push(attachment);
        }

        // Mark new blobs completed
        let blobIds = [];
        for (let a of attachments) {
            if (a.references && a.references.length <= 1)
                blobIds.push(a.id);
        }

        if (this._blobsClient != null && blobIds.length > 0)
            await this._blobsClient.markBlobsCompleted(correlationId, blobIds);

        return attachments;
    }

    public async updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[]): Promise<BlobAttachmentV1[]> {

        let attachments: BlobAttachmentV1[] = [];
        
        let ids = oldIds.filter(x => !newIds.includes(x));
        
        // Remove obsolete ids
        if (ids.length > 0) {
            
            let removedAttachments = await this.removeAttachments(correlationId, reference, ids);
            
            for (let removeAttachment of removedAttachments)
                attachments.push(removeAttachment);
        }
        
        ids = newIds.filter(x => !oldIds.includes(x));

        // Add new ids
        if (ids.length > 0) {
            let addAttachments = await this.addAttachments(correlationId, reference, ids);

            for (let addAttachment of addAttachments)
                attachments.push(addAttachment);
        }

        return attachments;
    }

    public async removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[]): Promise<BlobAttachmentV1[]> {
        let attachments: BlobAttachmentV1[] = [];
        
        for (let id of ids) {
            let attachment = await this._persistence.removeReference(correlationId, id, reference);
            if (attachment)
                attachments.push(attachment);
            if (attachment.references == null || attachment.references.length == 0)
                await this.deleteAttachmentById(correlationId, attachment.id)
        }

        return attachments;
    }

    public async deleteAttachmentById(correlationId: string, id: string): Promise<BlobAttachmentV1> {
        let attachment = await this._persistence.deleteById(correlationId, id);
        if (this._blobsClient != null) {
            await this._blobsClient.deleteBlobById(correlationId, id)
        }

        return attachment;
    }
}
