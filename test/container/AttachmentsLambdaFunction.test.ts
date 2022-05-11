const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { AttachmentsLambdaFunction } from '../../src/container/AttachmentsLambdaFunction';


suite('AttachmentsLambdaFunction', ()=> {
    let lambda: AttachmentsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-attachments:persistence:memory:default:1.0',
            'controller.descriptor', 'service-attachments:controller:default:default:1.0'
        );

        lambda = new AttachmentsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        // Add attachments
        await lambda.act(
            {
                role: 'attachments',
                cmd: 'add_attachments',
                reference: {
                    type: 'goal',
                    id: '000000000000000000000011',
                    name: 'Goal 1'
                },
                ids: ['1', '2']
            }
        );

        // Add other attachments
        await lambda.act(
            {
                role: 'attachments',
                cmd: 'add_attachments',
                reference: {
                    type: 'goal',
                    id: '000000000000000000000012',
                    name: 'Goal 2'
                },
                ids: ['2', '3']
            }
        );

        // Check attachments has references
        let item = await lambda.act(
            {
                role: 'attachments',
                cmd: 'get_attachment_by_id',
                id: '2'
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 2);

        // Remove reference
        await lambda.act(
            {
                role: 'attachments',
                cmd: 'update_attachments',
                reference: {
                    type: 'goal',
                    id: '000000000000000000000011',
                    name: null
                },
                old_ids: ['1', '2'],
                new_ids: ['1']
            }
        );

        // Remove another reference
        await lambda.act(
            {
                role: 'attachments',
                cmd: 'remove_attachments',
                reference: {
                    type: 'goal',
                    id: '000000000000000000000011',
                    name: null
                },
                ids: ['1']
            }
        );

        // Remove attachments
        item = await lambda.act(
            {
                role: 'attachments',
                cmd: 'delete_attachment_by_id',
                id: '1'
            }
        );

        assert.isNull(item);

        // Try to get deleted attachments
        item = await lambda.act(
            {
                role: 'attachments',
                cmd: 'get_attachment_by_id',
                id: '2'
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 1);

        let reference = item.references[0];
        assert.equal('000000000000000000000012', reference.id);
    });
});