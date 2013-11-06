dpd-paypal-ap
==========================

Deployd module for using a Node.js sdk for Paypal Adaptive Payments and Paypal Adaptive Accounts API, without dependencies

**USE:**
```javascript
var trans = {
	"method":"Pay",
	"data":
	{
		"actionType":"PAY", 
		"requestEnvelope":{"errorLanguage":"en_US","detailLevel":"ReturnAll"} ,
		"receiverList":
			{
				"receiver":
					[
						{
							"amount": amountVal, 
							"email": emailVal ,
							"paymentType":"PERSONAL"
						}
					]
			},
		"returnUrl":location.href,
		"cancelUrl":location.href
	}
};

dpd.paypalap.post( trans, function(result, err) {   
	if(err){
	} else {
	}
});
```