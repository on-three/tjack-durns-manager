'use strict';

exports.createPaymentByAccount = function(args, res, next) {
  /**
   * Create a payment.
   * Send coins from one user to another using account numbers.
   *
   * body AccountPayment Created user object
   * no response value expected for this operation
   **/
  res.end();
}

exports.createPaymentByVhost = function(args, res, next) {
  /**
   * Create a payment.
   * Send coins from one user to another using vhosts.
   *
   * body VHostPayment Created user object
   * no response value expected for this operation
   **/
  res.end();
}

exports.getDurnsFromAccount = function(args, res, next) {
  /**
   * Get account details.
   * Fetch account details for a user via their vhost
   *
   * account String The account number we're requesting info on.
   * returns Account
   **/
  var examples = {};
  examples['application/json'] = {
  "vhost" : "aeiou",
  "address" : "aeiou",
  "balance" : 0.80082819046101150206595775671303272247314453125
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getDurnsFromVHost = function(args, res, next) {
  /**
   * Get account details.
   * Fetch account details for a user via their vhost
   *
   * body VHost Vhost to get balance for.
   * returns Account
   **/
  var examples = {};
  examples['application/json'] = {
  "vhost" : "aeiou",
  "address" : "aeiou",
  "balance" : 0.80082819046101150206595775671303272247314453125
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.pickVHost = function(args, res, next) {
  /**
   * Update system.
   * Upon IRC utterance, this api should be called by a bot.
   *
   * body Utterance IRC post+vhost to update system.
   * no response value expected for this operation
   **/
  res.end();
}

