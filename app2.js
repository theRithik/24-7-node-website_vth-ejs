const express= require('express')

const app = express();
const path = require('path')
const bodyparser = require('body-parser')
const axios = require('axios')
const {MongoClient} = require('mongodb')


const url="mongodb://127.0.0.1:27017/"
app.use(express.static(path.join(__dirname ,"public") ));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.set('view engine','ejs')
const client = new MongoClient(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


app.get('/',(req,res)=>{
    client.connect((dberr,dbData)=>{
        if(dberr){
            res.send({
                status:500,
                message:"db connection err"
            })
        }
        else{
            const db = dbData.db('test')
            db.collection('news').find().toArray((err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const map ={result}
                    res.render('news.ejs',{data:map})
                    console.log(map.result[0].articles[0].title)
                
                }
  
            })
        }
    })
  
  })

  app.listen(3000,()=>{
    console.log('in port 3000')
})