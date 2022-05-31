const modelMatches = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    hometeam: DataTypes.STRING,
    hometeamgoals: DataTypes.STRING,
    awayteam: DataTypes.STRING,
    awayteamgoals: DataTypes.STRING,
    inprogress: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
  });
};

module.exports = modelMatches;
