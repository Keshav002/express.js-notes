const express = require('express'); //It returns a function
const app = express();//By calling the function we are getting an object
const path = require('path');
const PORT = process.env.PORT || 8000; //If process.env have port variable then it will take that otherwise it will take 8000
const mainRouter = require('./routes/route');
const productRouter = require('./routes/productRoute');
const ErrorHandeler = require('./errors/ErrorHandeler');
app.set('view engine', 'ejs') //We are telling the express that we are using ejs as view engine

//app.set('views', path.resolve(__dirname) + '/templates') //If we want to change the name of views folder to templates then we must write this
// console.log(app.get('views'));

// app.use(apiKeyMiddleware); //For applying the middleware globally to our website

app.use(express.static('public')); //Static middleware for showing files of static folder . we can display our static files without any router but we have to write .html at the end of href file link
app.use(express.json()); //It is a middleware for express to give it json data because express by default does not get json data
// app.use(express.urlencoded({extended: false})); //For normal form submission

// app.get('/', (req, res) => {  //setting our route (If anyone comes at index page then we will give the response)
//     res.sendFile(path.resolve(__dirname) + '/index.html'); //Attaching the file name with the path of this directory
// }); //sendFile will send the file


// app.get('/about', (req, res) => {  //setting our route (If anyone comes at index page then we will give the response)
//     res.sendFile(path.resolve(__dirname) + '/about.html'); //Attaching the file name with the path of this directory
// }) //sendFile will send the file

app.use(productRouter);
app.use(mainRouter);
//app.use('/main', mainRouter); //we can also give prefix to the router it is optional

// by template engine we can render our files that are present in views folder




// -------------------------------------error handeling ----------------------------/
app.use((req, res, next) => {
    return res.json({ message: "page not found" })
});

app.use((err, req, res, next) => { //It is error handeling middleware
    if (err instanceof ErrorHandeler) {

        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
});






// -------------------------------------error handeling ----------------------------/




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

});//It will create a server