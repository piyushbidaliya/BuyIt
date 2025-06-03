import UserModel from "../models/user.model.js";
import bcryptjs, { genSalt } from "bcryptjs"
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from 'jsonwebtoken'

export async function userRegisterController (req, res){
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({email})
        if(user){
            return res.json({
                message: "Email Already Registered",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email ? code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "verify email",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.json({
            message: "user registered successfully",
            error: false,
            success: true,
            data: save
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function userLoginController (req, res){
    try {
        const {email, password} = req.body

        if(!email || !password){
            res.status(400).json({
                message: "provide email, password",
                error: true,
                success: false
            })

        }
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({
                message: "user does not exist",
                error: true,
                success: false
            })
        }

        if(user.status !== "Active"){
            return res.status(400).json({
                message: "contact admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword){
            return res.status(400).json({
                message: "wrong password",
                error: true,
                success: false
            })
        }
        
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
            last_login_date: new Date()
        })

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken', accessToken, cookieOption)
        res.cookie('refreshToken', refreshToken, cookieOption)

        return res.json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function userLogoutController(req, res){
    try {
        const userid = req.userId // middleware
        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie("accessToken", cookieOption)
        res.clearCookie("refreshToken", cookieOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        }, { new: true });

        if (!removeRefreshToken) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "Logout Successful",
            error: false,
            success: true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId //auth middleware
        const image = req.file // multer middleware
        const upload = await uploadImageCloudinary(image)

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })

        return res.json({
            message: "upload profile",
            success: true,
            error: false,
            data: {
                _id: userId,
                avatar: upload.url
            }

        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
    
}

export async function updateUserDetails(req, res){
    try {
        const userId = req.userId
        const { name, email, mobile, password} = req.body

        let hashPassword = ""


        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({_id: userId}, {
            ...(name && {name: name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && { password: hashPassword})
        })
        return res.json({
            message: "updated successfully",
            error: false,
            success: true,
            data: updateUser
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function forgotPasswordController(req, res){
    try {
        const { email } = req.body

        const user = await UserModel.findOne({ email  })
        if(!user){
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const otp = generateOtp()
        const expireTime = new Date() + 60 * 60 * 1000

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "forgot password",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        })

        return res.json({
            message: "check your email",
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyForgotPasswordOtp(req, res){
    try {
        const { email, otp } = req.body

        if(!email || !otp){
            return res.status(400).json({
                message: "provide required field email otp",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email  })
        if(!user){
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()
        if(user.forgot_password_expiry < currentTime){
            return res.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            })
        }

        if(otp !== user.forgot_password_expiry ){
            return res.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })

        return res.json({
            message: "otp verified",
            error: false,
            success: true
        })


        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function resetPassword(req, res){
    try {
        const { email, newPassword, confirmPassword } = req.body

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message: "provide required fields"
            })
        }

        const user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(400).json({
                message: "newPassword and confirm password are not same",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findOneAndUpdate(user._id,{
            password: hashPassword
        })

        return res.json({
            message: "password updated successfully",
            error: false,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function refreshTokenController(req,res){
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token",
                error  : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return res.status(401).json({
                message : "token is expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId)

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accessToken',newAccessToken,cookiesOption)

        return res.json({
            message : "New Access token generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })


    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export async function userDetails(req, res) {
    try {
        const userId = req.userId

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return res.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}