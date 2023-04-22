const express= require('express')
const app = express();
const path = require('path')
const bodyparser = require('body-parser')
const axios = require('axios')
const {MongoClient} = require('mongodb')
const nodemailer = require('nodemailer')

const url="mongodb://127.0.0.1:27017/"
app.use(express.static(path.join(__dirname ,"public") ));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.set('view engine','ejs')
const client = new MongoClient(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const weather={}
// app.get('/',(req,res)=>{
 

//  })
// request(url,(err,apiResponse) => {
//     if(err) throw err;
//     const output = JSON.parse(apiResponse.body);
//     res.render('home.ejs',{title:'Weather App',weather:output});
// })
// })

// app.get('/',(req,res)=>{
//       const city= req.query.city?req.query.city:'delhi'
//     const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b5ea0f92c5b8deb13ccec7d557ac6a4d&units=metric`
//    axios.get(url)
//    .then((response)=>{
//     const result = response.data
//     res.render('home.ejs',{weather:result})})
//     client.connect((dberr,dbData)=>{
//         if(dberr){
//             res.send({
//                 status:500,
//                 message:"db connection err"
//             })
//         }
//         else{
//             const db = dbData.db('test')
//             db.collection('news').find().toArray((err,result)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     const name={result}
//                     res.render('home.ejs',{data:name})
                
//                 }

//             })
//         }
//     })

// })


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
          const name={result}
          const city= req.query.city?req.query.city:'delhi'
          const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b5ea0f92c5b8deb13ccec7d557ac6a4d&units=metric`
         axios.get(url)
         .then((response)=>{
        const file= response.data
       
        res.render('home.ejs',{weather:file, data:name})
        })
          }

          })
      }
  })

})


app.get('/about',(req,res)=>{
    res.render('about.ejs')
})

app.get('/contact',(req,res)=>{
    res.render('contact.ejs')
})

app.post('/query',(req,res)=>{
    if(req.err){
console.log(req.err)
    }
    else{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'justina40@ethereal.email',
                pass: 'tGevn5fZDvdNk1cA7P'
            }
          
        });

        const mailOption= {
            mail:'admin@24*7.com',
            to:'justina40@ethereal.email',
            subject:'Query about company',
            text:`query:${req.body.query}`
        }

        transporter.sendMail(mailOption,(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.send('Email sent successfully')
            }
        })
      
    }
   
   
})

app.get('/sports',(req,res)=>{
    client.connect((dberr,dbres)=>{
        if(dberr){
            res.send({
                status:500,
                message:'db related err',
            })
        }
        else{
            const db = dbres.db('test')
            db.collection('sports').find().toArray((err, result)=>{
                if(err){
                    console.log(err)
                }
                else{
                   
                    res.render('sports.ejs', {result:result})
                    
                }
            })
        }
    })

})

app.listen(3000,()=>{
    console.log('in port 3000')
})