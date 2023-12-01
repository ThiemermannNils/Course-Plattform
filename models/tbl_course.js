const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_course', {
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
    fk_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_category',
        key: 'id'
      }
    },
    cost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Language: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    tbl_author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_author',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_course',
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
        name: "fk_tbl_course_tbl_category1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_category_id" },
        ]
      },
      {
        name: "fk_tbl_course_tbl_author1_idx",
        using: "BTREE",
        fields: [
          { name: "tbl_author_id" },
        ]
      },
    ]
  });
};
