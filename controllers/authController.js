const User = require('../models/userModel')
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken')

// module.exports.signupPage = (req, res)=>{
//     return res.render('signup')
// }

//creating the user
module.exports.register = async (req,res)=>{
    try {
        const {name, email, password, phone, address} = req.body;
        const user = await User.findOne({email})
    
        if(user){
            console.log("user already exists");
            res.status(500).send({success:false, message:'Email already exists'});
            // return res.redirect('back');
        }

        //encrypting the password
        var salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
        });

        console.log("new user created");
        res.status(201).send({success: true, message: "Registered Successfully", newUser})
        // return res.redirect('/api/v1/auth/loginpage')
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message: "Error in register api", error});
        // return res.redirect("back")
    }
}

// module.exports.loginPage = (req, res)=>{
//     return res.render('login')
// }

//login controller
module.exports.login = async (req,res)=>{
    try {
        const {email, password} = req.body;
        //checking email and password
        if(!email || !password){
            return res.status(500).send({success: false, message: "please provide email and password"})
            // return res.redirect("back")
        }
    
        //checking user exists or not
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send({ success:false, message: "user not found"})
            // return res.redirect('back')
        }
        
        //checking body password and database password
        const isMatch = await bcrypt.compare(password.toString(), user.password.toString() )
        if(!isMatch){
            return res.status(500).send({success: false, message: "Invalid credentials"})
            // console.log("username password doesnot mateched")
            // return res.redirect("back")
        }
    
        //creating the token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
    
        user.password = undefined
        res.status(200).send({success: true, message: "Login successfully", token,user})
        // console.log("login successfull");
        // return res.redirect('back')
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "error in login api", error})
        // return res.redirect('back')
    }
}

module.exports.idadmin = async (req, res)=>{
    console.log("hi admin")
}