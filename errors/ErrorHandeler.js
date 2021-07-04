class ErrorHandeler {
    constructor(status, msg) {   //In this file we are handeling some of our major errors
        this.status = status;
        this.message = msg;
    }

    static validationError(message = 'All field are required!') { //These functions are static so we dont require an object to call them
        return new ErrorHandeler(422, message);
    }
    static notFoundError(message = 'Not Found!') {
        return new ErrorHandeler(400, message);
    }

    static serverError(message = 'Internal Error!') {
        return new ErrorHandeler(500, message);
    }

    static forbidden(message = 'Not allowed!') {
        return new ErrorHandeler(403, message);
    }
}

module.exports = ErrorHandeler;