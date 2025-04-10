const {pool} = require('../../database/config')



const getPedidos=async()=>{
    let queryText='SELECT *,p.id as p_id,u.nombre as u_nombre,u.apellido as u_apellido,t.nombre as t_nombre,a.numero as a_numero,r.nombre as r_nombre,r.apellido as r_apellido FROM pedidos as p INNER JOIN users as u ON p.id_user=u.id INNER JOIN torre as t ON p.id_torre=t.id INNER JOIN apartamento as a ON p.id_apartamento=a.id INNER JOIN residentes as r ON p.id_residente=r.id WHERE 1 AND p.entregado=0;'
    let add=''
    
    queryText+=add
    console.log('conectado BD')
    try {
        const result=await pool.query(queryText)
        console.log(result)
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const editPedidos=async({Id,fecha_entrega})=>{
    console.log('conectado BD')
    const tipo=1
    try {
        const result=await pool.query('UPDATE pedidos SET entregado = 1,fecha_entrega = ? WHERE id = ?', [fecha_entrega,Id])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const obtenerCorreoResidente=async(id)=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('SELECT * FROM pedidos WHERE id=?', [id])
        console.log(result)
        const result2=await pool.query('SELECT * FROM residentes WHERE id_apartamento=?', [result[0][0].id_apartamento])
        return result2[0]
    } catch (error) {
        console.error(error)
        return []
    }
}


const createPedidos=async({IdUser,emisor,IdTorreSelect,IdAptoSelect,IdResidenteSelect,observacion,fecha_llegada})=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('INSERT INTO pedidos (id_user,emisor,id_torre,id_apartamento,id_residente,observacion,fecha_llegada,entregado) VALUES (?, ?, ?,?, ?, ?,?, ?)', [IdUser,emisor,IdTorreSelect,IdAptoSelect,IdResidenteSelect,observacion,fecha_llegada,0])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}







module.exports={createPedidos,getPedidos,editPedidos,obtenerCorreoResidente}