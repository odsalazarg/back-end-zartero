const {pool} = require('../../database/config')


const getRegVisitante=async({fecha})=>{
    console.log('conectado BD')
    console.log(fecha,'FECHA SQL-------------->visitante')
    try {
        const result=await pool.query("SELECT * FROM reg_visitante WHERE fecha_ingreso >= ? AND fecha_salida IS NOT null;",[fecha])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getRegVisitantePeaton=async({fecha})=>{
    console.log('conectado BD')
    console.log(fecha,'FECHA SQL-------------->visitante')
    try {
        const result=await pool.query("SELECT * FROM reg_visitante WHERE fecha_ingreso >= ? AND fecha_salida IS NOT null;",[fecha])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getRegResidentePriv=async({fecha})=>{
    console.log('conectado BD')
    console.log(fecha,'FECHA SQL-------------->RESIDENTES PRIV')
    try {
        const result=await pool.query("SELECT * FROM reg_parqueadero_comun WHERE fecha_ingreso >= ? AND fecha_salida IS NOT null;",[fecha])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
        return []
    }
}  
const getRegResidenteComunitario=async({fecha})=>{
    console.log('conectado BD')
    console.log(fecha,'FECHA SQL-------------->RESIDENTES COMUNITARIO')
    try {
        const result=await pool.query("SELECT * FROM reg_parqueadero_comunitario WHERE fecha_ingreso >= ? AND fecha_salida IS NOT null;",[fecha])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
        return []
    }
}  








module.exports={getRegVisitante,getRegResidentePriv,getRegResidenteComunitario,getRegVisitantePeaton}