var express = require('express');
var router = express.Router();
const braintree = require('braintree');

router.post('/checkout', (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'dzt5msgrphgvdpwv',
    publicKey: 'zfy6vn83c9xyhzv4',
    privateKey: 'a0d84595e5eee87e7142e113a698da21'
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction
  const amount = req.body.amount;
  const newTransaction = gateway.transaction.sale({
    amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
