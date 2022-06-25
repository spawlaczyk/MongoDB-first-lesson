const mongoose = require('mongoose');
const Employee = require('../employees.models');
const expect = require('chai').expect;

describe('Employee', () => {
  after(() => {
    mongoose.models = {};
  });

  it('should throw an error if there are missing args', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', department: 'Marketing' },
      { firstName: 'John' },
      { lastName: 'Doe' },
      { department: 'Marketing' }
    ];

    for(let args of cases) {
      const emp = new Employee(args);

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should throw an error if firstName is not a string', () => {
    const cases = [ {}, [] ];

    for(let firstName of cases) {
      const emp = new Employee(firstName);

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should throw an error if lastName is not a string', () => {
    const cases = [ {}, [] ];

    for(let lastName of cases) {
      const emp = new Employee(lastName);

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should throw an error if department is not a string', () => {
    const cases = [ {}, [] ];

    for(let department of cases) {
      const emp = new Employee(department);

      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });
  it('should not throw errors if args are okay', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
      { firstName: 'Amanda', lastName: 'Doe', department: 'IT' }
    ];

    for(let args of cases) {
      const emp = new Employee(args);

      emp.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});