import 'mocha';
import {expect} from 'chai';
import {add, factorial} from '../src/index.js'

describe("Factorial function tests", () => {
  it("Factorial(3) should return 6", () => {
    expect(factorial(3)).to.be.equal(6);
  });
  
  it("Factorial(4) should return 24", () => {
    expect(factorial(4)).to.be.equal(24);
  });
});

describe("Add function tests", () => {
  it("add(3, 5) should return 8", () => {
    expect(add(3, 5)).to.be.equal(8);
  });
  
  it("add(4.8, -2.1) should return 2.7", () => {
    expect(add(4.8, -2.1)).to.be.closeTo(2.7, 0.1);
  });
});
