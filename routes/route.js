const router = require('express').Router();
const apiKeyMiddleware = require('../middlewares/apiKey');

//router.use(apiKeyMiddleware); //Applying the middleware at router level

router.get('/', (req, res) => {  //render takes second perimeter as an object where we can pass key value pair and that key will be available in files that are in views folder
    res.render('index', {
        title: 'Home Page'
    }
    );
});


router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    }
    );
});

// router.get('/api/products', apiKeyMiddleware, (req, res) => { //For applying middleware to this route : just pass middleware name as second perimeter
//     res.json([   //It is for sending json data
//         {
//             id: "123",
//             name: "chrome"
//         },
//         {
//             id: "456",
//             name: "fireFox"
//         }
//     ])
// })

router.get('/download', (req, res) => {  

    res.download(path.resolve(__dirname) + '/index.html'); //Attaching the file name with the path of this directory
}) //sendFile will send the file

module.exports = router;