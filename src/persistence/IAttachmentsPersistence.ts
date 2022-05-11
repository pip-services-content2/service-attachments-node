import { IGetter } from 'pip-services3-data-nodex';

import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';

export interface IAttachmentsPersistence extends IGetter<BlobAttachmentV1, string>
{
    getOneById(correlation_id: string, id: string): Promise<BlobAttachmentV1>;

    addReference(correlation_id: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1>;

    removeReference(correlation_id: string, id: string, reference: ReferenceV1): Promise<BlobAttachmentV1>;
    
    deleteById(correlation_id: string, id: string): Promise<BlobAttachmentV1>;
}
