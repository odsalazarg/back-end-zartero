const express=require('express')
const {join,dirname}=require('path')
const {getUser,getUsers,createUser,getUserById,editUser,deleteUser} =require('./backend/querys/Users')
const bcrypt=require('bcryptjs')
const {ValidarClave} = require('./backend/Auth/ValidarClave')
const jwt=require('jsonwebtoken')
const key_JWT='prueba'
// const crypto = require('crypto')
// const algorithm='aes-256-ctr'
// const fileURLToPath=require('url')
const app = express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(join(__dirname, 'frontend/assets')));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
const generarToken=(user,key_JWT)=>{
    return jwt.sign(user,key_JWT,{expiresIn:'24h'})
}

// AUTH LOGIN
app.post('/Auth/Login',async(req,res)=>{
    const {user,password} =req.body
    console.log(user,password)
    const resQuery=await getUser(user)
    console.log(resQuery,'login')
    // validamos que llegue info
    if(resQuery.length>0){
        console.log('existe usuario')
        const resAuth=ValidarClave(password,resQuery[0].password)
        if(resAuth){
            console.log('logeado')
            console.log(resQuery[0])
            const obj_TOKEN={
                user:resQuery[0].username,
                id:resQuery[0].id
            }
            const accessToken=generarToken(obj_TOKEN,key_JWT)
            res.json({status:1,accessToken,user:resQuery[0].username,id:resQuery[0].id})
        }else{
            console.log('acceso denegado')
            res.json({
                status:0,
                msg:'Credenciales Invalidas'
            })
        }

    }else{
        res.json({
            status:0,
            msg:'Credenciales Invalidas'
        })
        console.log('no existe usuario')
    }
    
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('porteria', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash,'GENERADO')
            

    //     });
    // });
    

})

// AUTH REGISTRO
app.post('/Auth/Registro',async(req,res)=>{
    const {user,password} =req.body
    console.log(user,password)
    const resQuery=await getUser(user)
    console.log(resQuery)
    // validamos que llegue info
    if(resQuery.length>0){
        console.log('existe usuario')
        const resAuth=ValidarClave(password,resQuery[0].password)
        if(resAuth){
            console.log('logeado')
            console.log(resQuery[0])
            const obj_TOKEN={
                user:resQuery[0].username,
                id:resQuery[0].id
            }
            const accessToken=generarToken(obj_TOKEN,key_JWT)
            res.json({status:1,accessToken,user:resQuery[0].username})
        }else{
            console.log('acceso denegado')
            res.json({
                status:0,
                msg:'Credenciales Invalidas'
            })
        }

    }else{
        res.json({
            status:0,
            msg:'Credenciales Invalidas'
        })
        console.log('no existe usuario')
    }
    
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('porteria', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         console.log(hash,'GENERADO')
            

    //     });
    // });
    

})

// const __dirname=dirname(fileURLToPath(import.meta.url))
app.get('/',(req,res)=>{
    // res.write('hola')
    res.sendFile(join(__dirname,'frontend/index.html'))
})


app.use(require('./router/router'));



app.use(express.static(join(__dirname,'frontend/assets')))


app.set('PORT',3000)
app.listen(app.get('PORT'),()=>{
    console.log(`server corriendo en el puerto ${app.get('PORT')}`)
    console.log(join(__dirname,'frontend/prueba.html'))
    console.log(join(__dirname,'frontend/assets'))
})
