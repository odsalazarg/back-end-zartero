const {pool} = require('../../database/config')

const getVehiculos=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.status as vehiculo_status, v.id as vehiculo_id,v.placa as vehiculo_placa,v.id_tipo_vehiculo as vehiculo_tipo,a.id as apto_id,a.numero as apto_numero,t.id as torre_id,t.nombre as torre_nombre FROM vehiculo as v INNER JOIN apartamento as a ON v.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE v.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}


const createVehiculo=async({Placa,IdTipoVehiculo,IdTorre,IdApto})=>{
    console.log('conectado BD')
    // const tipo='prueba.jpg'
    const status=1
    try {
        const result=await pool.query('INSERT INTO vehiculo (placa,apartamento_id,id_tipo_vehiculo,status) VALUES (?, ?, ?, ?)', [Placa,IdApto,IdTipoVehiculo,1])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getVehiculoById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.id as vehiculo_id,v.placa as vehiculo_placa,v.id_tipo_vehiculo as vehiculo_tipo,a.id as apto_id,a.numero as apto_numero,t.id as torre_id,t.nombre as torre_nombre FROM vehiculo as v INNER JOIN apartamento as a ON v.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE v.id=?;', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getVehiculoByIdApto=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.id as vehiculo_id,v.placa as vehiculo_placa,v.id_tipo_vehiculo as vehiculo_tipo,a.id as apto_id,a.numero as apto_numero,t.id as torre_id,t.nombre as torre_nombre FROM vehiculo as v INNER JOIN apartamento as a ON v.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE a.id=? AND v.status=1;', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editVehiculo=async({Placa,IdTipoVehiculo,IdTorre,IdApto,Id})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE vehiculo SET placa = ?,apartamento_id = ?,id_tipo_vehiculo = ? WHERE id = ?', [Placa,IdApto,IdTipoVehiculo,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


const deleteVehiculo=async({Id})=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('UPDATE vehiculo SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}













module.exports={getVehiculoByIdApto,getVehiculos,createVehiculo,getVehiculoById,editVehiculo,deleteVehiculo}