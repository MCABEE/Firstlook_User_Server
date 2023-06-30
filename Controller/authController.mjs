import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../Model/userModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';
import AppError from '../utils/appError.mjs';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    //remove the password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'Success',
        token,
        data: {
            user
        }
    });
};

export const addUser = catchAsync(async (req, res) => {

    const phone = req.body?.phone
    const user = await User.findOne({ phone })
    if (!user) {
        const newUser = await User.create({
            phone: phone,
        });
        createSendToken(newUser, 201, res)
    }

    createSendToken(user, 201, res)

});

export const verifyLogin = catchAsync(async (req, res) => {

    const { displayName, password } = req.body;
    const user = await User.findOne({ displayName, status: 'Active' })
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new AppError({ statusCode: 401, message: 'Invalid credentials' })

    createSendToken(user, 201, res)
})