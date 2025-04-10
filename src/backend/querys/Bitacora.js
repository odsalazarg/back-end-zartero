const {pool} = require('../../database/config')


const createBitacora=async({texto,IdUser,fecha})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO bitacora (observacion,fecha,user) VALUES (?, ?, ?)', [texto,fecha,IdUser])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getRegistroLlamada=async()=>{
    let queryText='SELECT * FROM registro_llamada WHERE 1=1'
    let add=''
    
    queryText+=add
    console.log('conectado BD')
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const createRegistroLlamada=async({IdUser,IdDepa,IdResidente,Fecha})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO registro_llamada (responsable,apartamento,inquilino,fecha) VALUES (?, ?, ?,?)', [IdUser,IdDepa,IdResidente,Fecha])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getBitacora=async({FechaInicio,FechaFin,getRegistroLlamada})=>{
    let queryText='SELECT * FROM bitacora as b INNER JOIN users as u ON b.user=u.id WHERE 1=1'
    let add=''
    if(FechaInicio){
        add+=` AND fecha>=${FechaInicio}`
    }
    if(FechaFin){
        add+=` AND fecha<=${FechaFin}`
    }
    queryText+=add
    console.log('conectado BD')
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}









module.exports={createBitacora,getBitacora,createRegistroLlamada,getRegistroLlamada}