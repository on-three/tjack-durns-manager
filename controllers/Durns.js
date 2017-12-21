'use strict';

var url = require('url');

var Durns = require('./DurnsService');

module.exports.createPaymentByAccount = function createPaymentByAccount (req, res, next) {
  Durns.createPaymentByAccount(req.swagger.params, res, next);
};

module.exports.createPaymentByVhost = function createPaymentByVhost (req, res, next) {
  Durns.createPaymentByVhost(req.swagger.params, res, next);
};

module.exports.getDurnsFromAccount = function getDurnsFromAccount (req, res, next) {
  Durns.getDurnsFromAccount(req.swagger.params, res, next);
};

module.exports.getDurnsFromVHost = function getDurnsFromVHost (req, res, next) {
  Durns.getDurnsFromVHost(req.swagger.params, res, next);
};

module.exports.pickVHost = function pickVHost (req, res, next) {
  Durns.pickVHost(req.swagger.params, res, next);
};
