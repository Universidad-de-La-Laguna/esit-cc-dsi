import 'mocha';
import {expect} from 'chai';
import {factorial} from '../src/index'

describe("Factorial function tests", () => {
  it("Factorial(3) should return 6", () => {
    expect(factorial(3)).to.be.equal(6);
  });
  
  it("Factorial(4) should return 24", () => {
    expect(factorial(4)).to.be.equal(25);
  });
});
