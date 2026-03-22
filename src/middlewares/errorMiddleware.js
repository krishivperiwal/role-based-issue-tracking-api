const errorHandler = (err, req, res, next) => {
        
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    const isUnauthorized = Number(statusCode) === 401;
    const shouldLogError = !(err.isOperational && isUnauthorized);

    if (shouldLogError) {
        console.error("ERROR 💥", err);
    }

    if (process.env.NODE_ENV === "development") {

        return res.status(statusCode).json({
        status: err.status || "error",
        message: message,
        stack: err.stack,
        error: err,
        });
    }

    if (process.env.NODE_ENV === "production") {

        if (err.isOperational) {
        return res.status(statusCode).json({
            status: err.status || "error",
            message: message,
        });
        }

        return res.status(500).json({
        status: "error",
        message: "Something went wrong",
        });
    }

    return res.status(statusCode).json({
        status: "error",
        message: message,
    });
};

export default errorHandler;