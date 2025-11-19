module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    color: DataTypes.STRING
  });

  Category.associate = (models) => {
    Category.hasMany(models.Todo, { foreignKey: "category_id" });
  };

  return Category;
};
