const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_payment_info', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    amount_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    paid: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    receipt: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    receipt_link: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_users',
        key: 'id'
      }
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
    tableName: 'tbl_payment_info',
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
        name: "fk_tbl_payment_history_tbl_users1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_user_id" },
        ]
      },
      {
        name: "fk_tbl_payment_info_tbl_course1_idx",
        using: "BTREE",
        fields: [
          { name: "fk_course_id" },
        ]
      },
    ]
  });
};
