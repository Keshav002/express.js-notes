const ErrorHandeler = require("../errors/ErrorHandeler");

const apiKey = (req, res, next) => {
    const api_key = "1234567"
 //   console.log(req.query.api_key);  //We are using query instead of body because we are sending query string instead of data . 
    const userApiKey = req.query.api_key;
    if(userApiKey && (userApiKey === api_key)){
        next(); //next function is used to complete the process of this middleware
    } else{
        next(ErrorHandeler.forbidden(`Api key is not valid`));
        // res.json({ message: "Not Allowed!" });
    }   
}

module.exports = apiKey;