"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const AttachmentsMongoDbPersistence_1 = require("../persistence/AttachmentsMongoDbPersistence");
const AttachmentsFilePersistence_1 = require("../persistence/AttachmentsFilePersistence");
const AttachmentsMemoryPersistence_1 = require("../persistence/AttachmentsMemoryPersistence");
const AttachmentsController_1 = require("../logic/AttachmentsController");
const AttachmentsHttpServiceV1_1 = require("../services/version1/AttachmentsHttpServiceV1");
class AttachmentsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(AttachmentsServiceFactory.MemoryPersistenceDescriptor, AttachmentsMemoryPersistence_1.AttachmentsMemoryPersistence);
        this.registerAsType(AttachmentsServiceFactory.FilePersistenceDescriptor, AttachmentsFilePersistence_1.AttachmentsFilePersistence);
        this.registerAsType(AttachmentsServiceFactory.MongoDbPersistenceDescriptor, AttachmentsMongoDbPersistence_1.AttachmentsMongoDbPersistence);
        this.registerAsType(AttachmentsServiceFactory.ControllerDescriptor, AttachmentsController_1.AttachmentsController);
        this.registerAsType(AttachmentsServiceFactory.HttpServiceDescriptor, AttachmentsHttpServiceV1_1.AttachmentsHttpServiceV1);
    }
}
exports.AttachmentsServiceFactory = AttachmentsServiceFactory;
AttachmentsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "factory", "default", "default", "1.0");
AttachmentsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "persistence", "memory", "*", "1.0");
AttachmentsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "persistence", "file", "*", "1.0");
AttachmentsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "persistence", "mongodb", "*", "1.0");
AttachmentsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "controller", "default", "*", "1.0");
AttachmentsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-attachments", "service", "http", "*", "1.0");
//# sourceMappingURL=AttachmentsServiceFactory.js.map