"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.AttachmentsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
class AttachmentsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("attachments", "Blob attachments function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory());
    }
}
exports.AttachmentsLambdaFunction = AttachmentsLambdaFunction;
exports.handler = new AttachmentsLambdaFunction().getHandler();
//# sourceMappingURL=AttachmentsLambdaFunction.js.map