import { ProcessContainer } from 'pip-services3-container-nodex';

import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';

import { BlobsClientFactory } from 'client-blobs-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory);
        this._factories.add(new BlobsClientFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
