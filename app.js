const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();

app.use(express.urlencoded({extended:false}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/recommend',(req,res)=>{
    res.render('recommed')
})
app.post('/recommend',(req,res)=>{
    const resturant=req.body;
    const filepath=path.join(__dirname,"data","database.json")
    const filedata=fs.readFileSync(filepath)
    const data=JSON.parse(filedata)
    data.push(resturant)
    fs.writeFileSync(filepath,JSON.stringify(data))
    res.render('confrom')
})
app.get('/Restaruant',(req,res)=>{
    const datapath=path.join(__dirname,'data','database.json')
    const data=fs.readFileSync(datapath)
    const exitsinguserdata=JSON.parse(data)
    res.render('Restaruant',{numberofrestaruant:exitsinguserdata.length,restaruants:exitsinguserdata})
})
app.listen(3000)