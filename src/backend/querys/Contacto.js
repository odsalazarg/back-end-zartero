const {pool} = require('../../database/config')


const getContactos=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT r.id as r_id,r.nombre as r_nombre,r.telefono as r_telefono,r.apellido as r_apellido,a.numero as a_numero,t.nombre as t_nombre FROM residentes as r INNER JOIN apartamento as a ON r.id_apartamento=a.id INNER JOIN torre as t ON a.id_torre=t.id WHERE r.status=1;')
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}  





module.exports={getContactos}