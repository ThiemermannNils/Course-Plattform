const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_video_data', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fk_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_course',
        key: 'id'
      }
    },
    video_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    video_length: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_video_data',
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
        name: "fk_tbl_video_data_tbl_course1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_course_id" },
        ]
      },
    ]
  });
};
