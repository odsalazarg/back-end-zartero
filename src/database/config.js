const {createPool} = require('mysql2/promise')

// const pool=createPool({
//     host:'74.208.14.120',
//     port:3306,
//     database:'zartero',
//     user:'crompel',
//     password:'m4$t3r0223',
//     connectTimeout:30000
// })

const pool=createPool({
    host:'localhost',
    port:3306,
    database:'zartero_crompelsolution',
    user:'root',
    password:'Leycas2013#',
    connectTimeout:30000
})


// const pool=createPool({
//     host:'localhost',
//     port:3306,
//     database:'zartero_crompelsolution',
//     user:'root',
//     password:'m4$t3r',
//     connectTimeout:30000
// })


// const pool=createPool({
//     host:'localhost',
//     port:3306,
//     database:'zartero',
//     user:'root',
//     password:'',
//     connectTimeout:30000
// })

// const getConnection=async()=>{
//     return await connection
// }

module.exports={pool}