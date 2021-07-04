const router = require('express').Router();
const ErrorHandeler = require('../errors/ErrorHandeler');
const apiKeyMiddleware = require('../middlewares/apiKey');
let products = require('../productData');

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Product Page'
    });
});

router.get('/api/products', (req, res) => {
    res.json(products);  
});

router.post('/api/products', apiKeyMiddleware,(req, res, next) => { //We can also get next method in routes
    const {name, price} = req.body;  //We get our post data in req.body
    
    if(!name || !price){
        next(ErrorHandeler.validationError('Name and price fields are required'));
        // throw new Error('All fields are required');
        // return res.status(422).json({error: 'All fields are required'});
    }

    const product = {
        name: name,
        price: price,
        id: new Date().getTime().toString()
    }

    products.push(product);
    
    res.json(product);  
});

router.delete('/api/products/:productId', (req, res) => {
    products = products.filter((product) => req.params.productId !== product.id); //We are overriding the products and not taking that product whose id we are receiving for deletion
    res.json({status: 'ok'});
})
module.exports = router;