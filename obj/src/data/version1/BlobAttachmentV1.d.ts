import { IStringIdentifiable } from 'pip-services3-commons-nodex';
import { ReferenceV1 } from './ReferenceV1';
export declare class BlobAttachmentV1 implements IStringIdentifiable {
    constructor(id: string, references?: ReferenceV1[]);
    id: string;
    references: ReferenceV1[];
}
