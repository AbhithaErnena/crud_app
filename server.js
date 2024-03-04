const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const connection=require('./db')
const body_parser=require('body-parser')

app.use(body_parser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.set('view engine','ejs')
app.engine('ejs',require('ejs').__express);

app.get('/',(req,res)=>{
    res.redirect('create.html')
})


app.post('/insertdata',(req,res)=>{
    try{
        const id=req.body.student_id;
        const sname=req.body.name;
        const branch=req.body.branch;
        const sqlcommand='insert into student_data values (?,?,?);';
        connection.query(sqlcommand,[id,sname,branch],(error,result)=>{
        if(error)
        {
            console.log(error.message)
        }
        else
        {
            // res.send(result)
            res.redirect('/data')
        }
    })
    }catch(error)
    {
        console.log(error)
    }
    

})

app.get('/data',(req,res)=>{
    const sqlcommand='select * from student_data;'
    connection.query(sqlcommand,(error,result)=>{
        if(error)
        {
            res.send(error.message)
        }
        else
        {
            res.render('read.ejs',{result})
        }
    })
})

app.get('/deletedata',(req,res)=>{
    console.log(req.query.student_id)
    const sqlcommand='delete from student_data where student_id=?'
    connection.query(sqlcommand,[req.query.student_id],(error,result)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log(result)
            res.redirect('/data')
        }
    })
})

//get data by name
app.get('/search-data',(req,res)=>{
    console.log(req.query.search);
    sname=req.query.search;
    const sqlcommand='select * from student_data where name=?';
    connection.query(sqlcommand,[sname],(error,result)=>{
        if(error)
        {
            res.send(error)
        }
        else
        {
            console.log(result)
            res.render('search.ejs',{result})
        }
    })
})

app.get('/update-data',(req,res)=>{
    console.log(req.query.id)
    id=req.query.id
    console.log(typeof(id))
    const sqlcommand='select * from student_data where student_id=?'
    connection.query(sqlcommand,[id],(error,result)=>{
        if(error)
        {
            res.send(error.message)
        }
        else
        {
            result=JSON.parse(JSON.stringify(result[0]))
            console.log(result)
            res.render('edit.ejs',{result})
        }
    })
})

app.post('/final-update',(req,res)=>{
    const id=req.body.student_id;
    const name=req.body.name;
    const branch=req.body.branch;
    const sqlcommand='update student_data set name=?,branch=? where student_id=?'
    connection.query(sqlcommand,[name,branch,id],(error,result)=>{
        if(error)
        {
            res.send(error)
        }
        else
        {
            res.redirect('/data')
        }
    })
})

const port=process.env.PORT||8080
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})