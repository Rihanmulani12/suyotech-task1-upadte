import bcrypt from 'bcrypt';
import User from "../userModel.js";

const sendSuccessResponse = (res, message) => {
    res.status(200).json({ success: true, message });
};

const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ success: false, error: message });
};

async function signUpFun(req, res) {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        sendSuccessResponse(res, {username}, 'User signed up successfully');
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}


async function signinFun(req, res){
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            sendErrorResponse(res, 404, 'User not found');
            return;
        }

        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            sendErrorResponse(res, 401, 'Invalid password');
            return;
        }

        sendSuccessResponse(res, 'User signed in successfully');
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

async function signoutFun (req, res){
   const {username} = req.body;

    sendSuccessResponse(res, {username} , 'User signed out successfully');
}

export { signUpFun, signinFun, signoutFun, sendSuccessResponse, sendErrorResponse };
