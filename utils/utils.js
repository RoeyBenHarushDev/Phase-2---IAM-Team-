exports.ErrorResponse = function ErrorResponse(
    response,
    message,
    statusCode
) {
    response.status(statusCode).json({ message: message});
};

