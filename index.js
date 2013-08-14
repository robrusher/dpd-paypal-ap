/**
 * Module dependencies
 */
var Resource	= require('deployd/lib/resource'),
    PayPalAP	= require('paypal-adaptive'),
	util		= require('util');

/**
 * Module setup.
 */
function PayPalap( options ) {
  Resource.apply( this, arguments );
  this.pp = PayPalAP({
			  	userId: this.config.userID || 'your user id',
			  	password: this.config.password || 'your password',
			  	signature: this.config.signature || 'your app signature',
			  	appId: this.config.appID || 'APP-80W284485P519543T',
			  	sandbox: this.config.sandbox || true
		    });
}

util.inherits( PayPalap, Resource );
PayPalap.label = "PayPal";
PayPalap.defaultPath = "/paypalap";

PayPalap.prototype.clientGeneration = true;

PayPalap.basicDashboard = {
  settings: [
  {
    name        : 'userID',
    type        : 'text',
    description : 'PayPal user ID'
  }, {
    name        : 'password',
    type        : 'text',
    description : 'PayPal password'
  }, {
    name        : 'signature',
    type        : 'text',
    description : 'PayPal application signature.'
  }, {
    name        : 'appID',
    type        : 'text',
    description : 'PayPal application ID'
  }, {
    name        : 'sandbox',
    type        : 'checkbox',
    description : 'Use PayPal Sandbox'
  }]
};

/**
 * Module methods
 */
PayPalap.prototype.handle = function ( ctx, next ) {
  var request = ctx.req;
  var action = ctx.body.method;
  
  if ( ctx.req && ctx.req.method !== 'POST' ) {
    return next();
  }
  
 
  function cb( err, done ) {
  	ctx.done( err, body );
  }
  
  switch ( action ) {
  	case 'getPaymentOptions':
  		this.getPaymentOptions( ctx.body.payKey, cb );
  		break;
  	case 'getPaymentDetails':
  		this.getPaymentDetails( ctx.body.params, cb );
  		break;
  	case 'createPayment':
  		console.log('createPayment method');
  		this.createPayment( ctx.body.data, cb );
  		break;
  	case 'preapprovePayment':
  		this.preapprovePayment( ctx.body.data, cb );
  		break;
  	case 'refundPayment':
  		this.refundPayment( ctx.body.params, cb );
  		break;
  	default: //createAccount
  		this.createAccount( ctx.body.data, cb );
  		break;
  }
};

PayPalap.prototype.getPaymentOptions = function( payKey, cb ){
	this.pp.getPaymentOptions( payKey, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.getPaymentDetails = function( params, cb ) {
	// params must contain: payKey, transactionId, trackingId
	this.pp.getPaymentDetails( params, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.createPayment = function( data, cb ) {
	console.log('call module adaptive payments');
	// data must contain: actionType, receiverList.receiver(0).email, receiverList.receiver(0).amount, currencyCode, cancelURL, returnURL
	this.pp.createPayment( data, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.preapprovePayment = function( data, cb ) {
	this.pp.preapprovePayment( data, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.refundPayment = function( params, cb ) {
	// params must contain: payKey, transactionId, trackingId
	this.pp.refundPayment( params, function( err, body ) {
		cb( err, body);
	});
};

PayPalap.prototype.createAccount = function( data, cb ) {
	this.pp.createAccount( data, function( err, body ) {
		cb( err, body );
	});
};

/**
 * Module export
 */

module.exports = PayPalap;
