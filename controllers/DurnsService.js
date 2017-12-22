'use strict';

var DummyDurns = require('./DummyDurns.js');
var durnsManager = new DummyDurns();


exports.createPaymentByAccount = function(args, res, next) {
  /**
   * Create a payment.
   * Send coins from one user to another using account numbers.
   *
   * body AccountPayment Created user object
   * no response value expected for this operation
   **/

   var from = args.body.value.from;
   var to = args.body.value.to;
   var amount = args.body.value.amount;
   
   var f = durnsManager.getAccount(from);
   var t = durnsManager.getAccount(to);
   var paymentResult = durnsManager.pay(from, to, amount);

   if(f && t && paymentResult == durnsManager.PAYMENT_SUCCESS)
   {
    var examples = {};
    examples['application/json'] = {
      "from" : {
        "vhost" : f._vhost,
        "address" : f._address,
        "balance" : f._balance
      },
      "to" : {
        "vhost" : t._vhost,
        "address" : t._address,
        "balance" : t._balance
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    console.log("Payment success");
   }
   else if (paymentResult == durnsManager.PAYMENT_ERR_INSUFFICIENT_FUNDS)
   {
      res.statusCode = paymentResult;
      res.end("Payment insufficient funds.");
      return;
   }
   else
   {
      //PAYMENT_ERR_INCORRECT_ADDRESS;
      res.statusCode = paymentResult;
      res.end("Payment incorrect address parameter.");
      return; 
   }

  res.end("Payment success");
}

exports.createPaymentByVhost = function(args, res, next) {
  /**
   * Create a payment.
   * Send coins from one user to another using vhosts.
   *
   * body VHostPayment Created user object
   * no response value expected for this operation
   **/
   var from = args.body.value.from;
   var to = args.body.value.to;
   var amount = args.body.value.amount;
   
   var f = durnsManager.getOrCreateAccount(from);
   var t = durnsManager.getOrCreateAccount(to);
   var paymentResult = durnsManager.pay(from, to, amount);

   if(f && t && paymentResult == durnsManager.PAYMENT_SUCCESS)
   {
    var examples = {};
    examples['application/json'] = {
      "from" : {
        "vhost" : f._vhost,
        "address" : f._address,
        "balance" : f._balance
      },
      "to" : {
        "vhost" : t._vhost,
        "address" : t._address,
        "balance" : t._balance
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    console.log("Payment success");
   }
   else if (paymentResult == durnsManager.PAYMENT_ERR_INSUFFICIENT_FUNDS)
   {
      res.statusCode= paymentResult;
      res.end("Payment insufficient funds.");
      return;
   }
   else
   {
      res.statusCode = paymentResult;
      res.end("Payment incorrect address parameter");
      return;
   }
  
  res.end("Payment success.");
}

exports.getDurnsFromAccount = function(args, res, next) {
  /**
   * Get account details.
   * Fetch account details for a user via their vhost
   *
   * account String The account number we're requesting info on.
   * returns Account
   **/
  var address = args.address.value;

  var account = durnsManager.getAccount(address);
  if(account)
  {
    var examples = {};
    examples['application/json'] = {
    "vhost" : account._vhost,
    "address" : account._address,
    "balance" : account._balance
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }else{
    res.statusCode = 400;
    res.end("No account found.");
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
  var vhost = args.body.value.vhost;

  var response = durnsManager.ACCOUNT_FOUND; 
  //if(!durnsManager.accountExists(vhost))
  //{
  //  response = durnsManager.ACCOUNT_CREATED;
  //}

  var account = durnsManager.getOrCreateAccount(vhost);
  if(account)
  {
    var examples = {};
    examples['application/json'] = {
    "vhost" : account._vhost,
    "address" : account._address,
    "balance" : account._balance
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = response;
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }else{
    // this should not really happen for ths handler.
    res.statusCode = 400;
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
  
  durnsManager.mine();

  res.end();
}

