var DataTypes = require("sequelize").DataTypes;
var _tbl_course_progress = require("./tbl_course_progress");
var _tbl_author = require("./tbl_author");
var _tbl_category = require("./tbl_category");
var _tbl_course = require("./tbl_course");
var _tbl_payment_history = require("./tbl_payment_history");
var _tbl_payment_info = require("./tbl_payment_info");
var _tbl_sales_offer = require("./tbl_sales_offer");
var _tbl_users = require("./tbl_users");
var _tbl_video_data = require("./tbl_video_data");

function initModels(sequelize) {
  var tbl_course_progress = _tbl_course_progress(sequelize, DataTypes);
  var tbl_author = _tbl_author(sequelize, DataTypes);
  var tbl_category = _tbl_category(sequelize, DataTypes);
  var tbl_course = _tbl_course(sequelize, DataTypes);
  var tbl_payment_history = _tbl_payment_history(sequelize, DataTypes);
  var tbl_payment_info = _tbl_payment_info(sequelize, DataTypes);
  var tbl_sales_offer = _tbl_sales_offer(sequelize, DataTypes);
  var tbl_users = _tbl_users(sequelize, DataTypes);
  var tbl_video_data = _tbl_video_data(sequelize, DataTypes);

  tbl_course.belongsTo(tbl_author, { as: "tbl_author", foreignKey: "tbl_author_id"});
  tbl_author.hasMany(tbl_course, { as: "tbl_courses", foreignKey: "tbl_author_id"});
  tbl_course.belongsTo(tbl_category, { as: "fk_category", foreignKey: "fk_category_id"});
  tbl_category.hasMany(tbl_course, { as: "tbl_courses", foreignKey: "fk_category_id"});
  tbl_course_progress.belongsTo(tbl_course, { as: "fk_course", foreignKey: "fk_course_id"});
  tbl_course.hasMany(tbl_course_progress, { as: "tbl_course_progresses", foreignKey: "fk_course_id"});
  tbl_payment_info.belongsTo(tbl_course, { as: "fk_course", foreignKey: "fk_course_id"});
  tbl_course.hasMany(tbl_payment_info, { as: "tbl_payment_infos", foreignKey: "fk_course_id"});
  tbl_sales_offer.belongsTo(tbl_course, { as: "fk_course", foreignKey: "fk_course_id"});
  tbl_course.hasMany(tbl_sales_offer, { as: "tbl_sales_offers", foreignKey: "fk_course_id"});
  tbl_video_data.belongsTo(tbl_course, { as: "fk_course", foreignKey: "fk_course_id"});
  tbl_course.hasMany(tbl_video_data, { as: "tbl_video_data", foreignKey: "fk_course_id"});
  tbl_course_progress.belongsTo(tbl_users, { as: "fk_user", foreignKey: "fk_users_id"});
  tbl_users.hasMany(tbl_course_progress, { as: "tbl_course_progresses", foreignKey: "fk_users_id"});
  tbl_author.belongsTo(tbl_users, { as: "fk_user", foreignKey: "fk_users_id"});
  tbl_users.hasMany(tbl_author, { as: "tbl_authors", foreignKey: "fk_users_id"});
  tbl_payment_history.belongsTo(tbl_users, { as: "fk_user", foreignKey: "fk_user_id"});
  tbl_users.hasMany(tbl_payment_history, { as: "tbl_payment_histories", foreignKey: "fk_user_id"});
  tbl_payment_info.belongsTo(tbl_users, { as: "fk_user", foreignKey: "fk_user_id"});
  tbl_users.hasMany(tbl_payment_info, { as: "tbl_payment_infos", foreignKey: "fk_user_id"});

  return {
    tbl_course_progress,
    tbl_author,
    tbl_category,
    tbl_course,
    tbl_payment_history,
    tbl_payment_info,
    tbl_sales_offer,
    tbl_users,
    tbl_video_data,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
