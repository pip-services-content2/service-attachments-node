const assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { AttachmentsMemoryPersistence } from '../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../src/logic/AttachmentsController';


suite('AttachmentsController', ()=> {
    let persistence: AttachmentsMemoryPersistence;
    let controller: AttachmentsController;

    suiteSetup(() => {
        persistence = new AttachmentsMemoryPersistence();
        controller = new AttachmentsController();

        let logger = new ConsoleLogger();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-attachments', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-attachments', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
        
    setup(async () => {
        await persistence.clear(null);
    });
    
    test('CRUD Operations', async () => {
        // Add attachments
        await controller.addAttachments(
            null,
            {
                type: 'goal',
                id: '000000000000000000000011',
                name: 'Goal 1'
            },
            ['1', '2']
        );

        // Add other attachments
        await controller.addAttachments(
            null,
            {
                type: 'goal',
                id: '000000000000000000000012',
                name: 'Goal 2'
            },
            ['2', '3']
        );

        // Check attachments has references
        let item = await controller.getAttachmentById(
            null,
            '2'
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 2);

        // Remove reference
        await controller.updateAttachments(
            null,
            {
                type: 'goal',
                id: '000000000000000000000011',
                name: null
            },
            ['1', '2'],
            ['1']
        );

        // Remove another reference
        await controller.removeAttachments(
            null,
            {
                type: 'goal',
                id: '000000000000000000000011',
                name: null
            },
            ['1']
        );

        // Remove attachments
        item = await controller.deleteAttachmentById(null, '1');

        assert.isNull(item);

        // Try to get deleted attachments
        item = await controller.getAttachmentById(null, '2');

        assert.isObject(item);
        assert.lengthOf(item.references, 1);

        let reference = item.references[0];
        assert.equal('000000000000000000000012', reference.id);
    });
});