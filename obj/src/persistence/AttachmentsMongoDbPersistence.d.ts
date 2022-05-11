import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
export declare class AttachmentsMongoDbPersistence extends IdentifiableMongoDbPersistence<BlobAttachmentV1, string> implements IAttachmentsPersistence {
    constructor();
    addReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1>;
    removeReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1>;
}
