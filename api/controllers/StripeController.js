/**
 * SubscribeController.js
 *
 * @description :: Controller to process paid subscriptions
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = {

  oneTime: function(req, res){
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://manage.stripe.com/account

    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = req.param('stripeToken'),
        amount = req.param('amount'),
        description = req.param('email');

    var charge = stripe.charges.create({
      amount: 2000, // amount in cents, again
      currency: "usd",
      card: stripeToken,
      description: description
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          console.log('The card has been declined');
        }
    });

  },
  startMonthly: function(req, res){
    console.log(sails.config.stripe.key);
  },
  stopMonthly: function(req, res){

  }

};
