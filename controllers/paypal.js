const paypal = require("paypal-rest-sdk");

paypal.configure({
  "model": "sandbox",
  "client_id": "AWixl630A3WgH8O_j8jbfUVF-_AcY441giJnlXQXIF63bjjZC-l0krUZLiz8zIvT0WZdp0FOgsSHhx53",
  "client_secret": "EE8QPXYylVyxPD0nfoILtbJ9mOIjZ7WpVcHHhHK6I4gSTdFo4yveIkdsCrwtM3Ece8GrGA6OEcXdgXpe"
});

module.exports = function (app) {

  app.post('/paypal/buy/', function (req, res) {

    product_id = req.body.ProductId;

    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);

    productsDAO.getById(product_id, function (error, result) {
      if (error) {
        console.log('Error in query in database. ' + error);
        res.status(500).send(error);
        return;
      } else {
        console.log(result[0].Price)

        //METHODO PAYPAL
        const cart = [{
          "name": result[0].Title,
          "sku": result[0].ProductId,
          "price": result[0].Price.toFixed(2),
          "currency": "USD",
          "quantity": 1
        }];

        var create_payment_json = {
          "intent": "sale",
          "payer": {
            "payment_method": "paypal"
          },
          "redirect_urls": {
            "return_url": "http://localhost:3001/admin/success",
            "cancel_url": "http://localhost:3001/admin/cancel"
          },
          "transactions": [{
            "item_list": {
              "items": [{
                "name": result[0].Title,
                "sku": result[0].ProductId,
                "price": result[0].Price.toFixed(2),
                "currency": "USD",
                "quantity": 1
              }]
            },
            "amount": {
              "currency": "USD",
              "total": result[0].Price.toFixed(2),
            },
            "description": result[0].Title,
          }]
        };

        paypal.payment.create(create_payment_json, (err, payment) => {
          if (err) {
            console.warn("tete", err)
          } else {
            payment.links.forEach((link) => {
              if (link.rel === 'approval_url') return res.send(link.href)
            })
          }
        })
      }
    });
  });

  app.get('/paypal/success', function (req, res) {

    res.send('success');
  });

  app.get('/paypal/cancel', function (req, res) {

    res.send('cancel');
  });

};

