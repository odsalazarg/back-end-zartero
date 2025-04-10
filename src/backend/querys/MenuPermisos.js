const {pool} = require('../../database/config')


const getPermisosMenu=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT ')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}









module.exports={getVehiculos,createVehiculo,getVehiculoById,editVehiculo,deleteVehiculo}