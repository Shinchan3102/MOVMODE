const express=require('express');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const cors=require('cors');
require('./mongodb/mongo');
const dotenv=require('dotenv');
const favoriteRouter=require('./routers/favorites');
const personRouter=require('./routers/person');
const reviewRouter=require('./routers/review');
const userRouter=require('./routers/users');
const mediaRouter=require('./routers/media');

dotenv.config();

const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/favorite",favoriteRouter);
app.use("/api/person",personRouter);
app.use("/api/review",reviewRouter);
app.use("/api/users",userRouter);
app.use("/api/media/:mediaType",mediaRouter);

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is running at the port ${port}`);
})
