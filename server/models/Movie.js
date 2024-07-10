module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movie_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    movie_title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  });

  Movie.associate = (models) => {
    Movie.hasMany(models.Board, {
      foreignKey: 'movie_no',
      onDelete: 'cascade',
    });
    Movie.hasMany(models.Rating, {
      foreignKey: 'movie_no',
      onDelete: 'cascade',
    });
  };

  return Movie;
};
