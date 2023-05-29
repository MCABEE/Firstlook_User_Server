import jwt from 'jsonwebtoken'

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