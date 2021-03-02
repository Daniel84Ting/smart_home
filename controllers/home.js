const express = require('express');
const products = express.Router();
const Product = require('../models/homeSchema.js');

/// Json route ///
products.get('/json', (req, res) => {
  Product.find((err, products) => {
    res.send(products);
  });
});

/// Index route ///
products.get('/', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
    }
    res.render('./home/index.ejs', { products });
  });
});

/// New route ///
products.get('/new', (req, res) => {
  res.render('./home/new.ejs');
});

/// Show route ///
products.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render('./home/show.ejs', { product: product });
  });
});

/// Create route ///
products.post('/', (req, res) => {
  Product.create(req.body, (err, product) => {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/home/' + product.id);
    }
  });
});

/// Edit route ///
products.get('/:id/edit', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.render('./home/edit.ejs', { product: product });
  });
});

/// Update route ///
products.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/home/' + product.id);
    },
  );
});

/// Delete route ///
products.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/home');
  });
});

// /// post a new message ///
// products.post('/', (req, res) => {
// //   // finds user by id (based on current logged in user )
//   Product.create(
//     { _id: req.session.currentUser._id },
//     // uses $push method to push the req.body.message
//     { $push: { users: req.body.comments } },
//     // callback
//     (err, foundUser) => {
//       // redirects to the room page
//       res.redirect('back');
//     },
//   );
// });

/// Buy route ///
products.put('/:id/buy', (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1 } },
    (err, product) => {
      if (err) {
        console.log(err);
      }
      res.redirect('back');
    },
  );
});

module.exports = products;
