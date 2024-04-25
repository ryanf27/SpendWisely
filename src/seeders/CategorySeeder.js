import Category from "../models/Category.js";

const defaultCategories = [
  { name: "Transportation" },
  { name: "Food" },
  { name: "Entertainment" },
  { name: "Housing" },
  { name: "Utilities" },
  { name: "Insurance" },
  { name: "Personal Spending" },
  { name: "Other" },
];

const seedCategories = async (userId) => {
  try {
    for (const category of defaultCategories) {
      await Category.create({ ...category, userId });
    }
    console.log("Default categories have been added.");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

export default seedCategories;
