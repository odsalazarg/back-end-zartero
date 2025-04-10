const {pool} = require('../../database/config')


const getVisitanteByCi=async(ci)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM visitante WHERE cedula = ?', [ci])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getVisitanteInforme=async({Cedula=false})=>{
    console.log('conectado BD')
    let queryText='SELECT *,tp.nombre as tp_nombre,visitante.nombre as visitante_nombre FROM visitante INNER JOIN tipo_visitante as tp ON visitante.id_tipo_visitante=tp.id WHERE 1=1'

    if(Cedula!=false){
        queryText+=`AND cedula=${Cedula}`
    }
    try {
        const result=await pool.query(queryText)
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getRegistrosVisitantes=async({Cedula=false,IdApto=false,FechaInicio=false,FechaFin=false})=>{
    console.log('conectado BD')
    let queryText='SELECT v.nombre as visitante_nombre,v.apellido as visitante_apellido,v.foto as visitante_foto,res.nombre as residente_nombre,res.apellido as residente_apellido,r.visitante_id,r.fecha_ingreso,r.fecha_salida,r.observacion,r.observacion_salida,r.placa,r.tipo_vehiculo,a.numero,t.nombre as torre FROM reg_visitante as r INNER JOIN apartamento as a ON r.apartamento=a.id INNER JOIN torre as t ON a.id_torre=t.id INNER JOIN residentes as res on r.autorizacion_residente=res.id INNER JOIN visitante as v ON r.visitante_id=v.id WHERE 1=1'

    if(Cedula){
        queryText+=` AND v.cedula=${Cedula}`
    }
    if(IdApto){
        queryText+=` AND a.id=${IdApto}`
    }
    if(FechaInicio){
        queryText+=` AND r.fecha_ingreso>="${FechaInicio}"`
    }
    if(FechaFin){
        queryText+=` AND r.fecha_salida<="${FechaFin}"`
    }
    let cierreQuery=' ORDER BY r.id DESC;'
    queryText+=cierreQuery
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const getTipoVisitante=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM tipo_visitante')
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const createVisitante=async({Nombre,Apellido,Cedula,IdTipoVisitante,UrlFotoPerfilVisitante})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO visitante (nombre,apellido,foto,cedula,id_tipo_visitante) VALUES (?, ?, ?,?,?)', [Nombre,Apellido,UrlFotoPerfilVisitante,Cedula,IdTipoVisitante])
        console.log(result[0].insertId)
        return [result[0].insertId]
    } catch (error) {
        console.error(error)
        return false
    }
}

const validarRegistroPeatonVisitante=async({cedula})=>{
    let PlacaJoin=`ci-${cedula}`
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM reg_visitante as p WHERE p.placa=? AND p.fecha_salida is NULL;',[PlacaJoin])
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}


const registrarVisitantePeatonREG=async({Cedula,Observacion,ID_APTO,IdAutorizacionResi})=>{
    // constante
    const ObtenerFechaActual = () => {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();
      
        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      
        console.log(fechaFormateada); // Salida: YYYY-MM-DD HH:MM:SS
        return fechaFormateada;
    }
      

    const ID_VISITANTE=await getVisitanteByCi(Cedula)
    const Fecha=ObtenerFechaActual()
    const OBSERVACION=Observacion===''?null:Observacion
    let PlacaJoin=`ci-${Cedula}`
    const TP_VEHICULO=null
    const PARKING_ID_REGISTRO=null
    const id_visitante=ID_VISITANTE[0].id


    console.log('conectado BD')
    try {
        const result=await pool.query('INSERT INTO reg_visitante (fecha_ingreso,observacion,apartamento,visitante_id,placa,tipo_vehiculo,autorizacion_residente,id_parqueadero) VALUES (?, ?, ?,?,?,?,?,?)',[Fecha,OBSERVACION,ID_APTO,id_visitante,PlacaJoin,TP_VEHICULO,IdAutorizacionResi,PARKING_ID_REGISTRO])
        console.log(result[0])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const registrarVisitanteSALIDAPeatonREG=async({Cedula,Observacion,ID_APTO,IdAutorizacionResi})=>{
    // constante
    const ObtenerFechaActual = () => {
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();
        const hora = fechaActual.getHours();
        const minutos = fechaActual.getMinutes();
        const segundos = fechaActual.getSeconds();
      
        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      
        console.log(fechaFormateada); // Salida: YYYY-MM-DD HH:MM:SS
        return fechaFormateada;
    }

    const ID_VISITANTE=await getVisitanteByCi(Cedula)
    const Fecha=ObtenerFechaActual()
    const OBSERVACION=Observacion===''?null:Observacion
    let PlacaJoin=`ci-${Cedula}`
    const TP_VEHICULO=null
    const PARKING_ID_REGISTRO=null
    const id_visitante=ID_VISITANTE[0].id


    console.log('conectado BD')
    try {
        const result=await pool.query('UPDATE reg_visitante SET fecha_salida=?,observacion_salida=? WHERE visitante_id=? AND apartamento =? AND fecha_salida is NULL',[Fecha,OBSERVACION,id_visitante,ID_APTO])
        console.log(result[0])
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}








module.exports={registrarVisitanteSALIDAPeatonREG,registrarVisitantePeatonREG,validarRegistroPeatonVisitante,getVisitanteByCi,getTipoVisitante,createVisitante,getVisitanteInforme,getRegistrosVisitantes}