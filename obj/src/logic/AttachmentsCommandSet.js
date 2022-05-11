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
exports.AttachmentsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const ReferenceV1Schema_1 = require("../data/version1/ReferenceV1Schema");
class AttachmentsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetAttachmentByIdCommand());
        this.addCommand(this.makeAddAttachmentsCommand());
        this.addCommand(this.makeUpdateAttachmentsCommand());
        this.addCommand(this.makeRemoveAttachmentsCommand());
        this.addCommand(this.makeDeleteAttachmentByIdCommand());
    }
    makeGetAttachmentByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_attachment_by_id", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('id', pip_services3_commons_nodex_5.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("id");
            return yield this._logic.getAttachmentById(correlationId, id);
        }));
    }
    makeAddAttachmentsCommand() {
        return new pip_services3_commons_nodex_2.Command("add_attachments", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('reference', new ReferenceV1Schema_1.ReferenceV1Schema())
            .withRequiredProperty('ids', new pip_services3_commons_nodex_4.ArraySchema(pip_services3_commons_nodex_5.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reference = args.get("reference");
            let ids = args.get("ids");
            return yield this._logic.addAttachments(correlationId, reference, ids);
        }));
    }
    makeUpdateAttachmentsCommand() {
        return new pip_services3_commons_nodex_2.Command("update_attachments", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('reference', new ReferenceV1Schema_1.ReferenceV1Schema())
            .withRequiredProperty('old_ids', new pip_services3_commons_nodex_4.ArraySchema(pip_services3_commons_nodex_5.TypeCode.String))
            .withRequiredProperty('new_ids', new pip_services3_commons_nodex_4.ArraySchema(pip_services3_commons_nodex_5.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reference = args.get("reference");
            let oldIds = args.get("old_ids");
            let newIds = args.get("new_ids");
            return yield this._logic.updateAttachments(correlationId, reference, oldIds, newIds);
        }));
    }
    makeRemoveAttachmentsCommand() {
        return new pip_services3_commons_nodex_2.Command("remove_attachments", new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('reference', new ReferenceV1Schema_1.ReferenceV1Schema())
            .withRequiredProperty('ids', new pip_services3_commons_nodex_4.ArraySchema(pip_services3_commons_nodex_5.TypeCode.String)), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let reference = args.get("reference");
            let ids = args.get("ids");
            return yield this._logic.removeAttachments(correlationId, reference, ids);
        }));
    }
    makeDeleteAttachmentByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_attachment_by_id", null, (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let id = args.getAsNullableString("id");
            return yield this._logic.deleteAttachmentById(correlationId, id);
        }));
    }
}
exports.AttachmentsCommandSet = AttachmentsCommandSet;
//# sourceMappingURL=AttachmentsCommandSet.js.map