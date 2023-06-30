import catchAsync from '../utils/catchAsync.mjs';
import AppError from '../utils/appError.mjs';
import User from '../Model/userModel.mjs';
import jwt from 'jsonwebtoken';

const userProtect = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(
            new AppError({ statusCode: 401, message: "Auth token required" })
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findOne({ _id: decoded.id });
    if (!currentUser) {
        return next(
            new AppError({ statusCode: 401, message: 'Invalid token' })
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError({ statusCode: 401, message: "User recently changed password! Please log in again." })
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

export default userProtect;