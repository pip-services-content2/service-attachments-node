const assert = require('chai').assert;

import { IAttachmentsPersistence } from '../../src/persistence/IAttachmentsPersistence';

export class AttachmentsPersistenceFixture {
    private _persistence: IAttachmentsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async testCrudOperations() {
        // Add reference
        let item = await this._persistence.addReference(
            null,
            '1',
            {
                type: 'goal',
                id: '000000000000000000000011',
                name: 'Goal 1'
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 1);

        // Add another reference
        item = await this._persistence.addReference(
            null,
            '1',
            {
                type: 'goal',
                id: '000000000000000000000012',
                name: 'Goal 2'
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 2);

        // Add reference again
        item = await this._persistence.addReference(
            null,
            '1',
            {
                type: 'goal',
                id: '000000000000000000000012',
                name: 'Goal 2'
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 2);

        // Check attachments has references
        item = await this._persistence.getOneById(null, '1');

        assert.isObject(item);
        assert.lengthOf(item.references, 2);

        // Remove reference
        item = await this._persistence.removeReference(
            null,
            '1',
            {
                type: 'goal',
                id: '000000000000000000000011',
                name: null
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 1);

        // Remove another reference
        item = await this._persistence.removeReference(
            null,
            '1',
            {
                type: 'goal',
                id: '000000000000000000000012',
                name: null
            }
        );

        assert.isObject(item);
        assert.lengthOf(item.references, 0);

        // Remove attachments
        item = await this._persistence.deleteById(null, '1');

        assert.isObject(item);
        assert.lengthOf(item.references, 0);

        // Try to get deleted attachments
        item = await this._persistence.getOneById(null, '1');

        assert.isNull(item || null);
    }
}
