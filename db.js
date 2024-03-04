const mysql=require('mysql')
const dotenv=require('dotenv')
dotenv.config()

const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
})

connection.connect((error)=>{
    if(error)
    {
        console.log(error.message)
    }
    else{
        console.log('connected!!!')
    }
})

module.exports=connection