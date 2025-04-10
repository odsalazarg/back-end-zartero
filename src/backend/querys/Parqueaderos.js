const {pool} = require('../../database/config')

const getParqueaderos=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT p.id as p_id,p.numero as p_numero,p.num_carros as p_num_carros,p.num_motos as p_num_motos,p.status as p_status,a.id as a_id,a.numero as a_numero,t.nombre as t_nombre FROM parqueadero_comun as p INNER JOIN apartamento as a ON p.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE p.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const getParqueaderosByAPto=async({IdApto})=>{
    console.log('conectado BD')
    let add=''
    let queryText='SELECT p.id as p_id,p.numero as p_numero,p.num_carros as p_num_carros,p.num_motos as p_num_motos,p.status as p_status,a.id as a_id,a.numero as a_numero,t.nombre as t_nombre FROM parqueadero_comun as p INNER JOIN apartamento as a ON p.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE p.status=1 '
    if(IdApto!=0){
        add=`AND a.id=${IdApto}`
    }
    queryText+=add
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
} 

const getParqueaderos_Comunitario=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM parqueadero_comunitario')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
} 

const updateParqueaderos_Comunitario=async({CUPO_TOTAL_CARRO,CUPO_TOTAL_MOTO,CUPO_POR_APARTAMENTO_CARRO,CUPO_POR_APARTAMENTO_MOTO})=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('UPDATE parqueadero_comunitario SET motos=?,carros=?,cupo_motos=?,cupo_carros=? WHERE id = 1',[CUPO_TOTAL_MOTO,CUPO_TOTAL_CARRO,CUPO_POR_APARTAMENTO_MOTO,CUPO_POR_APARTAMENTO_CARRO])
        console.log(result)
        return result[0].affectedRows===1?true:false
    } catch (error) {
        console.error(error)
    }
} 

const getParqueadero_TipoALmacen=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM tipo_parqueadero WHERE status=1')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
} 

const updateParqueadero_TipoALmacen=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM tipo_parqueadero WHERE status=1')
        console.log(result)
        if(result[0][0].id===1){
            const result2=await pool.query('UPDATE tipo_parqueadero SET status = 0 WHERE id = 1')
            const result3=await pool.query('UPDATE tipo_parqueadero SET status = 1 WHERE id = 2')
        }
        if(result[0][0].id===2){
            const result2=await pool.query('UPDATE tipo_parqueadero SET status = 0 WHERE id = 2')
            const result3=await pool.query('UPDATE tipo_parqueadero SET status = 1 WHERE id = 1')
        }
        return result[0]
    } catch (error) {
        console.error(error)
    }
} 

const getDepartamentosParqueaderos=async()=>{
    
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM apartamento')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  

const createParqueaderos=async({Nombre,Autos,Motos,IdApartamento})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO parqueadero_comun (numero,num_carros,num_motos,apartamento_id) VALUES (?, ?, ?,?)', [Nombre,Autos,Motos,IdApartamento])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getParqueaderoById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT p.id,p.numero,p.num_carros,p.num_motos,p.apartamento_id,p.status,a.id_torre FROM parqueadero_comun as p INNER JOIN apartamento as a ON p.apartamento_id=a.id WHERE p.id = ?', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editParqueaderos=async({Id,Nombre,Autos,Motos,IdApartamento})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE parqueadero_comun SET numero = ?,num_carros = ?,num_motos = ?,apartamento_id = ? WHERE id = ?', [Nombre,Autos,Motos,IdApartamento,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteParqueadero=async({Id})=>{
    console.log('conectado BD')
    console.log('ID->',Id)
    try {
        const result=await pool.query('UPDATE parqueadero_comun SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


module.exports={getParqueaderos,getDepartamentosParqueaderos,createParqueaderos,getParqueaderoById,editParqueaderos,deleteParqueadero,getParqueadero_TipoALmacen,updateParqueadero_TipoALmacen,getParqueaderos_Comunitario,updateParqueaderos_Comunitario,getParqueaderosByAPto}