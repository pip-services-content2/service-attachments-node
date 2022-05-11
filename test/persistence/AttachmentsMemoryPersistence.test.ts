import { AttachmentsMemoryPersistence } from '../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsMemoryPersistence', ()=> {
    let persistence: AttachmentsMemoryPersistence;
    let fixture: AttachmentsPersistenceFixture;
    
    setup(async () => {
        persistence = new AttachmentsMemoryPersistence();
        fixture = new AttachmentsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

});