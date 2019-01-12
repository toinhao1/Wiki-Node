'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allownull: false,
    },
    body: {
      type: DataTypes.STRING,
      allownull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allownull: false,
      defaultValue: false
    },
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Wiki;
};
