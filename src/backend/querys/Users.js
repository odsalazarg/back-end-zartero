const {pool} = require('../../database/config')


const getUsers=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM users WHERE status=1')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const getUsersList=async(IdUser)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query(`SELECT * FROM users WHERE status=1 AND tp_user!=1 AND id!=${IdUser}`)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const getUsersOperario=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM users WHERE status=1 AND tp_user=4')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  
const getUser=async(username)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM users WHERE username = ? AND status=1', [username])
        // console.log(result[0][0])
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getAdmin=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM users WHERE 1=1 AND status=1 AND tp_user=2')
        // console.log(result[0][0])
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getUserById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM users WHERE id = ? AND status=1', [id])
        // console.log(result[0][0])
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const createUser=async({Username,Password,Nombre,Apellido,Cedula,Telefono,Correo,IdTpUsuario})=>{
    console.log('conectado BD')
    const tipo=1
    const status=1
    try {
        const result=await pool.query('INSERT INTO users (username,password,nombre, apellido, cedula,telefono,tipo,status,correo,tp_user) VALUES (?, ?, ?,?, ?, ?, ?, ?,?,?)', [Username,Password,Nombre,Apellido,Cedula,Telefono,tipo,status,Correo,IdTpUsuario])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
    

}

const deleteUser=async({Id})=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('UPDATE users SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const editUser=async({Id,Username,Password,Nombre,Apellido,Cedula,Telefono,Correo,IdTpUsuario})=>{
    console.log('conectado BD')
    console.log(Correo)
    console.log(IdTpUsuario)
    const tipo=1
    try {
        const result=await pool.query('UPDATE users SET username = ?,password = ?,nombre = ?,apellido = ?,cedula = ?,telefono = ?,correo=?,tp_user=? WHERE id = ?', [Username,Password,Nombre,Apellido,Cedula,Telefono,Correo,IdTpUsuario,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports={getUsersList,getUsers,getUser,createUser,getUserById,editUser,deleteUser,getUsersOperario,getAdmin}