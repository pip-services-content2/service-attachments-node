import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class AttachmentsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/attachments');
        this._dependencyResolver.put('controller', new Descriptor('service-attachments', 'controller', 'default', '*', '1.0'));
    }
}