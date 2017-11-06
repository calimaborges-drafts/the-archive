'use strict';

const assert = require('assert');
const _ = require('lodash');

describe('Message View Controller', () => {
    it('should sort messages by ts', () => {
        let messages = [
            {
                id: 3,
                ts: '1457329404.000281'
            },
            {
                id: 2,
                ts: '1457328797.000256'
            },
            {
                id: 4,
                ts: '1457373399.000023'
            },
            {
                id: 10,
                ts: '1457379569.000059'
            },
            {
                id: 1,
                ts: '1457328569.000240'
            }
        ];

        let ordered = _.sortBy(messages, message => {
            return message.ts;
        });

        assert.equal(ordered[0].id, 1);
        assert.equal(ordered[1].id, 2);
        assert.equal(ordered[2].id, 3);
        assert.equal(ordered[3].id, 4);
        assert.equal(ordered[4].id, 10);
    });
});
