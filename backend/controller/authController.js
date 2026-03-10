import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User is already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid email" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Enter a strong password (min 8 characters)" });
    }
    let hashedPassword = await bcrypt.hash(password, 15);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const userResp = user.toObject();
    delete userResp.password;
    return res.status(201).json(userResp);
  } catch (error) {
    return res.status(500).json({ message: `SignUp error ${error}` });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter Valid email" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const userResp = user.toObject();
    delete userResp.password;
    return res.status(200).json(userResp);
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    // Clear the cookie set during login/signup. Match cookie options if necessary.
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error ${error}` });
  }
};
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerifed = false;
        await user.save();
        await sendMail(email, otp);
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Send OTP error ${error}` });
    }
};

export const verifyOTP = async (req, res) => {
  try {
    const {email, otp} = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.resetOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(401).json({ message: "OTP has expired" });
    }
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerifed = true;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Verify OTP error ${error}` });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {email, newpassword} = req.body;
    const user = await User.findOne({email});
    if(!user || !user.isOtpVerifed){
      return res.status(404).json({message:"OTP verification is required"})
    }
    const hashedPassword = await bcrypt.hash(newpassword, 15);
    user.password = hashedPassword,
    user.isOtpVerifed = false

    await user.save();
    return res.status(200).json({message:"Password reset successfully"})
  } catch (error) {
    return res.status(500).json({message:`Reset Password error ${error}`})
  }
}

export const googleAuth = async (req, res) => {
  try {
    const {name, email, role} = req.body;
    const user = await User.findOne({email});
    if(!user){
      user = await User.create({
        name,
        email,
        role
      })
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const userResp = user.toObject();
    delete userResp.password;
    return res.status(201).json(userResp);
  } catch (error) {
    return res.status(500).json({message:`Google Auth error ${error}`})
  }
} 