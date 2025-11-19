module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    completed: DataTypes.BOOLEAN,
    priority: DataTypes.ENUM("high", "medium", "low"),
    due_date: DataTypes.DATE
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.Category, { foreignKey: "category_id" });
  };

  return Todo;
};
