
const errorHandler = (err, req, res, next) => {
    const name = err.name || 'Error';
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.log(name, statusCode, message);
    res.status(statusCode).json({ name, message });
};

export default errorHandler;