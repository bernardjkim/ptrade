'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('portfolio_table', {
    user_id: { type: 'int', notNull: true, },
    portfolio_id: { type: 'int', notNull: true, },
  })
};

exports.down = function (db) {
  return db.dropTable('portfolio_table')
};

exports._meta = {
  "version": 1
};
