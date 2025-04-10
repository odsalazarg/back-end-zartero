const bcrypt=require('bcryptjs')
const ValidarClave=(USER_password,BD_password)=>{
    const res=bcrypt.compareSync(USER_password, BD_password);
    console.log(res)
    return res
}

module.exports={
    ValidarClave
}