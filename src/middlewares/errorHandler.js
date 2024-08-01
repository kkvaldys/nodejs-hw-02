const errorHandler = (err, req, res, next) => {
    const {status = 500, message} = error;
    res.status(status).json({
        message: message,
        status: status,
        data: err,
    })
};

export default errorHandler;