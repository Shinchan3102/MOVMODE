const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const auth=async(req,res,next)=>{
    try{
        
        const token= req.headers.authorization.split(" ")[1];
        if(token && (token.length < 500)){
            const data= await jwt.verify(token,process.env.SECRET_KEY);
        
            req.userId=data?.data;
        }
        else{
            const data= await jwt.decode(token);
           
            req.userId=data?.sub;
        }
        next();
    }catch(err){
        console.log(err);
    }
}

module.exports=auth;