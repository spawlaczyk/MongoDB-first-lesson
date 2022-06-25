const mongoose = require('mongoose');
const Employee = require('../employees.models');
const expect = require('chai').expect;

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    };
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      testEmpTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
    it('should return proper document by various params with findOne method', async () => {
      const employee = await Employee.findOne({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      const expectedFirstName = 'John';
      expect(employee.firstName).to.be.equal(expectedFirstName);
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Employee.deleteMany();
    });

    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({ firstName: 'Jane', lastName: 'Doe', department: 'IT' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      testEmpTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'John', lastName: 'Doe', department: 'IT' }, { $set: { department: 'Marketing' }});
      const updatedEmp = await Employee.findOne({ department: 'Marketing' });
      expect(updatedEmp).to.not.be.null;
    });
    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = 'James';
      await employee.save();

      const updatedEmp = await Employee.findOne({ firstName: 'James' });
      expect(updatedEmp.firstName).to.not.be.null;
    });
    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { department: 'IT' }});
      const updatedEmps = await Employee.find({ department: 'IT' });
      expect(updatedEmps.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' });
      testEmpTwo.save();
    });
    after(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmp = await Employee.findOne({ firstName: 'John' });
      expect(removedEmp).to.be.null;
    });
    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      await employee.remove();

      const removedEmp = await Employee.findOne({ firstName: 'Amanda' });
      expect(removedEmp).to.be.null;
    });
    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany();
      const removedEmps = await Employee.find();
      expect(removedEmps.length).to.be.equal(0);
    });
  });
});