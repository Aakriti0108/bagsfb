const Product = require('../models/product');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const { response } = require('express');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.status(200).json({products, success:true})
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.limitProducts = (req, res, next) => {
  let page = Number(req.query.page);
  let Limit = 2;
  
    Product.findAll({limit:2,offset:Limit*page})
      .then(products => {
        res.json({products , success:true}) 
      })
      .catch(err => {
        console.log(err);
      });
  };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.status(200).json({success:true , products : products})
          // res.render('shop/cart', {
          //   path: '/cart',
          //   pageTitle: 'Your Cart',
          //   products: products
          // });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {

  if(!req.body.productId)
  {
    return res.status(400).json({success:false , message:'ProductId is missing'})
  }
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({ success : true , message:'Successfully added the product '});
    })
    .catch(err => 
      res.status(500).json({ success:false, message:'Error occured'} ))
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.params.id;
    CartItem.findAll({where : {productId: prodId}})
    .then(product => {
      product[0].destroy()
      .then(response =>{
        res.status(200).json({success:true , message:"deleted"})
      })
    })
    .catch(err=>res.json({err}))
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include : ["products"]})
  .then(products =>{
    res.status(200).json({products:products})
  })
  .catch(err => console.log(err))
  // res.render('shop/orders', {
  //   path: '/orders',
  //   pageTitle: 'Your Orders'
  // });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postOrder =  async (req,res,next)=>{
  let order = await req.user.createOrder() 
  
  let myOrders = []
  req.user.getCart()
  .then(cart=>{
      console.log('Inside CartItems',cart)
      cart.getProducts()
      .then(async(products)=>{
          console.log('Cart Products',products)
          for(let i=0;i<products.length;i++) {
              // console.log('prodycts',products[i])
             let order_items =   await order.addProduct(products[i] , { 
                  through : {quantity : products[i].cartItem.quantity} })
                  myOrders.push(order_items)
                      console.log(myOrders)
                 }
                 CartItem.destroy({where:{cartId : cart.id}})
                 .then(response=>console.log(response))
                 res.status(200).json({data: myOrders , success : true})
               })
      .catch(err=>console.log(err))
  })
  .catch((err)=>{
       res.status(500).json(err)
  })
}

