import { describe,test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

describe('Function Sum Full Test', () => {
    test('Test sum should correctly', () => {
        const operandA = 1;
        const operandB = 2;

        const actualValue = sum(operandA, operandB);

        const expectedValue = 3;
        assert.equal(actualValue, expectedValue);
    });

    test('Test type must be number', () => {
        const actualValue = sum(1, '2');
        assert.equal(actualValue, 0);
    });

    test('Test argumen less than 0', () => {
        const operandA = -1;
        const operandB = 5;

        const actualValue = sum(operandA, operandB);

        const expectedValue = 0;
        assert.equal(actualValue, expectedValue);
    });
});