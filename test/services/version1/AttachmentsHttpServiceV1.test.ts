const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { AttachmentsMemoryPersistence } from '../../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../../src/logic/AttachmentsController';
import { AttachmentsHttpServiceV1 } from '../../../src/services/version1/AttachmentsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('AttachmentsHttpServiceV1', ()=> {
    let service: AttachmentsHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new AttachmentsMemoryPersistence();
        let controller = new AttachmentsController();

        service = new AttachmentsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-attachments', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-attachments', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-attachments', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
     test('CRUD Operations', async () => {
        // Add attachments
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/attachments/add_attachments',
                {
                    reference: {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: 'Goal 1'
                    },
                    ids: ['1', '2']
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Add other attachments
         await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/add_attachments',
                 {
                     reference: {
                         type: 'goal',
                         id: '000000000000000000000012',
                         name: 'Goal 2'
                     },
                     ids: ['2', '3']
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         // Check attachments has references
         let item = await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/get_attachment_by_id',
                 {
                     id: '2'
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         assert.isObject(item);
         assert.lengthOf(item.references, 2);

         item = await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/update_attachments',
                 {
                     reference: {
                         type: 'goal',
                         id: '000000000000000000000011',
                         name: null
                     },
                     old_ids: ['1', '2'],
                     new_ids: ['1']
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         // Remove another reference
         item = await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/remove_attachments',
                 {
                     reference: {
                         type: 'goal',
                         id: '000000000000000000000011',
                         name: null
                     },
                     ids: ['1']
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         // Remove attachments
         item = await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/delete_attachment_by_id',
                 {
                     id: '1'
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         //assert.isNull(item);

         // Try to get deleted attachments
         item = await new Promise<any>((resolve, reject) => {
             rest.post('/v1/attachments/get_attachment_by_id',
                 {
                     id: '2'
                 },
                 (err, req, res, result) => {
                     if (err == null) resolve(result);
                     else reject(err);
                 }
             );
         });

         assert.isObject(item);
         assert.lengthOf(item.references, 1);

         let reference = item.references[0];
         assert.equal('000000000000000000000012', reference.id);
    });

});