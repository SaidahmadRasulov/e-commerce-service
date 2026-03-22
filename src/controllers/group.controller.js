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
