const express=require("express")
const cors=require("cors")
const mongoos=require("mongoose")
const userRoutes=require('./routes/userRoutes')
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)

//Database connection
mongoos.connect('mongodb://0.0.0.0:27017/chat', {useNewUrlParser: true});
var conn = mongoos.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;
const server=app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
})