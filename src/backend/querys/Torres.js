const {pool} = require('../../database/config')

const getTorres=async()=>{
    console.log('conectado BD')
    try {
        // mysql

        // const result=await pool.query("SELECT * FROM torre WHERE status=1 ORDER BY CASE WHEN nombre REGEXP '^[a-z]' THEN nombre ELSE NULL END ASC, CASE WHEN nombre REGEXP '^[0-9]' THEN CAST(nombre AS INT) ELSE NULL END ASC;")

        // zartero sql

        const result=await pool.query("SELECT * FROM torre WHERE status=1 ORDER BY CAST(CASE WHEN nombre REGEXP '^[0-9]' THEN nombre ELSE '0' END AS SIGNED) ASC, nombre ASC;")
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const createTorre=async({Nombre})=>{
    console.log('conectado BD')
    const tipo='prueba.jpg'
    const status=1
    //     SELECT 
    // t.id as torre_id,
    // t.nombre as torre_nombre,
    // t.status as torre_status,
    // a.id as alas_id,
    // a.nombre as alas_nombre,
    // a.status as alas_status 
    // FROM torre AS t 
    // INNER JOIN alas AS a 
    // ON t.id_alas=a.id;
    try {
        const result=await pool.query('INSERT INTO torre (nombre, foto, status) VALUES (?, ?, ?)', [Nombre,tipo,status])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getTorreById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM torre WHERE id = ?', [id])
        // console.log(result[0][0])
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editTorre=async({Id,Nombre})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE torre SET nombre = ? WHERE id = ?', [Nombre,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteTorre=async({Id})=>{
    console.log('conectado BD')
    console.log('ID->',Id)
    try {
        const result=await pool.query('UPDATE torre SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}



module.exports={getTorres,createTorre,getTorreById,editTorre,deleteTorre}