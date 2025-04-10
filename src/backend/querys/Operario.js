const {pool} = require('../../database/config')
const {getParqueadero_TipoALmacen}=require('../querys/Parqueaderos')
const {EnviarCorreo}=require('../querys/EnviarCorreo')
const {getResidenteByApto}=require('../querys/Residentes')
const {getAdmin}=require('../querys/Users')


const ObtenerPropietario=async(IdApartamento)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM residentes as r WHERE r.id_apartamento=?',[IdApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const PlacaValida=async(placa)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM vehiculo as v INNER JOIN apartamento as a ON v.apartamento_id=a.id WHERE v.placa=?',[placa])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const consultaAlmacen=async(id)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM parqueadero_comun WHERE apartamento_id=? AND status=1',[id])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const consultaAlmacenComunitario=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM parqueadero_comunitario')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}


const ParqueaderosOcupados=async(idApartamento)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.id_tipo_vehiculo FROM parqueadero_comun as p INNER JOIN reg_parqueadero_comun as r ON p.id=r.parqueadero_comun_id INNER JOIN vehiculo as v ON r.id_vehiculo=v.id WHERE p.apartamento_id=? AND r.fecha_salida is NULL;',[idApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const ParqueaderosOcupadosComunitario=async(idApartamento)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM reg_parqueadero_comunitario as r INNER JOIN vehiculo as v ON r.vehiculo_id=v.id WHERE r.id_apartamento=? AND r.fecha_salida is NULL;',[idApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const ParqueaderosOcupadosVisitante=async(idApartamento)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT tipo_vehiculo FROM reg_visitante WHERE apartamento=? AND fecha_salida is NULL;',[idApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}


const tipoAutoResidente=async(Placa)=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.id_tipo_vehiculo FROM vehiculo as v WHERE v.placa=?',[Placa])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const ObtenerParqueaderosVisitante=async({Placa,Observacion,ID_APTO,TP_VEHICULO,ID_VISITANTE,IdAutorizacionResi})=>{

    const permitirEntrada=async({Placa,resTipoParqueadero})=>{
        console.log('conectado BD')
        const TP_ALMACEN=resTipoParqueadero[0].id
        console.log('tipo de TP_ALMACEN -->',TP_ALMACEN)
        let llaveLogica_privado=false
        let llaveLogica_publico=false
        let llaveLogica_visitante=false
        let llaveLogica_TOTAL=false
        try {
            // const result_VEHICULO=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])

            // console.log(result_VEHICULO[0][0])
            // if(result_VEHICULO[0][0].length>0){
            //     const ID_VEHICULO=result_VEHICULO[0][0].id
            //     const result_privado=await pool.query('SELECT * FROM reg_parqueadero_comun as p WHERE p.id_vehiculo=? AND p.fecha_salida is NULL;',[ID_VEHICULO])
            //     console.log(result_privado[0])
    
            //     const result_publico=await pool.query('SELECT * FROM reg_parqueadero_comunitario as p WHERE p.vehiculo_id=? AND p.fecha_salida is NULL;',[ID_VEHICULO])
            //     console.log(result_publico[0])
            // }else{

            // }

            

            const result_visitante=await pool.query('SELECT * FROM reg_visitante as p WHERE p.placa=? AND p.fecha_salida is NULL;',[Placa])
            console.log(result_publico[0])
            
            // reg privado
            // if(result_privado[0].length>0){
            //     llaveLogica_privado=false
            // }else{
            //     llaveLogica_privado=true
            // }

            // // reg publico
            // if(result_publico[0].length>0){
            //     llaveLogica_publico=false
            // }else{
            //     llaveLogica_publico=true
            // }

            //reg_visitante
            if(result_visitante[0].length>0){
                llaveLogica_visitante=false
            }else{
                llaveLogica_visitante=true
            }

            console.log(llaveLogica_privado,'llaveLogica_privado')
            console.log(llaveLogica_publico,'llaveLogica_publico')
            console.log(llaveLogica_visitante,'llaveLogica_visitante')

            // privado
            if(TP_ALMACEN===1){

                llaveLogica_publico=true

            // publico
            }else{

                llaveLogica_privado=true
            }


            if(llaveLogica_visitante){
                llaveLogica_TOTAL=true
            }else{
                llaveLogica_TOTAL=false
            }
            console.log(llaveLogica_TOTAL,'llaveLogica_TOTAL')
            return llaveLogica_TOTAL
        } catch (error) {
            console.error(error)
        }
    }

    const obtenerCorreo=async(IdApto,msj)=>{
        let llaveLogica=false
        const resResidente=await getResidenteByApto(IdApto)
        const resAdmins=await getAdmin()
        console.log(resResidente)
        if(resResidente.length>0){
            console.log(resResidente,'================ residentes CORREO')
            for (let i = 0; i < resResidente.length; i++) {
                const item = resResidente[i];
                const correoRes=item.correo
                if(correoRes!=''){
                    const enviado=EnviarCorreo(correoRes,'Ingreso de visitante',msj)
                    if(enviado){
                        llaveLogica=true
                    }
                }
                
                
            }
        }
        if(resAdmins.length>0){
            console.log(resAdmins,'================ resAdmins CORREO')
            for (let i = 0; i < resAdmins.length; i++) {
                const item = resAdmins[i];
                const correoRes=item.correo
                if(correoRes!=''){
                    const enviado=EnviarCorreo(correoRes,'Ingreso de visitante',msj)
                    if(enviado){
                        llaveLogica=true
                    }
                }
                
                
            }
        }
        return llaveLogica
    }

    // constante
    const ObtenerFechaActual=()=>{
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();

        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

        console.log(fechaFormateada); // Salida: YYYY-MM-DD
        return fechaFormateada
    }
    // variable1
    const obtenerParqueaderoLibre=async(idApartamento)=>{
        console.log('conectado BD')
        let llaveLogica=false
        try {
            const result=await pool.query('SELECT * FROM reg_parqueadero_comun as p WHERE p.parqueadero_comun_id=? AND p.fecha_salida is NULL;',[idApartamento])
            console.log(result[0])
            //si el .length es === 0 quiere decir que el parqueadero esta disponible; por el contrario si tiene algun resultado es porque el parqueadero aun esta en uso,puesto que tiene un registro de uso sin fecha de salida,por lo tanto el auto anteriormente ingresado no ha salido del parking
            if(result[0].length>0){
                llaveLogica=false
            }else{
                llaveLogica=true
            }
            return llaveLogica
        } catch (error) {
            console.error(error)
        }
    }

    const obtenerParqueaderoLibreVisitante=async(IdParqueadero)=>{
        console.log('conectado BD')
        let llaveLogica=false
        try {
            const result=await pool.query('SELECT * FROM reg_visitante as p WHERE p.id_parqueadero=? AND p.fecha_salida is NULL;',[IdParqueadero])
            console.log(result[0])
            //si el .length es === 0 quiere decir que el parqueadero esta disponible; por el contrario si tiene algun resultado es porque el parqueadero aun esta en uso,puesto que tiene un registro de uso sin fecha de salida,por lo tanto el auto anteriormente ingresado no ha salido del parking
            if(result[0].length>0){
                llaveLogica=false
            }else{
                llaveLogica=true
            }
            return llaveLogica
        } catch (error) {
            console.error(error)
        }
    }
    // variable
    const guardarRegistro=async(Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente,PARKING_ID_REGISTRO)=>{
        console.log('conectado BD')
        try {
            const result=await pool.query('INSERT INTO reg_visitante (fecha_ingreso,observacion,apartamento,visitante_id,placa,tipo_vehiculo,autorizacion_residente,id_parqueadero) VALUES (?, ?, ?,?,?,?,?,?)',[Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente,PARKING_ID_REGISTRO])
            console.log(result[0])
            return result[0]
        } catch (error) {
            console.error(error)
        }
    }

    const guardarRegistroComunitario=async(Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente)=>{
        console.log('conectado BD')
        try {
            const result=await pool.query('INSERT INTO reg_visitante (fecha_ingreso,observacion,apartamento,visitante_id,placa,tipo_vehiculo,autorizacion_residente) VALUES (?, ?, ?,?,?,?,?)',[Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente])
            console.log(result[0])
            return result[0]
        } catch (error) {
            console.error(error)
        }
    }
    
    const obtenerApartamento=async(idApartamento)=>{
        console.log('conectado BD')
    try {
        const result=await pool.query('SELECT a.numero FROM apartamento as a WHERE a.id=?',[idApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
    }


    let obj={}
    console.log('conectado BD')
    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()

    const resPermitirRegistroVisitante=await permitirEntrada({Placa,resTipoParqueadero})
    // console.log('script fuera --->',resPermitirRegistroVisitante)
    if(resPermitirRegistroVisitante){

        // parqueadero priv
        if(resTipoParqueadero[0].id===1){
        try {
            // const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            // console.log(result[0])
            // const ID_VEHICULO=result[0][0].id
            const IdApartamento=ID_APTO
            // console.log('ID VEHICULO->',ID_VEHICULO)
            const FECHA_ACTUAL=ObtenerFechaActual()
            const apartamentoResult=await obtenerApartamento(IdApartamento)
            console.log(apartamentoResult[0])
            const NUMERO_APARTAMENTO=apartamentoResult[0].numero
    
    
            const carro=1
            const moto=2
            const idApartamento=ID_APTO
            
            


            if(carro===TP_VEHICULO){
                console.log('carro')
                const result1=await pool.query('SELECT * FROM parqueadero_comun as p WHERE p.apartamento_id=?',[idApartamento])
                console.log(result1[0])
                let PARKING_ID_REGISTRO=0
                let PARKING_NOMBRE=''
                for (let i = 0; i < result1[0].length; i++) {
                    const item = result1[0][i];
                    console.log(item.id)
                    const resLlaveLogica=await obtenerParqueaderoLibre(item.id)
                    const resLlaveLogicaVisitante=await obtenerParqueaderoLibreVisitante(item.id)
                    if(resLlaveLogica && resLlaveLogicaVisitante){
                        console.log('PARQUEADERO DISPONIBLE --->',item.id)
                        PARKING_ID_REGISTRO=item.id
                        PARKING_NOMBRE=item.numero
                        break
                    }
                }
                console.log('saliendo FOR.. PARKING DISPONIBLE->',PARKING_ID_REGISTRO)
                // if(PARKING_ID_REGISTRO!=0){
                if(true){
                    const OBSERVACION=Observacion===''?null:Observacion
                    const result1=await pool.query('SELECT * FROM reg_visitante as p WHERE p.apartamento_id=?',[idApartamento])
                    // Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente,id_parqueadero
                    const resCorre=obtenerCorreo(idApartamento,`Se le notifica el ingreso de un visitante con placa:${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, la fecha: ${FECHA_ACTUAL}, utilizara el parqueadero: ${PARKING_NOMBRE}`)
                    const resQuery5=await guardarRegistro(FECHA_ACTUAL,OBSERVACION,ID_APTO,ID_VISITANTE,Placa,TP_VEHICULO,IdAutorizacionResi,PARKING_ID_REGISTRO)
                    console.log('respuesta del registro-->',resQuery5)
                    obj.status=1
                    obj.msg=`El Vehiculo con placa: ${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, utilizara el parqueadero: ${PARKING_NOMBRE}, la fecha: ${FECHA_ACTUAL}`
                }else{
                    console.log('NO HAY PARKING DISPONIBLE')
                    obj.status=0
                    obj.msg='SIN PARQUEADEROS DISPONIBLES'
                }
    
            }
            if(moto===TP_VEHICULO){
                console.log('moto')
                const result1=await pool.query('SELECT * FROM parqueadero_comun as p WHERE p.apartamento_id=?',[idApartamento])
                console.log(result1[0])
                let PARKING_ID_REGISTRO=0
                let PARKING_NOMBRE=''
                for (let i = 0; i < result1[0].length; i++) {
                    const item = result1[0][i];
                    console.log(item.id)
                    const resLlaveLogica=await obtenerParqueaderoLibre(item.id)
                    const resLlaveLogicaVisitante=await obtenerParqueaderoLibreVisitante(item.id)
                    if(resLlaveLogica && resLlaveLogicaVisitante){
                        console.log('PARQUEADERO DISPONIBLE --->',item.id)
                        PARKING_ID_REGISTRO=item.id
                        PARKING_NOMBRE=item.numero
                        break
                    }
                }
                console.log('saliendo FOR.. PARKING DISPONIBLE->',PARKING_ID_REGISTRO)
                if(PARKING_ID_REGISTRO!=0){
                    const OBSERVACION=Observacion===''?null:Observacion
                    const resCorre=obtenerCorreo(idApartamento,`Se le notifica el ingreso de un visitante con placa:${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, la fecha: ${FECHA_ACTUAL}, utilizara el parqueadero: ${PARKING_NOMBRE}`)
                    const resQuery5=await guardarRegistro(FECHA_ACTUAL,OBSERVACION,ID_APTO,ID_VISITANTE,Placa,TP_VEHICULO,IdAutorizacionResi,PARKING_ID_REGISTRO)
                    console.log('respuesta del registro-->',resQuery5)
                    obj.status=1
                    obj.msg=`El Vehiculo con placa: ${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, utilizara el parqueadero: ${PARKING_NOMBRE}, 
                    la fecha: ${FECHA_ACTUAL}`
                }else{
                    console.log('NO HAY PARKING DISPONIBLE')
                    obj.status=0
                    obj.msg='SIN PARQUEADEROS DISPONIBLES'
                }
            }
    
    
            return obj
        } catch (error) {
            console.error(error)
        }
        }

        // parqueadero comunitario
        if(resTipoParqueadero[0].id===2){
            try {
                // const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
                // console.log(result[0])
                // const ID_VEHICULO=result[0][0].id
                const IdApartamento=ID_APTO
                // console.log('ID VEHICULO->',ID_VEHICULO)
                const FECHA_ACTUAL=ObtenerFechaActual()
                const apartamentoResult=await obtenerApartamento(IdApartamento)
                console.log(apartamentoResult[0])
                const NUMERO_APARTAMENTO=apartamentoResult[0].numero
                
                const OBSERVACION=Observacion===''?null:Observacion
                        
                // Fecha,Observacion,id_apartamento,id_visitante,placa,tipo_vehiculo,autorizacion_residente,id_parqueadero
                const resCorre=obtenerCorreo(IdApartamento,`Se le notifica el ingreso de un visitante con placa:${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, la fecha: ${FECHA_ACTUAL}`)
                const resQuery5=await guardarRegistroComunitario(FECHA_ACTUAL,OBSERVACION,ID_APTO,ID_VISITANTE,Placa,TP_VEHICULO,IdAutorizacionResi)
                console.log('respuesta del registro-->',resQuery5)
                obj.status=1
                obj.msg=`El Vehiculo con placa: ${Placa}, utilizara el parqueadero del apartamento: ${NUMERO_APARTAMENTO}, la fecha: ${FECHA_ACTUAL}`
        
        
                return obj
            } catch (error) {
                console.error(error)
            }
        }


    }else{
        console.log('LA PLACA YA SE ENCUENTRA REGISTRADA')
        obj.status=0
        obj.msg='LA PLACA YA SE ENCUENTRA REGISTRADA'
    }

    
    return obj

    
    
}


const RegistrarSalidaVisitante=async({Placa,Observacion})=>{
    const ObtenerFechaActual=()=>{
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();

        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

        console.log(fechaFormateada); // Salida: YYYY-MM-DD
        return fechaFormateada
    }

    let obj={}
    console.log('conectado BD')
    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()

    // parqueadero priv
    if(resTipoParqueadero[0].id===1){
        try {
            // const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            // console.log(result[0])
            // const ID_VEHICULO=result[0][0].id
            // const IdApartamento=result[0][0].apartamento_id
            console.log('PLACA ->',Placa)
            const FECHA_ACTUAL=ObtenerFechaActual()
    
            const result2=await pool.query('SELECT * FROM reg_visitante WHERE placa=? AND fecha_salida is NULL',[Placa])
            // let obj={}
            if(result2[0].length>0){
                console.log(result2[0][0])
                const REGISTRO_ID=result2[0][0].id
                const OBSERVACION=Observacion===''?null:Observacion
                const result3=await pool.query('UPDATE reg_visitante SET fecha_salida = ?,observacion_salida = ? WHERE id = ?',[FECHA_ACTUAL,OBSERVACION,REGISTRO_ID])
                obj.status=1
                obj.msg='Registro exitoso!'
            }else{
                obj.status=0
                obj.msg=`No se encontraron registros faltantes de 'SALIDA' con esta placa: ${Placa}`
            }
    
            return obj
        } catch (error) {
            console.error(error)
        }
    }

    // parqueadero comunitario
    if(resTipoParqueadero[0].id===2){
        try {
            // const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            // console.log(result[0])
            // const ID_VEHICULO=result[0][0].id
            // const IdApartamento=result[0][0].apartamento_id
            console.log('PLACA ->',Placa)
            const FECHA_ACTUAL=ObtenerFechaActual()
    
            const result2=await pool.query('SELECT * FROM reg_visitante WHERE placa=? AND fecha_salida is NULL',[Placa])
            // let obj={}
            if(result2[0].length>0){
                console.log(result2[0][0])
                const REGISTRO_ID=result2[0][0].id
                const OBSERVACION=Observacion===''?null:Observacion
                const result3=await pool.query('UPDATE reg_visitante SET fecha_salida = ?,observacion_salida = ? WHERE id = ?',[FECHA_ACTUAL,OBSERVACION,REGISTRO_ID])
                obj.status=1
                obj.msg='Registro exitoso!'
            }else{
                obj.status=0
                obj.msg=`No se encontraron registros faltantes de 'SALIDA' con esta placa: ${Placa}`
            }
    
            return obj
        } catch (error) {
            console.error(error)
        }
    }


    
}



const ObtenerParqueaderos=async({Placa,Observacion})=>{

    

    const permitirEntrada=async({Placa,resTipoParqueadero})=>{
        console.log('conectado BD')
        const TP_ALMACEN=resTipoParqueadero[0].id
        console.log('tipo almacen --->',TP_ALMACEN)
        let llaveLogica_privado=false
        let llaveLogica_publico=false
        let llaveLogica_visitante=false
        let llaveLogica_TOTAL=false
        try {
            const result_VEHICULO=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            console.log('result_VEHICULO ->',result_VEHICULO)
            const ID_VEHICULO=result_VEHICULO[0][0].id
            console.log('ID_VEHICULO -> permitir',ID_VEHICULO)
            const result_privado=await pool.query('SELECT * FROM reg_parqueadero_comun as p WHERE p.id_vehiculo=? AND p.fecha_salida is NULL;',[ID_VEHICULO])
            console.log(result_privado[0])

            const result_publico=await pool.query('SELECT * FROM reg_parqueadero_comunitario as p WHERE p.vehiculo_id=? AND p.fecha_salida is NULL;',[ID_VEHICULO])
            console.log(result_publico[0])

            const result_visitante=await pool.query('SELECT * FROM reg_visitante as p WHERE p.placa=? AND p.fecha_salida is NULL;',[Placa])
            console.log(result_visitante[0])
            
            // reg privado
            if(result_privado[0].length>0){
                llaveLogica_privado=false
            }else{
                llaveLogica_privado=true
            }

            // reg publico
            if(result_publico[0].length>0){
                llaveLogica_publico=false
            }else{
                llaveLogica_publico=true
            }

            //reg_visitante
            if(result_visitante[0].length>0){
                llaveLogica_visitante=false
            }else{
                llaveLogica_visitante=true
            }


            console.log(llaveLogica_privado,'llaveLogica_privado')
            console.log(llaveLogica_publico,'llaveLogica_publico')
            console.log(llaveLogica_visitante,'llaveLogica_visitante')
            // privado
            if(TP_ALMACEN===1){

                llaveLogica_publico=true

            // publico
            }else{

                llaveLogica_privado=true
            }
            

            if(llaveLogica_privado && llaveLogica_publico && llaveLogica_visitante){
                llaveLogica_TOTAL=true
            }else{
                llaveLogica_TOTAL=false
            }
            console.log(llaveLogica_TOTAL,'llaveLogica_TOTAL')

            return llaveLogica_TOTAL
        } catch (error) {
            console.error(error)
        }
    }

    // constante
    const ObtenerFechaActual=()=>{
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();

        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

        console.log(fechaFormateada); // Salida: YYYY-MM-DD
        return fechaFormateada
    }
    // variable
    const obtenerParqueaderoLibre=async(idApartamento,tpVehiculo)=>{
        console.log('conectado BD')
        let llaveLogica=false
        try {
            // viejo sql
            // const result=await pool.query('SELECT * FROM reg_parqueadero_comun as p WHERE p.parqueadero_comun_id=? AND p.fecha_salida is NULL;',[idApartamento])
            // console.log(result[0])

            // nuevo sql
            const result=await pool.query('SELECT * FROM reg_parqueadero_comun as p INNER JOIN vehiculo as v ON p.id_vehiculo=v.id WHERE p.parqueadero_comun_id=3 AND p.fecha_salida is NULL AND v.id_tipo_vehiculo=?;',[idApartamento,tpVehiculo])
            console.log(result[0])

            //si el .length es === 0 quiere decir que el parqueadero esta disponible; por el contrario si tiene algun resultado es porque el parqueadero aun esta en uso,puesto que tiene un registro de uso sin fecha de salida,por lo tanto el auto anteriormente ingresado no ha salido del parking
            if(result[0].length>0){
                llaveLogica=false
            }else{
                llaveLogica=true
            }
            return llaveLogica
        } catch (error) {
            console.error(error)
        }
    }
    const obtenerParqueaderoLibreVisitante=async(IdParqueadero,tpVehiculo)=>{
        console.log('conectado BD')
        let llaveLogica=false
        try {
            const result=await pool.query('SELECT * FROM reg_visitante as p INNER JOIN vehiculo as v ON p.tipo_vehiculo=v.id WHERE p.id_parqueadero=3 AND p.fecha_salida is NULL AND v.id_tipo_vehiculo=?;',[IdParqueadero,tpVehiculo])
            console.log(result[0])
            //si el .length es === 0 quiere decir que el parqueadero esta disponible; por el contrario si tiene algun resultado es porque el parqueadero aun esta en uso,puesto que tiene un registro de uso sin fecha de salida,por lo tanto el auto anteriormente ingresado no ha salido del parking
            if(result[0].length>0){
                llaveLogica=false
            }else{
                llaveLogica=true
            }
            return llaveLogica
        } catch (error) {
            console.error(error)
        }
    }
    // variable
    const guardarRegistro=async(Fecha,Observacion,IdVehiculo,IdParqueadero)=>{
        
        console.log('conectado BD')
        try {
            const result=await pool.query('INSERT INTO reg_parqueadero_comun (fecha_ingreso,observacion,id_vehiculo,parqueadero_comun_id) VALUES (?, ?, ?,?)',[Fecha,Observacion,IdVehiculo,IdParqueadero])
            console.log(result[0])
            return result[0]
        } catch (error) {
            console.error(error)
        }
    }

    
    

    const guardarRegistroComunitario=async(Fecha,Observacion,IdVehiculo,IdApartamento)=>{
        console.log('conectado BD')
        try {
            const result=await pool.query('INSERT INTO reg_parqueadero_comunitario (fecha_ingreso,observacion,vehiculo_id,id_apartamento) VALUES (?, ?, ?,?)',[Fecha,Observacion,IdVehiculo,IdApartamento])
            console.log(result[0])
            return result[0]
        } catch (error) {
            console.error(error)
        }
    }
    
    const obtenerApartamento=async(idApartamento)=>{
        console.log('conectado BD')
    try {
        const result=await pool.query('SELECT a.numero FROM apartamento as a WHERE a.id=?',[idApartamento])
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
    }
    let obj={}
    console.log('conectado BD')
    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()
    console.log(Placa,'PLaca ------')
    const resPermitirEntrada=await permitirEntrada({Placa,resTipoParqueadero})
    console.log('script fuera --->',resPermitirEntrada)
   if(resPermitirEntrada){
        // parqueadero priv
        if(resTipoParqueadero[0].id===1){
            try {
                const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
                console.log(result[0])
                const ID_VEHICULO=result[0][0].id
                const IdApartamento=result[0][0].apartamento_id
                console.log('ID VEHICULO->',ID_VEHICULO)
                const FECHA_ACTUAL=ObtenerFechaActual()
                const apartamentoResult=await obtenerApartamento(IdApartamento)
                console.log(apartamentoResult[0])
                const NUMERO_APARTAMENTO=apartamentoResult[0].numero
        
        
                const carro=1
                const moto=2
                const idApartamento=result[0][0].apartamento_id
                // const resPermitirEntrada=await permitirEntrada({ID_VEHICULO,resTipoParqueadero})

                if(carro===result[0][0].id_tipo_vehiculo){
                    console.log('carro')
                    const result1=await pool.query('SELECT * FROM parqueadero_comun as p WHERE p.apartamento_id=?',[idApartamento])
                    console.log(result1[0])
                    let PARKING_ID_REGISTRO=0
                    let PARKING_NOMBRE=''
                    for (let i = 0; i < result1[0].length; i++) {
                        const item = result1[0][i];
                        console.log(item.id)
                        const resLlaveLogica=await obtenerParqueaderoLibre(item.id,carro)
                        const resLlaveLogicaVisitante=await obtenerParqueaderoLibreVisitante(item.id,carro)
                        if(resLlaveLogica && resLlaveLogicaVisitante){
                            console.log('PARQUEADERO DISPONIBLE --->',item.id)
                            PARKING_ID_REGISTRO=item.id
                            PARKING_NOMBRE=item.numero
                            break
                        }
                    }
                    console.log('saliendo FOR.. PARKING DISPONIBLE->',PARKING_ID_REGISTRO)
                    if(PARKING_ID_REGISTRO!=0){
                        const OBSERVACION=Observacion===''?null:Observacion
                        // const msjCorreo=''
                        // const resCorreo=obtenerCorreo(idApartamento,)
                        const resQuery5=await guardarRegistro(FECHA_ACTUAL,OBSERVACION,ID_VEHICULO,PARKING_ID_REGISTRO)
                        console.log('respuesta del registro-->',resQuery5)
                        obj.status=1
                        obj.msg=`El Vehiculo con placa: ${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, utilizara el parqueadero: ${PARKING_NOMBRE}, la fecha: ${FECHA_ACTUAL}`
                    }else{
                        console.log('NO HAY PARKING DISPONIBLE')
                        obj.status=0
                        obj.msg='SIN PARQUEADEROS DISPONIBLES'
                    }
        
                }
                if(moto===result[0][0].id_tipo_vehiculo){
                    console.log('moto')
                    // sql viejo
                    // const result1=await pool.query('SELECT * FROM parqueadero_comun as p WHERE p.apartamento_id=? AND p.num_carros=0;',[idApartamento])
                    // sql nuevo
                    const result1=await pool.query('SELECT * FROM parqueadero_comun as p WHERE p.apartamento_id=?;',[idApartamento])
                    console.log(result1[0])
                    let PARKING_ID_REGISTRO=0
                    let PARKING_NOMBRE=''
                    for (let i = 0; i < result1[0].length; i++) {
                        const item = result1[0][i];
                        console.log(item.id)
                        const resLlaveLogica=await obtenerParqueaderoLibre(item.id,moto)
                        const resLlaveLogicaVisitante=await obtenerParqueaderoLibreVisitante(item.id,moto)
                        if(resLlaveLogica && resLlaveLogicaVisitante){
                            console.log('PARQUEADERO DISPONIBLE --->',item.id)
                            PARKING_ID_REGISTRO=item.id
                            PARKING_NOMBRE=item.numero
                            break
                        }
                    }
                    console.log('saliendo FOR.. PARKING DISPONIBLE->',PARKING_ID_REGISTRO)
                    if(PARKING_ID_REGISTRO!=0){
                        const OBSERVACION=Observacion===''?null:Observacion
                        // obtenerCorreo(idApartamento)
                        const resQuery5=await guardarRegistro(FECHA_ACTUAL,OBSERVACION,ID_VEHICULO,PARKING_ID_REGISTRO)
                        console.log('respuesta del registro-->',resQuery5)
                        obj.status=1
                        obj.msg=`El Vehiculo con placa: ${Placa}, dirigido al apartamento: ${NUMERO_APARTAMENTO}, utilizara el parqueadero: ${PARKING_NOMBRE}, 
                        la fecha: ${FECHA_ACTUAL}`
                    }else{
                        console.log('NO HAY PARKING DISPONIBLE')
                        obj.status=0
                        obj.msg='SIN PARQUEADEROS DISPONIBLES'
                    }
                }
        
                
        
        
                return obj
            } catch (error) {
                console.error(error)
            }
        }

        // parqueadero comunitario
        if(resTipoParqueadero[0].id===2){
            try {
                const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
                console.log(result[0])
                const ID_VEHICULO=result[0][0].id
                const IdApartamento=result[0][0].apartamento_id
                console.log('ID VEHICULO->',ID_VEHICULO)
                const FECHA_ACTUAL=ObtenerFechaActual()
                const apartamentoResult=await obtenerApartamento(IdApartamento)
                console.log(apartamentoResult[0])
                const NUMERO_APARTAMENTO=apartamentoResult[0].numero
                const OBSERVACION=Observacion===''?null:Observacion
                // obtenerCorreo(IdApartamento)
                const resQuery5=await guardarRegistroComunitario(FECHA_ACTUAL,OBSERVACION,ID_VEHICULO,IdApartamento)
                console.log('respuesta del registro-->',resQuery5)
                obj.status=1
                obj.msg=`El Vehiculo con placa: ${Placa}, utilizara el parqueadero del apartamento: ${NUMERO_APARTAMENTO}, la fecha: ${FECHA_ACTUAL}`

                
        
        
                return obj
            } catch (error) {
                console.error(error)
            }
        }
   }else{
        console.log('LA PLACA YA SE ENCUENTRA REGISTRADA')
        obj.status=0
        obj.msg='LA PLACA YA SE ENCUENTRA REGISTRADA'
    }
    
    return obj
    
    
}


const RegistrarSalida=async({Placa,Observacion})=>{
    const ObtenerFechaActual=()=>{
        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1; // Meses van de 0 a 11
        const dia = fechaActual.getDate();

        const fechaFormateada = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

        console.log(fechaFormateada); // Salida: YYYY-MM-DD
        return fechaFormateada
    }

    let obj={}
    console.log('conectado BD')
    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()

    // parqueadero priv
    if(resTipoParqueadero[0].id===1){
        try {
            const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            console.log(result[0])
            const ID_VEHICULO=result[0][0].id
            const IdApartamento=result[0][0].apartamento_id
            console.log('ID VEHICULO->',ID_VEHICULO)
            const FECHA_ACTUAL=ObtenerFechaActual()
    
            const result2=await pool.query('SELECT * FROM reg_parqueadero_comun WHERE id_vehiculo=? AND fecha_salida is NULL',[ID_VEHICULO])
            // let obj={}
            if(result2[0].length>0){
                console.log(result2[0][0])
                const REGISTRO_ID=result2[0][0].id
                const OBSERVACION=Observacion===''?null:Observacion
                const result3=await pool.query('UPDATE reg_parqueadero_comun SET fecha_salida = ?,observacion_salida = ? WHERE id = ?',[FECHA_ACTUAL,OBSERVACION,REGISTRO_ID])
                obj.status=1
                obj.msg='Registro exitoso!'
            }else{
                obj.status=0
                obj.msg=`No se encontraron registros faltantes de 'SALIDA' con esta placa: ${Placa}`
            }
    
            return obj
        } catch (error) {
            console.error(error)
        }
    }

    // parqueadero comunitario
    if(resTipoParqueadero[0].id===2){
        try {
            const result=await pool.query('SELECT * FROM vehiculo as v WHERE v.placa=?',[Placa])
            console.log(result[0])
            const ID_VEHICULO=result[0][0].id
            const IdApartamento=result[0][0].apartamento_id
            console.log('ID VEHICULO->',ID_VEHICULO)
            const FECHA_ACTUAL=ObtenerFechaActual()
    
            const result2=await pool.query('SELECT * FROM reg_parqueadero_comunitario WHERE vehiculo_id=? AND fecha_salida is NULL',[ID_VEHICULO])
            // let obj={}
            if(result2[0].length>0){
                console.log(result2[0][0])
                const REGISTRO_ID=result2[0][0].id
                const OBSERVACION=Observacion===''?null:Observacion
                const result3=await pool.query('UPDATE reg_parqueadero_comunitario SET fecha_salida = ?,observacion_salida = ? WHERE id = ?',[FECHA_ACTUAL,OBSERVACION,REGISTRO_ID])
                obj.status=1
                obj.msg='Registro exitoso!'
            }else{
                obj.status=0
                obj.msg=`No se encontraron registros faltantes de 'SALIDA' con esta placa: ${Placa}`
            }
    
            return obj
        } catch (error) {
            console.error(error)
        }
    }



    
    
}




const getConsulta=async(TP_ALMACEN)=>{
    console.log('conectado BD')
    let queryRes
    try {
        const result=await pool.query('SELECT p.id,p.fecha_ingreso,p.fecha_salida,p.observacion,p.observacion_salida,v.placa,v.id_tipo_vehiculo as tipo,a.numero as apartamento,t.nombre as torre FROM reg_parqueadero_comun as p INNER JOIN vehiculo as v ON p.id_vehiculo=v.id INNER JOIN apartamento as a ON v.apartamento_id=a.id INNER JOIN torre as t ON a.id_torre=t.id ORDER BY p.id DESC')

        const result2=await pool.query('SELECT p.id,p.fecha_ingreso,p.fecha_salida,p.observacion,p.observacion_salida,v.placa,v.id_tipo_vehiculo as tipo,a.numero as apartamento, t.nombre as torre FROM reg_parqueadero_comunitario as p INNER JOIN vehiculo as v ON p.vehiculo_id=v.id INNER JOIN apartamento as a ON p.id_apartamento=a.id INNER JOIN torre as t ON a.id_torre=t.id ORDER BY p.id DESC')
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


const getConsultaVisitante=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT v.nombre as visitante_nombre,v.apellido as visitante_apellido,v.foto as visitante_foto,res.nombre as residente_nombre,res.apellido as residente_apellido,r.visitante_id,r.fecha_ingreso,r.fecha_salida,r.observacion,r.observacion_salida,r.placa,r.tipo_vehiculo,a.numero,t.nombre as torre FROM reg_visitante as r INNER JOIN apartamento as a ON r.apartamento=a.id INNER JOIN torre as t ON a.id_torre=t.id INNER JOIN residentes as res on r.autorizacion_residente=res.id INNER JOIN visitante as v ON r.visitante_id=v.id ORDER BY r.id DESC;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  



module.exports={PlacaValida,consultaAlmacen,ParqueaderosOcupados,tipoAutoResidente,ObtenerParqueaderos,ObtenerPropietario,getConsulta,RegistrarSalida,ObtenerParqueaderosVisitante,ParqueaderosOcupadosVisitante,RegistrarSalidaVisitante,getConsultaVisitante,consultaAlmacenComunitario,ParqueaderosOcupadosComunitario}
