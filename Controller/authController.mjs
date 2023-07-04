import jwt from 'jsonwebtoken'
import User from '../Model/userModel.mjs';
import catchAsync from '../utils/catchAsync.mjs';

//Sign Token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

//Create & Send the token and the data to Client-side
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

//Create User to db
export const addUser = catchAsync(async (req, res) => {

    const phone = req.body?.phone
    const user = await User.findOne({ phone })
    if (!user) {
        const newUser = await User.create({
            phone: phone,
        });
        return createSendToken(newUser, 201, res)
    }

    createSendToken(user, 201, res)

});