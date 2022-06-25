const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();

    const testDepTwo = new Department({ name: 'Department #2' });
    await testDepTwo.save();
  });
  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should remove chosen document', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const removedDepartment = await Department.findOne({ _id: '5d9f1140f10a81216cfd4408' });
    expect(res.status).to.be.equal(200);
    expect(removedDepartment).to.be.null;
  });
});