const {pool} = require('../../database/config')


const getResidentes=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT r.correo,r.telefono2,r.tipo_residente,r.id,r.nombre,r.apellido,r.telefono,r.status,a.numero as apartamento_numero,a.id as apartamento_id FROM residentes as r INNER JOIN apartamento as a ON r.id_apartamento=a.id WHERE r.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
} 


const getResidentesInforme=async({IdApto=false})=>{
    console.log('conectado BD')
    let queryText='SELECT v.placa,v.id_tipo_vehiculo,r.telefono2,r.tipo_residente,r.id,r.nombre,r.apellido,r.telefono,r.status,a.numero as apartamento_numero,a.id as apartamento_id FROM residentes as r INNER JOIN apartamento as a ON r.id_apartamento=a.id INNER JOIN vehiculo as v ON a.id=v.apartamento_id WHERE r.status=1'
    if(IdApto){
        queryText+=` AND r.id_apartamento=${IdApto}`
    }
    
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getRegistrosResidentesInforme=async({TP_ALMACEN,IdApto=false,FechaInicio=false,FechaFin=false})=>{
    console.log('conectado BD')
    let queryTextPriv='SELECT p.id,p.fecha_ingreso,p.fecha_salida,p.observacion,p.observacion_salida,v.placa,v.id_tipo_vehiculo as tipo,a.numero as apartamento,t.nombre as torre FROM reg_parqueadero_comun as p INNER JOIN vehiculo as v ON p.id_vehiculo=v.id INNER JOIN apartamento as a ON v.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE 1=1'

    let queryTextComunitario='SELECT p.id,p.fecha_ingreso,p.fecha_salida,p.observacion,p.observacion_salida,v.placa,v.id_tipo_vehiculo as tipo,a.numero as apartamento, t.nombre as torre FROM reg_parqueadero_comunitario as p INNER JOIN vehiculo as v ON p.vehiculo_id=v.id INNER JOIN apartamento as a ON p.id_apartamento=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE 1=1'


    if(IdApto){
        queryTextPriv+=` AND a.id=${IdApto}`
        queryTextComunitario+=` AND a.id=${IdApto}`
    }
    if(FechaInicio){
        queryTextPriv+=` AND p.fecha_ingreso>="${FechaInicio}"`
        queryTextComunitario+=` AND p.fecha_ingreso>="${FechaInicio}"`
    }
    if(FechaFin){
        queryTextPriv+=` AND p.fecha_salida<="${FechaFin}"`
        queryTextComunitario+=` AND p.fecha_salida<="${FechaFin}"`
    }

    let cierreQuery=' ORDER BY p.id DESC;'
    queryTextPriv+=cierreQuery
    queryTextComunitario+=cierreQuery



    let queryRes
    try {
        const result=await pool.query(queryTextPriv)

        const result2=await pool.query(queryTextComunitario)
        console.log(result)
        console.log(result2)

        // almacen priv
        if(TP_ALMACEN===1){
            queryRes=result[0]

        // almacen comunitario
        }else{
            queryRes=result2[0]
        }


        return queryRes
    } catch (error) {
        console.error(error)
    }
}

const getDepartamentosResi=async()=>{
    
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM apartamento WHERE status=1 AND id_torre IS NOT null')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  


const createResidente=async({Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo,Correo})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO residentes (nombre,apellido,telefono,id_apartamento, status,telefono2,tipo_residente,correo) VALUES (?, ?, ?,?, ?,?, ?,?)', [Nombre,Apellido,Telefono,IdApartamento,status,telf2,Tipo,Correo])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getResidenteById=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM residentes WHERE id = ? AND status=1', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getResidenteByApto=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT *,residentes.correo as correo,apartamento.numero as apartamento_numero,apartamento.id as apartamento_id,residentes.id as id FROM residentes INNER JOIN apartamento ON residentes.id_apartamento=apartamento.id WHERE id_apartamento = ? AND residentes.status=1', [id])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editResidente=async({Id,Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo,Correo})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE residentes SET nombre = ?,apellido = ?,telefono = ?,id_apartamento = ?,telefono2 = ?,tipo_residente = ?, correo=? WHERE id = ?', [Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo,Correo,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteResidente=async({Id})=>{
    console.log('conectado BD')
    console.log('ID->',Id)
    try {
        const result=await pool.query('UPDATE residentes SET status = ? WHERE id = ?', [0,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const deleteResidentesByApto=async({IdApto})=>{
    console.log('conectado BD')
    console.log('ID->',IdApto)
    try {
        const result=await pool.query('UPDATE residentes SET status = 0 WHERE id_apartamento = ?;', [IdApto])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}





module.exports={getResidentesInforme,getResidentes,getDepartamentosResi,createResidente,getResidenteById,editResidente,deleteResidente,getResidenteByApto,deleteResidentesByApto,getRegistrosResidentesInforme}