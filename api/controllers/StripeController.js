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

    var params = req.params.all();

    console.log(params.stripeToken + ',' + params.amount + ',' + params.email);

    var charge = stripe.charges.create({
      amount: params.amount, // amount in cents, again
      currency: "usd",
      card: params.stripeToken,
      description: params.email
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

  },

  customerCreate: function(req, res){

    var params = req.params.all();
      console.log(params.stripeToken + ',' + params.amount + ',' + params.email);

    stripe.customers.create({
      email: params.email,
      card: params.stripeToken,
      description: 'customer create'
    }).then(function(customer) {

      Customer.create({customer_id: customer.id, stripeToken: params.stripeToken, email: params.email}, function(err, user){
        if (err){ res.send(500, err);
        } else {
          console.log('Added to DB');
        }
      });

      return stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        customer: customer.id
      });

    }).then(function(charge) {
  });

    res.redirect('/success');
  },



  recharge: function(req, res){

    Customer.findOne({id:'12'}).exec(function(err, customer){

      console.log(customer.email + ', '+ customer.customer_id  );

      stripe.charges.create({
        amount: 2500, // amount in cents, again
        currency: "usd",
        customer: customer.customer_id
      });


    });
    res.redirect('/success');
  }

};
