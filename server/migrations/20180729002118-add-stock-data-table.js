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
  return db.createTable('stock_data_table', {
    symbol: { type: 'string', primaryKey: true, notNull: true },
    date: { type: 'date', primaryKey: true, notNull: true },
    open: { type: 'real', defaultValue: 0.0 },
    close: { type: 'real', defaultValue: 0.0 },
  })
};

exports.down = function (db) {
  return db.dropTable('stock_data_table');
};

exports._meta = {
  "version": 1
};
