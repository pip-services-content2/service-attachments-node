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
exports.AttachmentsMemoryPersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const BlobAttachmentV1_1 = require("../data/version1/BlobAttachmentV1");
class AttachmentsMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    addReference(correlationId, id, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((x) => x.id == id);
            if (item != null) {
                item.references = item.references.filter((r) => {
                    return !(r.id == reference.id && r.type == reference.type);
                });
                item.references.push(reference);
            }
            else {
                item = new BlobAttachmentV1_1.BlobAttachmentV1(id, [reference]);
                this._items.push(item);
            }
            this._logger.trace(correlationId, "Added reference to %s", id);
            yield this.save(correlationId);
            return item;
        });
    }
    removeReference(correlationId, id, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = this._items.find((x) => x.id == id);
            let removed = false;
            if (item != null) {
                let oldLength = item.references.length;
                item.references = item.references.filter((r) => {
                    return !(r.id == reference.id && r.type == reference.type);
                });
                removed = item.references.length != oldLength;
            }
            if (removed) {
                this._logger.trace(correlationId, "Removed reference to %s", id);
                yield this.save(correlationId);
            }
            return item;
        });
    }
}
exports.AttachmentsMemoryPersistence = AttachmentsMemoryPersistence;
//# sourceMappingURL=AttachmentsMemoryPersistence.js.map