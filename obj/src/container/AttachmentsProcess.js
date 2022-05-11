"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
const client_blobs_node_1 = require("client-blobs-node");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class AttachmentsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory);
        this._factories.add(new client_blobs_node_1.BlobsClientFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map