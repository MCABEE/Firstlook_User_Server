
class AppError extends Error {
    constructor(args) {
        super(args.message)

        this.name = args.name || 'Error'
        this.statusCode = args.statusCode
        this.message = args.message
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError