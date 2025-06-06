const { expect } = require('chai');
const index = require('../src/index.js');

describe('Ramen Rater', () => {
  it('should have all required functions', () => {
    expect(typeof index.displayRamens).to.equal('function');
    expect(typeof index.handleClick).to.equal('function');
    expect(typeof index.addSubmitListener).to.equal('function');
    expect(typeof index.main).to.equal('function');
  });
}); 