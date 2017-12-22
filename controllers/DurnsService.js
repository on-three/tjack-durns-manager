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

   console.log(args);

   console.log(args);
   var from = args.body.value.from;
   var to = args.body.value.to;
   var amount = args.body.value.amount;

   var paymentResult = durnsManager.pay(from, to, amount);
   console.log("paymentResult: ", paymentResult);
   console.log("class paymentResult: ", durnsManager.PAYMENT_ERR_INSUFFICIENT_FUNDS);
   if(paymentResult == durnsManager.PAYMENT_SUCCESS)
   {
      console.log("Payment success");
   }
   else if (paymentResult == durnsManager.PAYMENT_ERR_INSUFFICIENT_FUNDS)
   {
      console.log("Payment insufficient funds.");
      res.statusCode = paymentResult;
      res.end("Payment insufficient funds.");
      return;
   }
   else
   {
      //PAYMENT_ERR_INCORRECT_ADDRESS;
      console.log("Payment incorrect address parameter.");
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
   console.log(args);
   var from = args.body.value.from;
   var to = args.body.value.to;
   var amount = args.body.value.amount;

   var paymentResult = durnsManager.pay(from, to, amount);
   if(paymentResult == durnsManager.PAYMENT_SUCCESS)
   {
      console.log("Payment success");
   }
   else if (paymentResult == durnsManager.PAYMENT_ERR_INSUFFICIENT_FUNDS)
   {
      console.log("Payment insufficient funds.");
      res.statusCode= paymentResult;
      res.end("Payment insufficient funds.");
      return;
   }
   else
   {
      //PAYMENT_ERR_INCORRECT_ADDRESS;
      console.log("Payment incorrect address parameter.");
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
  console.log(args);

  var address = args.address.value;

  var account = durnsManager.getAccount(address);
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
  console.log("args.body: ", args);
  var vhost = args.body.value.vhost;

  var response = durnsManager.ACCOUNT_FOUND; 
  //if(!durnsManager.accountExists(vhost))
  //{
  //  response = durnsManager.ACCOUNT_CREATED;
  //}

  var account = durnsManager.getOrCreateAccount(vhost);
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
    res.statusCode = response;
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }else{
    // this should not really happen for ths handler.
    console.log("No account found.");
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

