//const sequelize = require('../server/index').sequelize;
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course_progress', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fk_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_course',
        key: 'id'
      }
    },
    fk_users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_users',
        key: 'id'
      }
    },
    progress_in_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'course_progress',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_course_progres_tbl_course1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_course_id" },
        ]
      },
      {
        name: "fk_course_progres_tbl_users1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_users_id" },
        ]
      },
    ]
  });
};
