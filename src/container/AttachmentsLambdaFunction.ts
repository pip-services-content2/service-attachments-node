import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';

export class AttachmentsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("attachments", "Blob attachments function");
        this._dependencyResolver.put('controller', new Descriptor('service-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsServiceFactory());
    }
}

export const handler = new AttachmentsLambdaFunction().getHandler();