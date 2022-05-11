"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const AttachmentsCommandSet_1 = require("./AttachmentsCommandSet");
class AttachmentsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(AttachmentsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._blobsClient = this._dependencyResolver.getOneOptional('blobs');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new AttachmentsCommandSet_1.AttachmentsCommandSet(this);
        return this._commandSet;
    }
    getAttachmentById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, id);
        });
    }
    addAttachments(correlationId, reference, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let attachments = [];
            // Record new references to all blobs
            for (let id of ids) {
                let attachment = yield this._persistence.addReference(correlationId, id, reference);
                if (attachment)
                    attachments.push(attachment);
            }
            // Mark new blobs completed
            let blobIds = [];
            for (let a of attachments) {
                if (a.references && a.references.length <= 1)
                    blobIds.push(a.id);
            }
            if (this._blobsClient != null && blobIds.length > 0)
                yield this._blobsClient.markBlobsCompleted(correlationId, blobIds);
            return attachments;
        });
    }
    updateAttachments(correlationId, reference, oldIds, newIds) {
        return __awaiter(this, void 0, void 0, function* () {
            let attachments = [];
            let ids = oldIds.filter(x => !newIds.includes(x));
            // Remove obsolete ids
            if (ids.length > 0) {
                let removedAttachments = yield this.removeAttachments(correlationId, reference, ids);
                for (let removeAttachment of removedAttachments)
                    attachments.push(removeAttachment);
            }
            ids = newIds.filter(x => !oldIds.includes(x));
            // Add new ids
            if (ids.length > 0) {
                let addAttachments = yield this.addAttachments(correlationId, reference, ids);
                for (let addAttachment of addAttachments)
                    attachments.push(addAttachment);
            }
            return attachments;
        });
    }
    removeAttachments(correlationId, reference, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let attachments = [];
            for (let id of ids) {
                let attachment = yield this._persistence.removeReference(correlationId, id, reference);
                if (attachment)
                    attachments.push(attachment);
                if (attachment.references == null || attachment.references.length == 0)
                    yield this.deleteAttachmentById(correlationId, attachment.id);
            }
            return attachments;
        });
    }
    deleteAttachmentById(correlationId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let attachment = yield this._persistence.deleteById(correlationId, id);
            if (this._blobsClient != null) {
                yield this._blobsClient.deleteBlobById(correlationId, id);
            }
            return attachment;
        });
    }
}
exports.AttachmentsController = AttachmentsController;
AttachmentsController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-attachments:persistence:*:*:1.0', 'dependencies.blobs', 'pip-services-blos:client:*:*:1.0');
//# sourceMappingURL=AttachmentsController.js.map