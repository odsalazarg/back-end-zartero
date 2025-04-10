const {pool} = require('../../database/config')

const createMarca=async({logo_oficial=false,logo_banner=false,logo_menu=false})=>{
    console.log('conectado BD')
    const status=1
    try {
        // const result0=await pool.query('DELETE FROM marca_blanca;')
        if(logo_oficial){
            const result1=await pool.query('UPDATE marca_blanca SET url=? WHERE nombre="LOGO_OFICIAL"', [logo_oficial])
        }
        
        if(logo_banner){
            const result2=await pool.query('UPDATE marca_blanca SET url=? WHERE nombre="LOGO_BANNER"', [logo_banner])
        }
        
        if(logo_menu){
            const result3=await pool.query('UPDATE marca_blanca SET url=? WHERE nombre="LOGO_MENU"', [logo_menu])
        }
        
        // console.log(result[0].insertId)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const getLogos=async()=>{
    console.log('conectado BD')
    const status=1
    try {
        const result=await pool.query('SELECT * FROM marca_blanca;')
        // console.log(result[0].insertId)
        return result[0]
    } catch (error) {
        console.error(error)
        return false
    }
}






module.exports={createMarca,getLogos}