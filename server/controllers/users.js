const bcrypt = require('bcryptjs');
const userModel = require('../models/users');
const jsonwebtoken = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;
     

        const checkUser = await userModel.findOne({ username });

        if (checkUser) return res.status(500).json({ message: "username already used" });

        const pass = await bcrypt.hash(password, 12);

        const user = new userModel({ username, password: pass, displayName });

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
        res.status(200).json({ token, ...user });
    } catch (error) {
        
        res.status(400).json({ error:error });
    }
};

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username });

        if (!user) return res.status(500).json({ message: 'user not found' });

        const pass=await bcrypt.compare(password,user.password)

        if (!pass) return res.status(400).json({ message: 'wrong credentials' });

        const token = jsonwebtoken.sign(
            { data: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
            
        res.status(200).json({ token, userProfile:user });
    } catch (error) {
       
        res.status(400).json({ error })
    }
};



const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) return res.status(500).json({ message: 'not found' });

        res.status(200).json({ user });
    } catch (error){
        
        res.status(400).json({error});
    }
};

module.exports = {
    signup,
    signin,
    getInfo,
};