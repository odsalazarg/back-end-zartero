const {pool} = require('../../database/config')

const getMarcasUnidad=async()=>{
    console.log('conectado BD')
    try {
        const result=await pool.query('SELECT * FROM marca_unidad')
        // console.log(result[0][0])cl
        return result[0]
    } catch (error) {
        console.error(error)
    }
}

const createMarcaUnidad=async({nombre,imagen})=>{
    console.log('conectado BD')
    // const tipo='prueba.jpg'
    const status=1
    try {
        const result=await pool.query('UPDATE marca_unidad SET nombre=?, img=?', [nombre,imagen])
        console.log(result)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}







module.exports={getMarcasUnidad,createMarcaUnidad}