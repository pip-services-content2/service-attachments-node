import { IStringIdentifiable } from 'pip-services3-commons-nodex';

import { ReferenceV1 } from './ReferenceV1';

export class BlobAttachmentV1 implements IStringIdentifiable {

    public constructor(id: string, references?: ReferenceV1[]) {
        this.id = id;
        this.references = references || [];
    }

    public id: string;
    public references: ReferenceV1[];

}