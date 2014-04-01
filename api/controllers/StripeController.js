/**
 * SubscribeController.js
 *
 * @description :: Controller to process paid subscriptions
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var local = require('../../config/local.js'),
    stripe = require('stripe')(local.stripe.secret);

module.exports = {

  oneTime: function(req, res){
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://manage.stripe.com/account
    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = req.param('stripeToken'),
        amount = req.param('amount'),
        email = req.param('email');

    var charge = stripe.charges.create({
      amount: amount, // amount in cents, again
      currency: "usd",
      card: stripeToken,
      description: email
    },
    function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        console.log('The card has been declined');
      }
      console.log('Charged');
    });
    res.redirect('/');
  },
  oneTimeCustom: function(req, res){
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here https://manage.stripe.com/account
    // (Assuming you're using express - expressjs.com)
    // Get the credit card details submitted by the form
    var stripeToken = req.param('stripeToken'),
        amount = req.param('amount'),
        email = req.param('email');

    console.log(stripeToken + ',' + amount + ',' + email)

    var charge = stripe.charges.create({
      amount: amount, // amount in cents, again
      currency: "usd",
      card: stripeToken,
      description: email
    },
    function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        console.log('The card has been declined');
      }
      console.log('Charged');
    });
    res.redirect('/');
  },
  startMonthly: function(req, res){

    var stripeToken = req.param('stripeToken'),
        email = req.param('email');

    stripe.customers.create({
      amount: 500,
      currency: 'usd',
      card: stripeToken,
      plan: 'standard_plan',
      email: email
    },
    function(err, customer) {
      // ...
    });
    res.redirect('/');
  },
  stopMonthly: function(req, res){

  }

};
