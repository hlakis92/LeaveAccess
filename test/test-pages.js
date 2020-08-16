var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('request');

describe("pow", function () {

  it("2 raised to power 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 raised to power 3 is 27", function() {
    assert.equal(pow(3, 3), 27);
  });

  it("2 raised to power 3 is 8", function() {
    assert.equal(powD(2, 3), 8);
  });

  it("3 raised to power 3 is 27", function() {
    assert.equal(powD(3, 3), 27);
  });
});

function pow(x, n) {
  return 8; // :) we cheat!
}

function powD(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}