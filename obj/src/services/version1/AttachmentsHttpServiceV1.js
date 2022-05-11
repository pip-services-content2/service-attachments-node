"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class AttachmentsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/attachments');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-attachments', 'controller', 'default', '*', '1.0'));
    }
}
exports.AttachmentsHttpServiceV1 = AttachmentsHttpServiceV1;
//# sourceMappingURL=AttachmentsHttpServiceV1.js.map