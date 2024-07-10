module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    board_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    board_one_line_review: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    board_content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });

  Board.associate = (models) => {
    Board.hasOne(models.Rating, {
      foreignKey: 'board_no',
      onDelete: 'cascade',
    });
    Board.belongsTo(models.User, {
      foreignKey: 'user_no',
      onDelete: 'cascade',
      hooks: true,
    });
    Board.belongsTo(models.Movie, {
      foreignKey: 'movie_no',
      onDelete: 'cascade',
      hooks: true,
    });
  };

  return Board;
};
