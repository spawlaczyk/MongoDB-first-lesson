const mongoose = require('mongoose');
const Department = require('../department.models');
const expect = require('chai').expect;

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });
  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];

    for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw an error if "name" < minlength or > maxlength', () => {
    const cases = ['abc', 'abcabcabcabcabcabcabc'];

    for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should not throw an error if "name" is okay', () => {
    const cases = ['Lorem Ipsum', 'Department'];

    for(let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});