//errorHandler.js

const errorHandler = (err, req, res, next) => {
    const {status = 500, message} = err;
    res.status(status).json({
        message: message,
        status: status,
        data: err,
    })
};

export default errorHandler;