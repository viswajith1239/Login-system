const express=require("express")
const path=require("path")
const bodyparser=require("body-parser")
const session=require("express-session")
 const{v4:uuidv4}=require("uuid")
const router=require('./router')
const app=express()
const nocache=require('nocache')
const port =process.env.PORT||3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/asset',express.static(path.join(__dirname,'public/assets')))
app.use(session({
   secret:uuidv4(),
   resave:false, 
   saveUninitialized:true

}))
app.use(nocache());
app.use('/route',router)

app.get('/',(req,res)=>{
    if(req.session.user){
        res.redirect('/route/dashboard')

    }
    else{
    res.render('base')

    }
})



app.listen(port,()=> console.log("server on http://localhost:3000"))