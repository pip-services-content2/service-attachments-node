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
exports.AttachmentsMongoDbPersistence = void 0;
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class AttachmentsMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('attachments');
    }
    addReference(correlationId, id, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {
                _id: id
            };
            let data = {
                $addToSet: {
                    references: {
                        id: reference.id,
                        type: reference.type,
                        name: reference.name
                    }
                }
            };
            let options = {
                returnOriginal: false,
                returnNewDocument: true,
                upsert: true
            };
            let result = yield this._collection.findOneAndUpdate(filter, data, options);
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (newItem != null)
                this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);
            return newItem;
        });
    }
    removeReference(correlationId, id, reference) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {
                _id: id
            };
            let data = {
                $pull: {
                    references: {
                        id: reference.id,
                        type: reference.type
                    }
                }
            };
            let options = {
                returnOriginal: false,
                returnNewDocument: true
            };
            let result = yield this._collection.findOneAndUpdate(filter, data, options);
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (newItem != null)
                this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);
            return newItem;
        });
    }
}
exports.AttachmentsMongoDbPersistence = AttachmentsMongoDbPersistence;
//# sourceMappingURL=AttachmentsMongoDbPersistence.js.map