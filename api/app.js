const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models');
const ChatRoute = require('./routes/ChatRoute.js');

const app = express();
const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use('/db/v1/chatApp',ChatRoute);

app.use((errMsg,req,res,next)=>{
    const err = new Error(errMsg);
    err.status = 404;
    next(err);
});

app.use((err,req,res,next)=>{
    res.status(err.status||500);

    res.json({
        error:{
            message:err.message
        }
    });
});

sequelize
.sync()
.then(()=>{
   const server = app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
})
.catch(err => console.log(err));


