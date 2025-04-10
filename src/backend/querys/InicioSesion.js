const {pool} = require('../../database/config')

const createInicioSesion=async({fecha_ingreso,IdUser})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO operario_sesion (ingreso,id_user) VALUES (?, ?)', [fecha_ingreso,IdUser])
        console.log(result[0].insertId)
        return [result[0].insertId]
    } catch (error) {
        console.error(error)
        return false
    }
}

const getInicioSesion=async()=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('SELECT * FROM operario_sesion as os INNER JOIN users as u ON os.id_user=u.id WHERE u.tp_user=4;')
        // console.log(result[0].insertId)
        return result[0]
    } catch (error) {
        console.error(error)
        return false
    }
}

const editSesion=async({fecha_salida,IdUser})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE operario_sesion SET salida = ? WHERE id_user = ? AND salida IS NULL', [fecha_salida,IdUser])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}





module.exports={createInicioSesion,editSesion,getInicioSesion}