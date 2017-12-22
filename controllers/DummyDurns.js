'use strict';

var nextAccount = 1;

class DummyAccount {
  constructor(vhost) {
    this._balance = 500.0; // yes give 500 to start
    this._vhost = vhost;
    this._address = nextAccount.toString();

    console.log("Created account: ", this._vhost,":", this._address, ":", this._balance);

    nextAccount++;
  }
}

class DummyDurns {
  constructor() {
    this._accounts = [];
    this._vhostLookup = {};
    this._accountLookup = {};

    // TODO: these should be some kind of static enum
    this.PAYMENT_SUCCESS = 200;
    this.PAYMENT_ERR_INCORRECT_ADDRESS = 401;
    this.PAYMENT_ERR_INSUFFICIENT_FUNDS = 402;
}

  addAccountIfLacking(vhost) {
    var _a = new DummyAccount(vhost);
    this._accounts.push(_a);
    this._vhostLookup[vhost] = _a;
    this._accountLookup[_a._address] = _a;
    return _a;
  }

  getAccountFromVHost(vhost) {
    if(!(vhost in this._vhostLookup))
    {
      console.log("Adding account for vhost: ", vhost);
      return this.addAccountIfLacking(vhost);
    }else{
      return this._vhostLookup[vhost];
    }
  }
  getAccount(address) {
    //console.trace("looking up account ",address);
    if(address in this._accountLookup)
    {
      return this._accountLookup[address];
    }else{
      return null;
    }
  }

  
  pay(from, to, amount) {
    console.log("Doing payment from: ", from, " to: ", to, " for amount: ", amount);
    // first look up as vhosts
    if(from in this._vhostLookup && to in this._vhostLookup)
    {
      var f = this._vhostLookup[from];
      var t = this._vhostLookup[to];
      if(f._balance < amount)
      {
        console.log("*** pay insufficient funds 1.");
        return this.PAYMENT_ERR_INSUFFICIENT_FUNDS;
      }
      f._balance -= amount;
      t._balance += amount;
      return this.PAYMENT_SUCCESS;
    }
    else if(from in this._accountLookup && to in this._accountLookup)
    {
      var f = this._accountLookup[from];
      var t = this._accountLookup[to];
      if(f._balance < amount)
      {
        console.log("*** pay insufficient funds 2.");
        return this.PAYMENT_ERR_INSUFFICIENT_FUNDS;
      }
      f._balance -= amount;
      t._balance += amount;
      return this.PAYMENT_SUCCESS;
    }
    else
    {
      console.log("*** pay incorrect address.");
      return this.PAYMENT_ERR_INCORRECT_ADDRESS;
    }
  }
  
  mine() {
    // just give everyone 500
    for(var i in this._accounts)
    {
      this._accounts[i]._balance += 500.0;
    }
  }
}

module.exports = DummyDurns;

