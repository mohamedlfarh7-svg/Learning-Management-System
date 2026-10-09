function errorHandler(error, req, res, next) {
    console.error(error);

    if (error.name === "AuthenticationError"){
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: error.message
        });
    }

    if(error.name === "ZodError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }

    res.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error",
        errors: {
            error,
        },
    });
}

export default errorHandler