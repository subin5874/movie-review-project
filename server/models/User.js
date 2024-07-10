module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    user_password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Board, {
      foreignKey: 'user_no',
      onDelete: 'cascade',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'user_no',
      onDelete: 'cascade',
    });
  };

  return User;
};
