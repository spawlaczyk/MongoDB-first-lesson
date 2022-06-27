const Employee = require('../models/employees.models');
const Department = require('../models/department.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().populate('department').skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found...' });
    else res.json(emp);
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.getById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if(!emp) res.status(404).json({ message: 'Not found...' });
    else res.json(emp);
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.post = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const Id = await Department.findOne({ name: department });
    const departmentId = Id._id;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: departmentId });
    await newEmployee.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.put = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      const Id = await Department.findOne({ name: department });
      const departmentId = Id._id;
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: departmentId } });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  };
};

exports.delete = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json({ message: err });
  };
};