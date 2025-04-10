const express = require('express')
const app = express();
const {getUsersList,getUsers,createUser,getUserById,editUser,deleteUser,getUsersOperario}=require('../backend/querys/Users')
const {getTorres,createTorre,getTorreById,editTorre,deleteTorre} = require('../backend/querys/Torres')
const {getDepartamentos,getDepartamentoByTorre,createDepartamento,getDepartamentoById,editDepartamento,deleteDepartamento,getDepartamentosCONTACTOS} = require('../backend/querys/Departamentos')
const {getAlas,createAlas,getAlasById,editAlas,deleteAla}=require('../backend/querys/Alas')
const {getResidentes,getDepartamentosResi,createResidente,getResidenteById,editResidente,deleteResidente,getResidenteByApto,deleteResidentesByApto,getResidentesInforme,getRegistrosResidentesInforme}=require('../backend/querys/Residentes')
const {getParqueaderos,getDepartamentosParqueaderos,createParqueaderos,getParqueaderoById,editParqueaderos,deleteParqueadero,getParqueadero_TipoALmacen,updateParqueadero_TipoALmacen,getParqueaderos_Comunitario,updateParqueaderos_Comunitario,getParqueaderosByAPto}=require('../backend/querys/Parqueaderos')
const {getContactos}=require('../backend/querys/Contacto')
const {createPedidos,getPedidos,editPedidos,obtenerCorreoResidente}=require('../backend/querys/Pedidos')
const {createBitacora,getBitacora,createRegistroLlamada,getRegistroLlamada}=require('../backend/querys/Bitacora')
const {PlacaValida,consultaAlmacen,ParqueaderosOcupados,tipoAutoResidente,ObtenerParqueaderos,ObtenerPropietario,getConsulta,RegistrarSalida,ObtenerParqueaderosVisitante,ParqueaderosOcupadosVisitante,RegistrarSalidaVisitante,getConsultaVisitante,consultaAlmacenComunitario,ParqueaderosOcupadosComunitario}=require('../backend/querys/Operario')
const {getVisitanteByCi,getTipoVisitante,createVisitante,getVisitanteInforme,getRegistrosVisitantes,validarRegistroPeatonVisitante,registrarVisitantePeatonREG,registrarVisitanteSALIDAPeatonREG} =require('../backend/querys/Visitante')
const {getRegVisitante,getRegResidentePriv,getRegResidenteComunitario,getRegVisitantePeaton} =require('../backend/querys/Dashboard')
const {getVehiculoByIdApto,getVehiculos,createVehiculo,getVehiculoById,editVehiculo,deleteVehiculo}=require('../backend/querys/Vehiculos')
const {getMacAddress}=require('../backend/Mac/MacScript')
const {createInicioSesion,editSesion,getInicioSesion}=require('../backend/querys/InicioSesion')
const {createMarca,getLogos}=require('../backend/querys/marcaBlanca')
const {getMarcasUnidad,createMarcaUnidad}=require('../backend/querys/MarcaUnidad')
const {EnviarCorreo}=require('../backend/querys/EnviarCorreo')
const bcrypt = require('bcryptjs');



const { Router } = require('express');

const router = Router();


// -------------MAC----------------
router.get('/Api/MacPc',async(req,res)=>{
    
    const result = await getMacAddress();
    
    if (result.success) {
        console.log('MAC encontrada:', result.mac.toUpperCase());
        res.json({status:1,mac:result.mac.toUpperCase()})
    } else {
        console.error('No se pudo obtener la MAC:', result.errors);
        res.json({
            status:0,
            msg:'No se pudo obtener la MAC:',
            error:result.errors
        })
    }

    // if(resQuery.length>0){
    //     res.json({status:1,data:resQuery})
    // }else{
    //     res.json({
    //         status:0,
    //         msg:'Sin Informacion'
    //     })
    // }
    
})

// -------------MENU PERMISOS----------------
router.post('/Api/Menu-Permisos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdUser} =req.body
    console.log(IdUser,'=============> IDUSER')
    const resQuery=await getUserById(IdUser)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // const resQuery=await getUserById(Id)
    // console.log(resQuery)
    // if(resQuery.length>0){
    //     res.json({status:1,data:resQuery})
    // }else{
    //     res.json({
    //         status:0,
    //         msg:'Sin Informacion'
    //     })
    // }
    
})


// ------------MARCA UNIDAD ENDPOINT-------------
router.get('/Api/getMarcaUnidad',async(req,res)=>{
    // const {IdUser} =req.body
    const resQuery=await getMarcasUnidad()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/setMarcaUnidad',async(req,res)=>{
    const {nombre,imagen} =req.body
    const resQuery=await createMarcaUnidad({nombre,imagen})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})


// ------------MARCA BLANCA ENDPOINT-------------
router.post('/Api/MarcaBlanca-lo',async(req,res)=>{
    
    // res.json({status:1,msg:'probando'})
    const {logoData}=req.body
    const resQuery=await createMarca({logo_oficial:logoData})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/MarcaBlanca-lb',async(req,res)=>{
    
    // res.json({status:1,msg:'probando'})
    const {logoData}=req.body
    const resQuery=await createMarca({logo_banner:logoData})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/MarcaBlanca-lm',async(req,res)=>{
    
    // res.json({status:1,msg:'probando'})
    const {logoData}=req.body
    console.log(logoData,'logo menu----------->')
    const resQuery=await createMarca({logo_menu:logoData})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/getMarcaBlanca',async(req,res)=>{
    // const {IdUser} =req.body
    const resQuery=await getLogos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})



// ------------INICIO SESION ENDPOINT-------------
router.post('/Api/operario-inicioSesion',async(req,res)=>{
    function getFechaActual() {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minuto = fecha.getMinutes().toString().padStart(2, '0');
        const segundo = fecha.getSeconds().toString().padStart(2, '0');
        
        return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
      }
      
    // res.json({status:1,msg:'probando'})
    const {IdUser}=req.body
    const resQuery=await createInicioSesion({fecha_ingreso:getFechaActual(),IdUser})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/operario-cierreSesion',async(req,res)=>{
    function getFechaActual() {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const dia = fecha.getDate().toString().padStart(2, '0');
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minuto = fecha.getMinutes().toString().padStart(2, '0');
        const segundo = fecha.getSeconds().toString().padStart(2, '0');
        
        return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
      }
      
    // res.json({status:1,msg:'probando'})
    const {IdUser}=req.body
    const resQuery=await editSesion({fecha_salida:getFechaActual(),IdUser})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/operario-getSesion',async(req,res)=>{
    // const {IdUser} =req.body
    const resQuery=await getInicioSesion()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})


// ------------USUARIOS ENDPOINT-------------
router.post('/Api/Users',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdUser}=req.body
    const resQuery=await getUsersList(IdUser)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/UsersOperarios',async(req,res)=>{
    // const {IdUser} =req.body
    const resQuery=await getUsersOperario()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/User-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getUserById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/User-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Username,Password,Nombre,Apellido,Cedula,Telefono,Id,Correo,IdTpUsuario} =req.body
    console.log(Username)
    console.log(Password)
    console.log(Nombre)
    console.log(Apellido)
    console.log(Cedula)
    console.log(Telefono)
    console.log(Correo,'correo-->')
    let correo2=Correo==''?null:Correo
    const ENCRIPTAR=async(clave)=>{
        try {
            const hash = await bcrypt.hash(clave, 10);
            return hash;
        } catch (err) {
        throw err;
        }
    }

    // const clave = Password;
    const passwordHASH=await ENCRIPTAR(Password)
    console.log('clave hash->',passwordHASH)
    const resEdit=await editUser({Username,Password:passwordHASH,Nombre,Apellido,Cedula,Telefono,Correo:correo2,IdTpUsuario,Id})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/User-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteUser({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})

router.post('/Api/User-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})

    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Username,Password,Nombre,Apellido,Cedula,Telefono,Correo,IdTpUsuario} =item
        console.log(Username)
        console.log(Password)
        console.log(Nombre)
        console.log(Apellido)
        console.log(Cedula)
        console.log(Telefono)
        let correo2=Correo==''?null:Correo
        const ENCRIPTAR=async(clave)=>{
            try {
                const hash = await bcrypt.hash(clave, 10);
                return hash;
            } catch (err) {
            throw err;
            }
        }
    
        // const clave = Password;
        const passwordHASH=await ENCRIPTAR(Password)
        console.log('clave hash->',passwordHASH)
        
        const resCreate=await createUser({Username,Password:passwordHASH,Nombre,Apellido,Cedula,Telefono,Correo:correo2,IdTpUsuario})
        console.log(resCreate)
        if(resCreate){  
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    console.log(llaveLogica,'llaveLogica ------------')
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }








    
    
})


// ------------VEHICULOS ENDPOINT-------------
router.get('/Api/Vehiculos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getVehiculos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Vehiculo-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getVehiculoById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Vehiculo-ByIdApto',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdApto} =req.body
    const resQuery=await getVehiculoByIdApto(IdApto)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Vehiculo-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Placa,IdTipoVehiculo,IdTorre,IdApto,Id} =req.body
    console.log(Placa)
    console.log(IdTipoVehiculo)
    console.log(IdTorre)
    console.log(IdApto)
    const resEdit=await editVehiculo({Placa,IdTipoVehiculo,IdTorre,IdApto,Id})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Vehiculo-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteVehiculo({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})

router.post('/Api/Vehiculos-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})

    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Placa,IdTipoVehiculo,IdTorre,IdApto} =item
        console.log(Placa)
        console.log(IdTipoVehiculo)
        console.log(IdTorre)
        console.log(IdApto)
        
        
        const resCreate=await createVehiculo({Placa,IdTipoVehiculo,IdTorre,IdApto})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    console.log(llaveLogica,'llaveLogica ------------')
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }
    
})


// ------------TORRES ENDPOINT-------------
router.get('/Api/Torres',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getTorres()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Torre-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})

    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Nombre} =item
        
        console.log(Nombre)
        
        const resCreate=await createTorre({Nombre})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    console.log(llaveLogica,'llaveLogica ------------')
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }

    
})

router.post('/Api/Torre-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getTorreById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Torre-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Nombre,Id} =req.body
    console.log(Nombre)
    const resEdit=await editTorre({Id,Nombre})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Torre-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteTorre({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})



// ------------DEPARTAMENTOS ENDPOINT-------------
router.get('/Api/Departamentos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getDepartamentos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Departamentos-Contactos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getDepartamentosCONTACTOS()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Departamentos-ByTorre',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {id} =req.body
    const resQuery=await getDepartamentoByTorre({id})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Departamentos-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Numero,IdAla} =item
        
        // console.log(Nombre)
        
        const resCreate=await createDepartamento({Numero,IdTorre:IdAla})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    console.log(llaveLogica,'llaveLogica ------------')
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }





    
    
})

router.post('/Api/Departamento-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getDepartamentoById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Departamento-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Numero,Id,IdTorre} =req.body
    console.log(Numero)
    const resEdit=await editDepartamento({Id,Numero,IdTorre})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Departamento-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteDepartamento({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})



// ------------ALAS ENDPOINT-------------
router.get('/Api/Alas',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getAlas()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Alas-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Nombre,IdTorre} =req.body
    
    console.log(Nombre,IdTorre)
    
    const resCreate=await createAlas({Nombre,IdTorre})
    console.log(resCreate)
    if(resCreate){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Registro'
        })
    }
    
})

router.post('/Api/Alas-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getAlasById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Alas-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Nombre,Id,IdTorre} =req.body
    console.log(Nombre)
    const resEdit=await editAlas({Id,Nombre,IdTorre})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Ala-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteAla({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})


// ------------RESIDENTES ENDPOINT-------------
router.get('/Api/Residentes',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getResidentes()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Residentes-apartamentos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getDepartamentosResi()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Residentes-Create',async(req,res)=>{
    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Nombre,Apellido,Telefono,IdAla,Telefono2,Tipo,Correo} =item
        console.log(Nombre)
        console.log(Apellido)
        console.log(Telefono)
        console.log(IdAla)
        let IdApartamento=IdAla
        let telf2=Telefono2==''?null:Telefono2
        const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo,Correo})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    // console.log(resCreate)
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }
    
})

router.post('/Api/Residente-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getResidenteById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Residente-ByIdApto',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdApto} =req.body
    console.log(IdApto)
    const resQuery=await getResidenteByApto(IdApto)
    console.log(resQuery,'byidResidentes--')
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Residente-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id,Nombre,Apellido,Telefono,IdApartamento,Telefono2,Tipo,Correo} =req.body
    console.log(Correo)
    let telf2=Telefono2==''?null:Telefono2
    const resEdit=await editResidente({Id,Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo,Correo})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Residente-EditGroup',async(req,res)=>{

    let arr=req.body
    console.log(arr,'--->data')
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Id,Nombre,Apellido,Telefono,IdApartamento,Telefono2,Tipo} =item
        console.log(Nombre)
        console.log(Apellido)
        console.log(Telefono)
        let telf2=Telefono2==''?null:Telefono2
        const resEdit=await editResidente({Id,Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo})
        console.log(resEdit)
        if(resEdit){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }





    // // res.json({status:1,msg:'probando'})
    // const {Id,Nombre,Apellido,Telefono,IdApartamento,Telefono2,Tipo} =req.body
    // // console.log(Numero)
    // let telf2=Telefono2==''?null:Telefono2
    // const resEdit=await editResidente({Id,Nombre,Apellido,Telefono,IdApartamento,telf2,Tipo})
    // console.log(resEdit)
    // if(resEdit){
    //     res.json({
    //         status:1,
    //         msg:'Edicion exitosa!'
    //     })
    // }else{
    //     res.json({
    //         status:0,
    //         msg:'Error en Edicion'
    //     })
    // }
    
})

router.post('/Api/Residente-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteResidente({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})

router.post('/Api/Residente-DeleteByApto',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdApto} =req.body
    console.log(IdApto)
    const resDelete=await deleteResidentesByApto({IdApto})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})




// ------------PEDIDOS ENDPOINT-------------
router.get('/Api/Pedidos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    
    const resQuery=await getPedidos()
    console.log(resQuery,'resquery pedidos////')
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Pedidos-Entregado',async(req,res)=>{
    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    function obtenerFechaActual() {
        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const día = String(hoy.getDate()).padStart(2, '0');
        const horas = String(hoy.getHours()).padStart(2, '0');
        const minutos = String(hoy.getMinutes()).padStart(2, '0');
        const segundos = String(hoy.getSeconds()).padStart(2, '0');
        
        return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
    }
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Id} =item
        let fecha_entrega=obtenerFechaActual()
        console.log(fecha_entrega)
        const resCreate=await editPedidos({Id,fecha_entrega})
        const resCorreo=await obtenerCorreoResidente(Id)
        const CorreoResidente=resCorreo[0].correo
        const UsuarioNombreYApellido=resCorreo[0].nombre+' '+resCorreo[0].apellido
        const Titulo='Notificación de Entrega de Paquete'
        const Mensaje=`Hola ${UsuarioNombreYApellido},¡Tienes un paquete en la residencia! Estamos emocionados de que hayas recibido algo nuevo.`
        console.log(CorreoResidente)
        console.log(UsuarioNombreYApellido)
        console.log(Titulo)
        console.log(Mensaje)
        EnviarCorreo(CorreoResidente,Titulo,Mensaje)
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }
    
})

router.post('/Api/Pedidos-Create',async(req,res)=>{
    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {IdUser,emisor,IdTorreSelect,IdAptoSelect,IdResidenteSelect,observacion} =item
        // console.log(Nombre)
        // console.log(Apellido)
        // console.log(Telefono)
        // console.log(IdAla)
        function obtenerFechaActual() {
            const hoy = new Date();
            const año = hoy.getFullYear();
            const mes = String(hoy.getMonth() + 1).padStart(2, '0');
            const día = String(hoy.getDate()).padStart(2, '0');
            const horas = String(hoy.getHours()).padStart(2, '0');
            const minutos = String(hoy.getMinutes()).padStart(2, '0');
            const segundos = String(hoy.getSeconds()).padStart(2, '0');
            
            return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
        }
        // let IdApartamento=IdAla
        let fecha_llegada=obtenerFechaActual()
        // let telf2=Telefono2==''?null:Telefono2
        const resCreate=await createPedidos({IdUser,emisor,IdTorreSelect,IdAptoSelect,IdResidenteSelect,observacion,fecha_llegada})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    // console.log(resCreate)
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }
    
})



// ------------DASHBOARD ENDPOINT-------------
router.get('/Api/Dashboard',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const fechaHoy = new Date();
    const fecha30DiasAtras = new Date(fechaHoy.getTime() - 30 * 24 * 60 * 60 * 1000);

    const año = fecha30DiasAtras.getFullYear();
    const mes = (fecha30DiasAtras.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha30DiasAtras.getDate().toString().padStart(2, '0');
    const hora = fecha30DiasAtras.getHours().toString().padStart(2, '0');
    const minutos = fecha30DiasAtras.getMinutes().toString().padStart(2, '0');
    const segundos = fecha30DiasAtras.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    console.log(fechaFormateada,'fecha formateada---->');
    const resQuery=await getRegVisitante({fecha:fechaFormateada.toString()})
    console.log(resQuery,'resquery reg_visitante////')
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Dashboard-VisitantesPeaton',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const fechaHoy = new Date();
    const fecha30DiasAtras = new Date(fechaHoy.getTime() - 30 * 24 * 60 * 60 * 1000);

    const año = fecha30DiasAtras.getFullYear();
    const mes = (fecha30DiasAtras.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha30DiasAtras.getDate().toString().padStart(2, '0');
    const hora = fecha30DiasAtras.getHours().toString().padStart(2, '0');
    const minutos = fecha30DiasAtras.getMinutes().toString().padStart(2, '0');
    const segundos = fecha30DiasAtras.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    console.log(fechaFormateada,'fecha formateada---->');
    const resQuery=await getRegVisitantePeaton({fecha:fechaFormateada.toString()})
    console.log(resQuery,'resquery reg_visitante////')
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Dashboard-Residentes',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const fechaHoy = new Date();
    const fecha30DiasAtras = new Date(fechaHoy.getTime() - 30 * 24 * 60 * 60 * 1000);

    const año = fecha30DiasAtras.getFullYear();
    const mes = (fecha30DiasAtras.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha30DiasAtras.getDate().toString().padStart(2, '0');
    const hora = fecha30DiasAtras.getHours().toString().padStart(2, '0');
    const minutos = fecha30DiasAtras.getMinutes().toString().padStart(2, '0');
    const segundos = fecha30DiasAtras.getSeconds().toString().padStart(2, '0');

    const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    const resTP_ALMACEN=await getParqueadero_TipoALmacen()
    console.log(fechaFormateada,'fecha formateada---->');


    if(resTP_ALMACEN[0].id===1){
        // priv
        const resQuery=await getRegResidentePriv({fecha:fechaFormateada})
        console.log(resQuery)
        if(resQuery.length>0){
            res.json({status:1,data:resQuery,tipo_almacen:resTP_ALMACEN})
        }else{
            res.json({
                status:0,
                msg:'Sin Informacion'
            })
        }
    }
    if(resTP_ALMACEN[0].id===2){
        // comun
        const resQuery2=await getRegResidenteComunitario({fecha:fechaFormateada})
        console.log(resQuery2)
        if(resQuery2.length>0){
            res.json({status:1,data:resQuery2,tipo_almacen:resTP_ALMACEN})
        }else{
            res.json({
                status:0,
                msg:'Sin Informacion'
            })
        }
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})



// -------------INFORMES----------------
router.post('/Api/Residentes-informe',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('entrando api')
    let {IdApto}=req.body
    console.log(IdApto)
    if(IdApto==0){
        IdApto=false
    }
    
    const resQuery=await getResidentesInforme({IdApto})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/Registros-Residentes-informe',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('entrando api')
    let {IdApto,FechaInicio,FechaFin}=req.body
    console.log(IdApto)
    console.log(FechaInicio)
    console.log(FechaFin)
    if(IdApto==0){
        IdApto=false
    }
    if(FechaInicio==''){
        FechaInicio=false
    }
    if(FechaFin==''){
        FechaFin=false
    }
    const resTP_ALMACEN=await getParqueadero_TipoALmacen()
    console.log(resTP_ALMACEN)
    const TP_ALMACEN=resTP_ALMACEN[0].id
    
    const resQuery=await getRegistrosResidentesInforme({TP_ALMACEN,IdApto,FechaInicio,FechaFin})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/Visitantes-informe',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('entrando api')
    let {Cedula}=req.body
    console.log(Cedula)
    if(Cedula==''){
        Cedula=false
    }
    
    const resQuery=await getVisitanteInforme({Cedula})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/Registros-Visitantes-informe',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('entrando api')
    let {IdApto,FechaInicio,FechaFin,Cedula}=req.body
    console.log(IdApto)
    console.log(FechaInicio)
    console.log(FechaFin)
    if(IdApto==0){
        IdApto=false
    }
    if(FechaInicio==''){
        FechaInicio=false
    }
    if(FechaFin==''){
        FechaFin=false
    }
    if(Cedula==''){
        Cedula=false
    }
    
    const resQuery=await getRegistrosVisitantes({Cedula,IdApto,FechaInicio,FechaFin})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})



// ------------PARQUEADEROS ENDPOINT-------------
router.get('/Api/ParqueaderosDASHBOARD',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resTP_ALMACEN=await getParqueadero_TipoALmacen()
    console.log(resTP_ALMACEN,'ParqueaderosDASHBOARD//////////////')
    let resQuery
    if(resTP_ALMACEN[0].id===1){
        // priv
        resQuery=await getParqueaderos()
        console.log(resQuery)
        if(resQuery.length>0){
            res.json({status:1,data:resQuery,tipo_almacen:resTP_ALMACEN})
        }else{
            res.json({
                status:0,
                msg:'Sin Informacion'
            })
        }
    }
    if(resTP_ALMACEN[0].id===2){
        // comun
        resQuery=await getParqueaderos_Comunitario()
        console.log(resQuery)
        if(resQuery.length>0){
            res.json({status:1,data:resQuery,tipo_almacen:resTP_ALMACEN})
        }else{
            res.json({
                status:0,
                msg:'Sin Informacion'
            })
        }
    }
    
    
    // res.sendFile(join(__dirname,'frontend/index.html'))
})


router.get('/Api/Parqueaderos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getParqueaderos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Parqueadero-ByIdApto',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {IdApto}=req.body
    console.log(IdApto,'idapto/////////////////////////')
    const resQuery=await getParqueaderosByAPto({IdApto})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Parqueaderos-Comunitario',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getParqueaderos_Comunitario()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Parqueaderos-Comunitario-Update',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {CUPO_TOTAL_CARRO,CUPO_TOTAL_MOTO,CUPO_POR_APARTAMENTO_CARRO,CUPO_POR_APARTAMENTO_MOTO} =req.body
    
    const resQuery=await updateParqueaderos_Comunitario({CUPO_TOTAL_CARRO,CUPO_TOTAL_MOTO,CUPO_POR_APARTAMENTO_CARRO,CUPO_POR_APARTAMENTO_MOTO})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Parqueaderos-TipoAlmacen',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getParqueadero_TipoALmacen()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Parqueaderos-TipoAlmacen-Update',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await updateParqueadero_TipoALmacen()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Parqueaderos-apartamentos',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getDepartamentosParqueaderos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Parqueaderos-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})

    console.log(req.body)
    let arr=req.body
    
    let llaveLogica=true
    let NumeroRegistroError
    let arrError=[]

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const {Nombre,Autos,Motos,IdApto} =item
        
        // console.log(Nombre)
        
        const resCreate=await createParqueaderos({Nombre,Autos,Motos,IdApartamento:IdApto})
        console.log(resCreate)
        if(resCreate){
            // llaveLogica=
        }else{
            llaveLogica=false
            NumeroRegistroError=i+1
            arrError.push({NumeroRegistro:NumeroRegistroError,status:0,msj:'Hubo un error con el registro #'+NumeroRegistroError})
        }
    }
    
    // const resCreate=await createResidente({Nombre,Apellido,Telefono,IdApartamento})
    console.log(llaveLogica,'llaveLogica ------------')
    if(llaveLogica){
        res.json({
            status:1,
            msg:'Registro exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en el Registro',
            arr:arrError
        })
    }




    // const {Nombre,Autos,Motos,IdApartamento} =req.body
    
    // // console.log(Numero,IdAla)
    
    // const resCreate=await createParqueaderos({Nombre,Autos,Motos,IdApartamento})
    // console.log(resCreate)
    // if(resCreate){
    //     res.json({
    //         status:1,
    //         msg:'Registro exitoso!'
    //     })
    // }else{
    //     res.json({
    //         status:0,
    //         msg:'Error en Registro'
    //     })
    // }
    
})

router.post('/Api/Parqueaderos-ById',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    const resQuery=await getParqueaderoById(Id)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Parqueaderos-Edit',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id,Nombre,Autos,Motos,IdApartamento} =req.body
    // console.log(Numero)
    const resEdit=await editParqueaderos({Id,Nombre,Autos,Motos,IdApartamento})
    console.log(resEdit)
    if(resEdit){
        res.json({
            status:1,
            msg:'Edicion exitosa!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Edicion'
        })
    }
    
})

router.post('/Api/Parqueaderos-Delete',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Id} =req.body
    console.log(Id)
    const resDelete=await deleteParqueadero({Id})
    console.log(resDelete)
    if(resDelete){
        res.json({
            status:1,
            msg:'Borrado exitoso!'
        })
    }else{
        res.json({
            status:0,
            msg:'Error en Borrado'
        })
    }
    
})

// ------------VISITANTE ENDPOINT-------------
router.post('/Api/Visitante-ByCi',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {ci} =req.body
    const resQuery=await getVisitanteByCi(ci)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Visitante-Create',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Nombre,Apellido,Cedula,IdTipoVisitante,UrlFotoPerfilVisitante} =req.body
    const resQuery=await createVisitante({Nombre,Apellido,Cedula,IdTipoVisitante,UrlFotoPerfilVisitante})
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Tipo-Visitante',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    // const {ci} =req.body
    const resQuery=await getTipoVisitante()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})



// ------------BITACORA ENDPOINT-------------
router.post('/Api/Bitacora',async(req,res)=>{

    const {texto,IdUser,fecha}=req.body
    console.log(texto,IdUser,fecha)
    const resQuery=await createBitacora({texto,IdUser,fecha})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/BitacoraInforme',async(req,res)=>{

    const {FechaInicio,FechaFin}=req.body
    // console.log(texto,IdUser,fecha)
    const resQuery=await getBitacora({FechaInicio,FechaFin})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})


// ------------REGISTRO-LLAMADA ENDPOINT-------------
router.get('/Api/RegistroLLamada',async(req,res)=>{

    // const {IdUser,IdDepa,IdResidente,Fecha}=req.body
    // console.log(texto,IdUser,fecha)
    const resQuery=await getRegistroLlamada()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})

router.post('/Api/RegistroLLamada-create',async(req,res)=>{

    const {IdUser,IdDepa,IdResidente,Fecha}=req.body
    // console.log(texto,IdUser,fecha)
    const resQuery=await createRegistroLlamada({IdUser,IdDepa,IdResidente,Fecha})
    console.log(resQuery)
    if(resQuery){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    
})


// ------------CONTACTO ENDPOINT-------------
router.get('/Api/Contacto',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const resQuery=await getContactos()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})


// ------------OPERARIO/PARQUEADERO ENDPOINT-------------
router.post('/Api/Operario-InfoPlaca',async(req,res)=>{
    const {Placa} =req.body
    const resQuery=await PlacaValida(Placa)
    console.log('respuesta PLACA VALIDA ---->',resQuery)


    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()

    // parqueadero priv
    if(resTipoParqueadero[0].id===1){
        if(resQuery.length>0){
            // res.json({status:1,data:resQuery})
            console.log(resQuery[0].apartamento_id)
            const resQuery2=await consultaAlmacen(resQuery[0].apartamento_id)
            console.log('almacen inicial')
            console.log(resQuery2)
            const TIPO_VEHICULO=resQuery[0].id_tipo_vehiculo===1?'Carro':'Moto'
            const NOMBRE_APARTAMENTO=resQuery[0].numero
            const NOMBRE_PARQUEADERO=resQuery2[0].numero
            const resPropietario=await ObtenerPropietario(resQuery2[0].apartamento_id)
            console.log('propietario--->',resPropietario)
            const NOMBRE_PROPIETARIO=resPropietario[0].nombre+' '+resPropietario[0].apellido
            if(resQuery2.length>0){
                let almacen_carro=0
                let almacen_moto=0
                for (let i = 0; i < resQuery2.length; i++) {
                    const item = resQuery2[i];
                    almacen_carro+=item.num_carros
                    almacen_moto+=item.num_motos
                }
                
                // console.log(almacen_carro)
                // console.log(almacen_moto)
                const resQuery3=await ParqueaderosOcupados(resQuery[0].apartamento_id)
                const resQuery3Visitante=await ParqueaderosOcupadosVisitante(resQuery[0].apartamento_id)
                console.log(resQuery3)
                let almacen_carro_restante=almacen_carro
                let almacen_moto_restante=almacen_moto
                if(resQuery3.length>0 || resQuery3Visitante.length>0){
                    
                    console.log('antes del for')
                    console.log('almacen restante carro->',almacen_carro_restante)
                    console.log('almacen restante moto->',almacen_moto_restante)
                    // console.log(resQuery3[0])
                    if(resQuery3.length>0){
                        for (let i = 0; i < resQuery3.length; i++) {
                            console.log('for')
                            const item = resQuery3[i];
                            console.log(item.id_tipo_vehiculo)
                            if(item.id_tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.id_tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    if(resQuery3Visitante.length>0){
                        for (let i = 0; i < resQuery3Visitante.length; i++) {
                            console.log('for')
                            const item = resQuery3Visitante[i];
                            console.log(item.tipo_vehiculo)
                            if(item.tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
    
                    console.log(almacen_carro)
                    console.log(almacen_carro_restante)
                    console.log(almacen_moto)
                    console.log(almacen_moto_restante)
    
                    const resQuery4=await tipoAutoResidente(Placa)
                    console.log(resQuery4[0])
                    let llaveLogica=false
                    if(resQuery4[0].id_tipo_vehiculo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(resQuery4[0].id_tipo_vehiculo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                parqueadero:NOMBRE_PARQUEADERO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                parqueadero:NOMBRE_PARQUEADERO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
                }else{
    
                    const resQuery4=await tipoAutoResidente(Placa)
                    console.log(resQuery4[0])
                    let llaveLogica=false
                    if(resQuery4[0].id_tipo_vehiculo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(resQuery4[0].id_tipo_vehiculo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
    
    
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
    
                }
    
            }else{
                console.log('Este Apto no tiene puestos disponibles,revise inventario!')
                res.json({
                    status:0,
                    msg:'Este Apto no tiene puestos disponibles,revise inventario!',
                    data:{
                        vehiculo:TIPO_VEHICULO,
                        propietario:NOMBRE_PROPIETARIO,
                        apartamento:NOMBRE_APARTAMENTO,
                        puesto_carro:almacen_carro_restante,
                        puesto_moto:almacen_moto_restante
                    }
                })
            }
    
        }else{
            console.log('Numero de Placa no se encuentra asociada a ningun Apto')
            res.json({
                status:0,
                msg:'Numero de Placa no se encuentra asociada a ningun Apto'
            })
            // res.json({
            //     status:0,
            //     msg:'Sin Informacion'
            // })
        }

    }

    // parqueadero comunitario
    if(resTipoParqueadero[0].id===2){
        console.log('PARQUEADERO COMUNITARIO')
        if(resQuery.length>0){
            // res.json({status:1,data:resQuery})
            console.log(resQuery[0].apartamento_id)
            const resQuery2=await consultaAlmacenComunitario()
            console.log('almacen inicial')
            console.log(resQuery2)
            const TIPO_VEHICULO=resQuery[0].id_tipo_vehiculo===1?'Carro':'Moto'
            const NOMBRE_APARTAMENTO=resQuery[0].numero
            // const NOMBRE_PARQUEADERO=resQuery2[0].numero
            const resPropietario=await ObtenerPropietario(resQuery[0].apartamento_id)
            console.log('propietario--->',resPropietario)
            const NOMBRE_PROPIETARIO=resPropietario[0].nombre+' '+resPropietario[0].apellido
            if(resQuery2.length>0){
                let almacen_carro=0
                let almacen_moto=0
                for (let i = 0; i < resQuery2.length; i++) {
                    const item = resQuery2[i];
                    almacen_carro+=item.cupo_carros
                    almacen_moto+=item.cupo_motos
                }
                
                console.log(almacen_carro)
                console.log(almacen_moto)
                const resQuery3=await ParqueaderosOcupadosComunitario(resQuery[0].apartamento_id)
                const resQuery3Visitante=await ParqueaderosOcupadosVisitante(resQuery[0].apartamento_id)
                console.log(resQuery3)
                let almacen_carro_restante=almacen_carro
                let almacen_moto_restante=almacen_moto
                if(resQuery3.length>0 || resQuery3Visitante.length>0){
                    
                    console.log('antes del for')
                    console.log('almacen restante carro->',almacen_carro_restante)
                    console.log('almacen restante moto->',almacen_moto_restante)
                    // console.log(resQuery3[0])
                    if(resQuery3.length>0){
                        for (let i = 0; i < resQuery3.length; i++) {
                            console.log('for')
                            const item = resQuery3[i];
                            console.log(item.id_tipo_vehiculo)
                            if(item.id_tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.id_tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    if(resQuery3Visitante.length>0){
                        for (let i = 0; i < resQuery3Visitante.length; i++) {
                            console.log('for')
                            const item = resQuery3Visitante[i];
                            console.log(item.tipo_vehiculo)
                            if(item.tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
    
                    console.log(almacen_carro)
                    console.log(almacen_carro_restante)
                    console.log(almacen_moto)
                    console.log(almacen_moto_restante)
    
                    const resQuery4=await tipoAutoResidente(Placa)
                    console.log(resQuery4[0])
                    let llaveLogica=false
                    if(resQuery4[0].id_tipo_vehiculo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(resQuery4[0].id_tipo_vehiculo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                                // parqueadero:NOMBRE_PARQUEADERO
                            }
                        })
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                                // parqueadero:NOMBRE_PARQUEADERO
                            }
                        })
                    }
    
    
                }else{
    
                    const resQuery4=await tipoAutoResidente(Placa)
                    console.log(resQuery4[0])
                    let llaveLogica=false
                    if(resQuery4[0].id_tipo_vehiculo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(resQuery4[0].id_tipo_vehiculo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
    
    
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
    
                }
    
            }else{
                console.log('Este Apto no tiene puestos disponibles,revise inventario!')
                res.json({
                    status:0,
                    msg:'Este Apto no tiene puestos disponibles,revise inventario!',
                    data:{
                        vehiculo:TIPO_VEHICULO,
                        propietario:NOMBRE_PROPIETARIO,
                        apartamento:NOMBRE_APARTAMENTO,
                        puesto_carro:almacen_carro_restante,
                        puesto_moto:almacen_moto_restante
                    }
                })
            }
    
        }else{
            console.log('Numero de Placa no se encuentra asociada a ningun Apto')
            res.json({
                status:0,
                msg:'Numero de Placa no se encuentra asociada a ningun Apto'
            })
            // res.json({
            //     status:0,
            //     msg:'Sin Informacion'
            // })
        }
    }


    
    
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.post('/Api/Operario-InfoPlaca-Visitante',async(req,res)=>{
    const {Placa,IdTorre,IdApto,IdTipo} =req.body
    // const resQuery=await PlacaValida(Placa)
    // console.log(resQuery)

    // preguntamos que tipo de parqueadero es (almacen)
    const resTipoParqueadero=await getParqueadero_TipoALmacen()

    // parqueadero priv
    if(resTipoParqueadero[0].id===1){
        if(true){
            // res.json({status:1,data:resQuery})
            // console.log(resQuery[0].apartamento_id)
            const resDepa=await getDepartamentoById(IdApto)
            const resQuery2=await consultaAlmacen(IdApto)
            console.log('almacen inicial')
            console.log(resQuery2)
            const TIPO_VEHICULO=IdTipo?'Carro':'Moto'
            const NOMBRE_APARTAMENTO=resDepa[0].depa_numero
            const resPropietario=await ObtenerPropietario(resQuery2[0].apartamento_id)
            console.log('propietario--->',resPropietario)
            const NOMBRE_PROPIETARIO=resPropietario[0].nombre+' '+resPropietario[0].apellido
            if(resQuery2.length>0){
                let almacen_carro=0
                let almacen_moto=0
                for (let i = 0; i < resQuery2.length; i++) {
                    const item = resQuery2[i];
                    almacen_carro+=item.num_carros
                    almacen_moto+=item.num_motos
                }
                
                // console.log(almacen_carro)
                // console.log(almacen_moto)
                const resQuery3=await ParqueaderosOcupados(IdApto)
                const resQuery3Visitante=await ParqueaderosOcupadosVisitante(IdApto)
                console.log(resQuery3)
                let almacen_carro_restante=almacen_carro
                let almacen_moto_restante=almacen_moto
                if(resQuery3.length>0 || resQuery3Visitante.length>0){
                    
                    console.log('antes del for')
                    console.log('almacen restante carro->',almacen_carro_restante)
                    console.log('almacen restante moto->',almacen_moto_restante)
                    // console.log(resQuery3[0])
                    if(resQuery3.length>0){
                        for (let i = 0; i < resQuery3.length; i++) {
                            console.log('for')
                            const item = resQuery3[i];
                            console.log(item.id_tipo_vehiculo)
                            if(item.id_tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.id_tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    if(resQuery3Visitante.length>0){
                        for (let i = 0; i < resQuery3Visitante.length; i++) {
                            console.log('for')
                            const item = resQuery3Visitante[i];
                            console.log(item.tipo_vehiculo)
                            if(item.tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    
                    console.log(almacen_carro)
                    console.log(almacen_carro_restante)
                    console.log(almacen_moto)
                    console.log(almacen_moto_restante)
    
                    // const resQuery4=await tipoAutoResidente(Placa)
                    // console.log(resQuery4[0])
                    let llaveLogica=false
                    if(IdTipo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(IdTipo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
                }else{
    
                    // const resQuery4=await tipoAutoResidente(Placa)
                    // console.log(resQuery4[0])
                    let llaveLogica=false
                    if(IdTipo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(IdTipo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
    
    
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
    
                }
    
            }else{
                console.log('Este Apto no tiene puestos disponibles,revise inventario!')
                res.json({
                    status:0,
                    msg:'Este Apto no tiene puestos disponibles,revise inventario!',
                    data:{
                        vehiculo:TIPO_VEHICULO,
                        propietario:NOMBRE_PROPIETARIO,
                        apartamento:NOMBRE_APARTAMENTO,
                        puesto_carro:almacen_carro_restante,
                        puesto_moto:almacen_moto_restante
                    }
                })
            }
    
        }else{
            console.log('Numero de Placa no se encuentra asociada a ningun Apto')
            res.json({
                status:0,
                msg:'Numero de Placa no se encuentra asociada a ningun Apto'
            })
            // res.json({
            //     status:0,
            //     msg:'Sin Informacion'
            // })
        }

    }

    // parqueadero comunitario
    if(resTipoParqueadero[0].id===2){
        console.log('PARQUEADERO COMUNITARIO')
        if(true){
            // res.json({status:1,data:resQuery})
            // console.log(resQuery[0].apartamento_id)
            const resDepa=await getDepartamentoById(IdApto)
            const resQuery2=await consultaAlmacenComunitario()
            console.log('almacen inicial')
            console.log(resQuery2)
            const TIPO_VEHICULO=IdTipo?'Carro':'Moto'
            const NOMBRE_APARTAMENTO=resDepa[0].depa_numero
            const resPropietario=await ObtenerPropietario(resDepa[0].depa_id)
            console.log('propietario--->',resPropietario)
            const NOMBRE_PROPIETARIO=resPropietario[0].nombre+' '+resPropietario[0].apellido
            if(resQuery2.length>0){
                let almacen_carro=0
                let almacen_moto=0
                for (let i = 0; i < resQuery2.length; i++) {
                    const item = resQuery2[i];
                    almacen_carro+=item.cupo_carros
                    almacen_moto+=item.cupo_motos
                }
                
                // console.log(almacen_carro)
                // console.log(almacen_moto)
                const resQuery3=await ParqueaderosOcupadosComunitario(IdApto)
                const resQuery3Visitante=await ParqueaderosOcupadosVisitante(IdApto)
                console.log(resQuery3)
                let almacen_carro_restante=almacen_carro
                let almacen_moto_restante=almacen_moto
                if(resQuery3.length>0 || resQuery3Visitante.length>0){
                    
                    console.log('antes del for')
                    console.log('almacen restante carro->',almacen_carro_restante)
                    console.log('almacen restante moto->',almacen_moto_restante)
                    // console.log(resQuery3[0])
                    if(resQuery3.length>0){
                        for (let i = 0; i < resQuery3.length; i++) {
                            console.log('for')
                            const item = resQuery3[i];
                            console.log(item.id_tipo_vehiculo)
                            if(item.id_tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.id_tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    if(resQuery3Visitante.length>0){
                        for (let i = 0; i < resQuery3Visitante.length; i++) {
                            console.log('for')
                            const item = resQuery3Visitante[i];
                            console.log(item.tipo_vehiculo)
                            if(item.tipo_vehiculo===1){
                                almacen_carro_restante-=1
                            }
                            if(item.tipo_vehiculo===2){
                                almacen_moto_restante-=1
                            }
                            console.log('almacen restante carro->',almacen_carro_restante)
                            console.log('almacen restante moto->',almacen_moto_restante)
                        }
                    }
                    
                    console.log(almacen_carro)
                    console.log(almacen_carro_restante)
                    console.log(almacen_moto)
                    console.log(almacen_moto_restante)
    
                    // const resQuery4=await tipoAutoResidente(Placa)
                    // console.log(resQuery4[0])
                    let llaveLogica=false
                    if(IdTipo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(IdTipo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
                }else{
    
                    // const resQuery4=await tipoAutoResidente(Placa)
                    // console.log(resQuery4[0])
                    let llaveLogica=false
                    if(IdTipo===1){
                        if(almacen_carro_restante>0){
                            llaveLogica=true
                        }
                    }
                    if(IdTipo===2){
                        if(almacen_moto_restante>0){
                            llaveLogica=true
                        }
                    }
                    console.log(llaveLogica)
    
                    if(llaveLogica){
                        console.log('registro')
                        res.json({
                            status:1,
                            msg:'Registro permitido!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
    
    
                    }else{
                        console.log('El Apto no cuenta con puestos suficientes para el ingreso')
                        res.json({
                            status:0,
                            msg:'El Apto no cuenta con puestos suficientes para el ingreso!',
                            data:{
                                vehiculo:TIPO_VEHICULO,
                                propietario:NOMBRE_PROPIETARIO,
                                apartamento:NOMBRE_APARTAMENTO,
                                puesto_carro:almacen_carro_restante,
                                puesto_moto:almacen_moto_restante
                            }
                        })
                    }
    
    
    
                }
    
            }else{
                console.log('Este Apto no tiene puestos disponibles,revise inventario!')
                res.json({
                    status:0,
                    msg:'Este Apto no tiene puestos disponibles,revise inventario!',
                    data:{
                        vehiculo:TIPO_VEHICULO,
                        propietario:NOMBRE_PROPIETARIO,
                        apartamento:NOMBRE_APARTAMENTO
                    }
                })
            }
    
        }else{
            console.log('Numero de Placa no se encuentra asociada a ningun Apto')
            res.json({
                status:0,
                msg:'Numero de Placa no se encuentra asociada a ningun Apto'
            })
            // res.json({
            //     status:0,
            //     msg:'Sin Informacion'
            // })
        }
    }

    
    




    // res.sendFile(join(__dirname,'frontend/index.html'))
})


router.post('/Api/Operario-Entrada',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Placa,Observacion} =req.body
    console.log('OBSERVACION--->',Observacion)


    // obtenemos el tipo de vehiculo y el apartamento asociado al vehiculo,para luego buscar los parqueaderos de ese apartamento
    const resEdit=await ObtenerParqueaderos({Placa,Observacion})
    console.log(resEdit)
    res.json({
        status:resEdit.status,
        msg:resEdit.msg
    })
    // if(resEdit){
    //     res.json({
    //         status:1,
    //         msg:'Edicion exitosa!'
    //     })
    // }else{
    //     res.json({
    //         status:0,
    //         msg:'Error en Edicion'
    //     })
    // }
    
})

router.post('/Api/Operario-Entrada-Visitante',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Placa,Observacion,ID_VISITANTE,ID_APTO,TP_VEHICULO,IdAutorizacionResi,UrlFotoPerfilVisitante} =req.body
    console.log(Observacion)


    // obtenemos el tipo de vehiculo y el apartamento asociado al vehiculo,para luego buscar los parqueaderos de ese apartamento
    const resEdit=await ObtenerParqueaderosVisitante({Placa,Observacion,ID_VISITANTE,ID_APTO,TP_VEHICULO,IdAutorizacionResi})
    console.log(resEdit)
    res.json({
        status:resEdit.status,
        msg:resEdit.msg
    })
   
    
})

router.post('/Api/Operario-Entrada-Visitante-Peaton',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Cedula,Observacion,ID_APTO,IdAutorizacionResi} =req.body
    console.log(Observacion)


    
    const resEdit=await validarRegistroPeatonVisitante({cedula:Cedula})
    console.log(resEdit)
    if(resEdit.length>0){
        res.json({
            status:0,
            msg:"Posee un registro con esa cedula sin cerrar"
        })
    }else{
        const resReg=await registrarVisitantePeatonREG({Cedula,Observacion,ID_APTO,IdAutorizacionResi})
        if(resReg){
            res.json({
                status:1,
                msg:"Registro exitoso!"
            })
        }else{
            res.json({
                status:0,
                msg:"Ocurrio un error en el registro"
            })
        }
    }
    
   
    
})

router.post('/Api/Operario-Salida-Visitante-Peaton',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Cedula,Observacion,ID_APTO,IdAutorizacionResi} =req.body
    console.log(Observacion)


    
    const resEdit=await validarRegistroPeatonVisitante({cedula:Cedula})
    console.log(resEdit)
    
    if(resEdit.length>0){
        const resReg=await registrarVisitanteSALIDAPeatonREG({Cedula,Observacion,ID_APTO,IdAutorizacionResi})
        if(resReg){
            res.json({
                status:1,
                msg:"Registro exitoso!"
            })
        }else{
            res.json({
                status:0,
                msg:"Ocurrio un error en el registro"
            })
        }
    }else{
        res.json({
            status:0,
            msg:"NO Posee un registro con esa cedula"
        })
    }
    
   
    
})




router.get('/Api/Operario-Consulta',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('consulta')
    const resTP_ALMACEN=await getParqueadero_TipoALmacen()
    console.log(resTP_ALMACEN)
    const TP_ALMACEN=resTP_ALMACEN[0].id
    const resQuery=await getConsulta(TP_ALMACEN)
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})

router.get('/Api/Operario-Consulta-Visitante',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    console.log('consulta')
    const resQuery=await getConsultaVisitante()
    console.log(resQuery)
    if(resQuery.length>0){
        res.json({status:1,data:resQuery})
    }else{
        res.json({
            status:0,
            msg:'Sin Informacion'
        })
    }
    // res.sendFile(join(__dirname,'frontend/index.html'))
})


router.post('/Api/Operario-Salida-Visitante',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Placa,Observacion} =req.body
    console.log(Observacion)

    const resEdit=await RegistrarSalidaVisitante({Placa,Observacion})
    console.log(resEdit)
    res.json({
        status:resEdit.status,
        msg:resEdit.msg
    })
    
})


router.post('/Api/Operario-Salida',async(req,res)=>{
    // res.json({status:1,msg:'probando'})
    const {Placa,Observacion} =req.body
    console.log(Observacion)

    const resEdit=await RegistrarSalida({Placa,Observacion})
    console.log(resEdit)
    res.json({
        status:resEdit.status,
        msg:resEdit.msg
    })
    
})



module.exports = router;