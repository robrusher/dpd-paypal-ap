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
  this.pp = new PayPalAP({
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
  var options = ctx.body.data;
  
  if ( ctx.req && ctx.req.method !== 'POST' ) {
    return next();
  }
  
 
  function cb( err, done ) {
  	ctx.done( err, done );
  }
  
  switch ( action ) {
  	case 'getPaymentOptions':
  		this.getPaymentOptions( options.payKey, cb );
  		break;
  	case 'getPaymentDetails':
  		this.paymentDetails( options, cb );
  		break;
  	case 'createPayment':
  		console.log('createPayment method');
  		this.pay( options, cb );
  		break;
  	case 'preapprovePayment':
  		this.preapproval( options, cb );
  		break;
  	case 'refundPayment':
  		this.refund( options, cb );
  		break;
  	default:
  		break;
  }
};

PayPalap.prototype.getPaymentOptions = function( payKey, cb ){
	this.pp.getPaymentOptions( payKey, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.paymentDetails = function( params, cb ) {
	// params must contain: payKey, transactionId, trackingId
	this.pp.paymentDetails( params, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.pay = function( data, cb ) {
	console.log('call module adaptive payments');
	// data must contain: actionType, receiverList.receiver(0).email, receiverList.receiver(0).amount, currencyCode, cancelURL, returnURL
	this.pp.pay( data, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.preapproval = function( data, cb ) {
	this.pp.preapproval( data, function( err, body ) {
		cb( err, body );
	});
};

PayPalap.prototype.refund = function( params, cb ) {
	// params must contain: payKey, transactionId, trackingId
	this.pp.refund( params, function( err, body ) {
		cb( err, body);
	});
};

/**
 * Module export
 */

module.exports = PayPalap;
