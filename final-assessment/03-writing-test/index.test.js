import { sum } from "./index.js";
import { test } from 'node:test';
import assert from 'node:assert';

test('Should sum correctly', () => {
    const operandA = 1;
    const operandB = 2;

    const actualValue = sum(operandA, operandB);

    const expectedValue = 3;
    assert.equal(actualValue, expectedValue);
});

