import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';

export class AttachmentsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<BlobAttachmentV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super('attachments');
    }

    public async addReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1> {

        let filter = {
            _id: id
        };

        let data = {
            $addToSet: { 
                references: { 
                    id: reference.id,
                    type: reference.type,
                    name: reference.name
                }
            }
        }

        let options = {
            returnOriginal: false,
            returnNewDocument: true,
            upsert: true
        };
        
        let result = await this._collection.findOneAndUpdate(filter, data, options);

        let newItem = result ? this.convertToPublic(result.value) : null;
        if (newItem != null)
            this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);

        return newItem;
    }

    public async removeReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1> {

        let filter = {
            _id: id
        };

        let data = {
            $pull: { 
                references: { 
                    id: reference.id,
                    type: reference.type
                }
            }
        }

        let options = {
            returnOriginal: false,
            returnNewDocument: true
        };
        
        let result = await this._collection.findOneAndUpdate(filter, data, options);

        let newItem = result ? this.convertToPublic(result.value) : null;
        if (newItem != null)
            this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);

        return newItem;
    }
    
}
