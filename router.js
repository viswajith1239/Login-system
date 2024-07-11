var express=require("express")

var router=express.Router()

const credential ={
    email:"viswajithkanayi@gmail.com",
    password:"12345"
}



router.post('/dashboard',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
         req.session.user=req.body.email;
         
         res.redirect('/route/dashboard')
       
    }else{
        res.redirect('/')
    }
})
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.redirect('/')
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.redirect('/')
         
        }
    })
})

module.exports=router;