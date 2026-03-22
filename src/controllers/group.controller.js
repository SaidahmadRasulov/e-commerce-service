import { Group } from "../models/index.js";

export const createGroup = async (req, res) => {
  const { name, code_name } = req.body;

  const exisitingGroup = await Group.findOne({ where: { name } });

  if (exisitingGroup) {
    return res.status(400).json({ message: "This group already exist!" });
  }

  const group = await Group.create({
    name,
    code_name,
  });

  res.status(201).json({message: "Group created successful", group})
};

export const getGroups = async (req, res) => {
  const groups = await Group.findAll();
  res.status(200).json({ groups });
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByPk(id);
  if (!group) {
    return res.status(404).json({ message: "Group not found!" });
  }
  res.status(200).json({ group });
}

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, code_name } = req.body;
  
  const group = await Group.findByPk(id);
  if (!group) {
    return res.status(404).json({ message: "Group not found!" });
  }

  group.name = name || group.name;
  group.code_name = code_name || group.code_name;
  await group.save();

  res.status(200).json({ message: "Group updated successful", group });
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const group = await Group.findByPk(id);
  if (!group) {
    return res.status(404).json({ message: "Group not found!" });
  }
  await group.destroy();
  res.status(200).json({ message: "Group deleted successful" });
};  

