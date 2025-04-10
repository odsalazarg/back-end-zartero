const {pool} = require('../../database/config')

const getAlas=async()=>{
    
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT a.id as alas_id,a.nombre as alas_nombre,a.status as alas_status,t.id as torre_id,t.nombre as torre_nombre,t.status as torre_status FROM alas AS a INNER JOIN torre AS t ON a.id_torre=t.id WHERE a.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const createAlas=async({Nombre,IdTorre})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO alas (nombre, id_torre, status) VALUES (?, ?, ?)', [Nombre,IdTorre,status])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getAlasById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM alas WHERE id = ?', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editAlas=async({Id,Nombre,IdTorre})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE alas SET nombre = ?,id_torre = ? WHERE id = ?', [Nombre,IdTorre,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteAla=async({Id})=>{
    console.log('conectado BD')
    console.log('ID->',Id)
    try {
        const result=await pool.query('UPDATE alas SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}




module.exports={getAlas,createAlas,getAlasById,editAlas,deleteAla}