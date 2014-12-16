"use strict";

module.exports = function(sequelize, DataTypes) {
  var Chirp = sequelize.define("Chirp", {
    message: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Chirp;
};
