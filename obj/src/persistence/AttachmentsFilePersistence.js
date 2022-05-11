"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const AttachmentsMemoryPersistence_1 = require("./AttachmentsMemoryPersistence");
class AttachmentsFilePersistence extends AttachmentsMemoryPersistence_1.AttachmentsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.AttachmentsFilePersistence = AttachmentsFilePersistence;
//# sourceMappingURL=AttachmentsFilePersistence.js.map