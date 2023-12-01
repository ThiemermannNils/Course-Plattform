const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_sales_offer', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sale_percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    bonus_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fk_course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_course',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_sales_offer',
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
        name: "fk_tbl_sales_offer_tbl_course1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_course_id" },
        ]
      },
    ]
  });
};
