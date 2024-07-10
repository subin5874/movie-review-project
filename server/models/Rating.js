module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rating_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'user_no',
      onDelete: 'cascade',
      hooks: true,
    });
    Rating.belongsTo(models.Board, {
      foreignKey: 'board_no',
      onDelete: 'cascade',
      hooks: true,
    });
    Rating.belongsTo(models.Movie, {
      foreignKey: 'movie_no',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return Rating;
};
