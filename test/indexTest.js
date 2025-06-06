const { expect } = require('chai');
const { displayRamens, addSubmitListener, handleClick, main } = require('../src/index');

describe('displayRamens', () => {
    it('should be a function', () => {
        expect(displayRamens).to.be.a('function');
    });
});

describe('handleClick', () => {
    it('should be a function', () => {
        expect(handleClick).to.be.a('function');
    });
});

describe('addSubmitListener', () => {
    it('should be a function', () => {
        expect(addSubmitListener).to.be.a('function');
    });
});

describe('main', () => {
    it('should be a function', () => {
        expect(main).to.be.a('function');
    });
}); 