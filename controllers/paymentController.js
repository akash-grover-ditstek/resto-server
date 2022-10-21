const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    const { price, token } = req.body;
console.log(token.email);
    return stripe.customers.create({
        email: token.email,
        source: token.id
      })
      
      .then(customer => {
        stripe.charges.create(
          {
            amount: parseInt(price) * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Order Placed Successfully`
          }
        );
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => console.log(err));
      // let stripe1 = await stripe.customers.create({
      //   description:'sometestemail@email.com'
      // },function(err,customer) {
      //   console.log('error',err);
      //   console.log('customer',customer);
      // }).catch(err=> console.log('err catch',err))

      // console.log(stripe1);
}
