import catchAsync from '../utils/catchAsync.mjs';
import AppError from '../utils/appError.mjs';
import User from '../Model/userModel.mjs';
import jwt from 'jsonwebtoken';

const userProtect = catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) {
        throw new AppError({ name: 'Un Authorized', statusCode: 401, message: 'Invalid request' })
    }
    const token = req.headers.authorization.split(" ")[1];

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findOne({ _id: decoded.id });
    if (!currentUser) {
        return next(
            new AppError({ statusCode: 401, message: 'Invalid token' })
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

export default userProtect;