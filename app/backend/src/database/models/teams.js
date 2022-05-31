const modelTeams = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    teamname: DataTypes.STRING
  }, {
    underscored: true,
    timestamps: false,
  });
};

module.exports = modelTeams;
