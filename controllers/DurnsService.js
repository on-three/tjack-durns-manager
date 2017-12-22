'use strict';

var DummyDurns = require('./DummyDurns.js');
var dummyDurns = new DummyDurns();


exports.createPaymentByAccount = function(args, res, next) {
  /**
   * Create a payment.
   * Send coins from one user to another using account numbers.
   *
   * body AccountPayment Created user object
   * no response value expected for this operation
   **/

  console.log(args);

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
   console.log(args);
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

  var address = args.body.address;

  var account = dummyDurns.getAccount("1");
  if(account)
  {
    console.log("Account vhost: ", account._vhost, " address: ", acccount._address, "balance: ", account._balance);
    var examples = {};
    examples['application/json'] = {
    "vhost" : account._vhost,
    "address" : account._address,
    "balance" : account._balance
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }else{
    console.log("No account found.");
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
  //getAccountFromVHost
  console.log("args.body: ", args);
  var vhost = args.body.value.vhost;

  var account = dummyDurns.getAccountFromVHost(vhost);
  if(account)
  {
    console.log("Account vhost: ", account._vhost, " address: ", account._address, "balance: ", account._balance);
    var examples = {};
    examples['application/json'] = {
    "vhost" : account._vhost,
    "address" : account._address,
    "balance" : account._balance
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }else{
    console.log("No account found.");
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
  
  dummyDurns.mine();

  res.end();
}

