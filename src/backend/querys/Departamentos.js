const {pool} = require('../../database/config')


const getDepartamentos=async()=>{
    
    console.log('conectado BD')
    try {
        // zartero sql

        const result=await pool.query("SELECT t.id as depa_id,t.numero as depa_numero,t.status as depa_status, tor.id as torre_id,tor.nombre as torre_nombre,tor.foto as torre_foto,tor.status as torre_status FROM apartamento AS t INNER JOIN torre AS tor ON t.id_torre = tor.id WHERE t.status=1 ORDER BY CAST(CASE WHEN depa_numero REGEXP '^[0-9]' THEN depa_numero ELSE '0' END AS SIGNED) ASC, depa_numero ASC;")

        // Mysql

        // const result=await pool.query("SELECT t.id as depa_id,t.numero as depa_numero,t.status as depa_status, tor.id as torre_id,tor.nombre as torre_nombre,tor.foto as torre_foto,tor.status as torre_status FROM apartamento AS t INNER JOIN torre AS tor ON t.id_torre = tor.id WHERE t.status=1 ORDER BY CASE WHEN depa_numero REGEXP '^[a-z]' THEN depa_numero ELSE NULL END ASC, CASE WHEN depa_numero REGEXP '^[0-9]' THEN CAST(depa_numero AS INT) ELSE NULL END ASC;")
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  
const getDepartamentosCONTACTOS=async()=>{
    
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT *,a.id as depa_id FROM apartamento as a INNER JOIN residentes as r ON r.id_apartamento=a.id AND r.status=1 AND a.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getDepartamentoByTorre=async({id})=>{
    
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT t.nombre as torre_nombre, a.id as a_id, a.numero as a_numero FROM apartamento as a INNER JOIN torre as t ON a.id_torre = t.id  WHERE a.id_torre = ? AND a.status = 1 ORDER BY a.numero ASC',[id])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const createDepartamento=async({Numero,IdTorre})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO apartamento (numero, id_torre, status) VALUES (?, ?, ?)', [Numero,IdTorre,status])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


const getDepartamentoById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT t.id as depa_id,t.numero as depa_numero,t.status as depa_status, tor.id as torre_id,tor.nombre as torre_nombre,tor.foto as torre_foto,tor.status as torre_status FROM apartamento AS t INNER JOIN torre AS tor ON t.id_torre = tor.id WHERE t.id = ?', [id])
        console.log(result[0])
        return result[0]
    } catch (error) {
        console.error(error)
    }
}


const editDepartamento=async({Id,Numero,IdTorre})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE apartamento SET numero = ?,id_torre = ? WHERE id = ?', [Numero,IdTorre,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


const deleteDepartamento=async({Id})=>{
    console.log('conectado BD')
    console.log('ID->',Id)
    try {
        const result=await pool.query('UPDATE apartamento SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


// SELECT t.nombre AS nombre_torre, a.nombre AS nombre_alas FROM torre as t INNER JOIN alas as a ON t.id = a.id_torre WHERE t.status=1 AND a.status=1;









module.exports={getDepartamentos,getDepartamentoByTorre,createDepartamento,getDepartamentoById,editDepartamento,deleteDepartamento,getDepartamentosCONTACTOS}