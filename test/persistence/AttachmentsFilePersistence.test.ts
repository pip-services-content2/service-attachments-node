import { AttachmentsFilePersistence } from '../../src/persistence/AttachmentsFilePersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsFilePersistence', ()=> {
    let persistence: AttachmentsFilePersistence;
    let fixture: AttachmentsPersistenceFixture;
    
    setup(async () => {
        persistence = new AttachmentsFilePersistence('./data/attachments.test.json');

        fixture = new AttachmentsPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });
});