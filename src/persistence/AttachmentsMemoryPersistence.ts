import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';

export class AttachmentsMemoryPersistence 
    extends IdentifiableMemoryPersistence<BlobAttachmentV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super();
    }

    public async addReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1> {
        let item: BlobAttachmentV1 = this._items.find((x) => x.id == id);

        if (item != null) {
            item.references = item.references.filter((r) => {
                return !(r.id == reference.id && r.type == reference.type);
            });
            item.references.push(reference)
        } else {
            item = new BlobAttachmentV1(id, [reference]);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Added reference to %s", id);

        await this.save(correlationId);

        return item;
    }

    public async removeReference(correlationId: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1> {
        let item: BlobAttachmentV1 = this._items.find((x) => x.id == id);
        
        let removed = false;

        if (item != null) {
            let oldLength = item.references.length;
            item.references = item.references.filter((r) => {
                return !(r.id == reference.id && r.type == reference.type);
            });
            removed = item.references.length != oldLength;
        }

        if (removed) {
            this._logger.trace(correlationId, "Removed reference to %s", id);

            await this.save(correlationId);
        }
        
        return item;
    }

}
