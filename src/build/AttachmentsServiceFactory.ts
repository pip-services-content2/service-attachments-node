import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { AttachmentsMongoDbPersistence } from '../persistence/AttachmentsMongoDbPersistence';
import { AttachmentsFilePersistence } from '../persistence/AttachmentsFilePersistence';
import { AttachmentsMemoryPersistence } from '../persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../logic/AttachmentsController';
import { AttachmentsHttpServiceV1 } from '../services/version1/AttachmentsHttpServiceV1';

export class AttachmentsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-attachments", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-attachments", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-attachments", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-attachments", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-attachments", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-attachments", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AttachmentsServiceFactory.MemoryPersistenceDescriptor, AttachmentsMemoryPersistence);
		this.registerAsType(AttachmentsServiceFactory.FilePersistenceDescriptor, AttachmentsFilePersistence);
		this.registerAsType(AttachmentsServiceFactory.MongoDbPersistenceDescriptor, AttachmentsMongoDbPersistence);
		this.registerAsType(AttachmentsServiceFactory.ControllerDescriptor, AttachmentsController);
		this.registerAsType(AttachmentsServiceFactory.HttpServiceDescriptor, AttachmentsHttpServiceV1);
	}
	
}
