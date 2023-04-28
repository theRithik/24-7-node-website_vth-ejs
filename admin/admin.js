const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path= require('path')
const users = require('./model/users')
const db = require('./db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_secret = "hcshW9FHIUBWSDVHRHV@#$%^&UYT$%^QVKBNiuowelhnv99pqojcnjbvhsfbvuoivnfn523jne"
const news =require('./model/news')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs')


 
app.get('/',(req,res)=>{
    res.render('index',{error: req.query.valid?req.query.valid:'',
    msg: req.query.msg?req.query.msg:''})

})

app.post('/api/register', async (req,res)=>{
   
    const hashedPassword = await bcrypt.hash(req.body.password,10)
users.create({
    name:req.body.name,
    email:req.body.email,
   password:hashedPassword,
},(err,result)=>{
    if(err) {       
        res.send({error:err.message})
    } 
else{
    const string = encodeURIComponent('Success Fully Register Please Login');
      res.redirect('/?msg=' + string);
}
})   
})

app.post('/api/login',(req,res)=>{
users.findOne({email:req.body.email},(err,result)=>{
    if(err) return res.json({status:'ok',message:err.message})
    const string = encodeURIComponent('! Please enter valid email');
    if (!result) { res.redirect('/?valid=' + string);}
    else{
      const passwordIsValid = bcrypt.compareSync(req.body.password, result.password)
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null})
        else{
         const webtoken = jwt.sign(
                {
                    id: result._id,
                    email:result.email,
                },jwt_secret)
                  
            res.render('home.ejs',{name:result.name, email:result.email, data:webtoken, data1:req.query.msg2?req.query.msg2:'', data2:req.query.msg3?req.query.msg3:''})
       
            }
    }
})
   
app.get('/admin/addNews',(req,res)=>{
    const{username, emailId,webtoken} = req.body
    console.log(username,emailId)
   res.render('addNews.ejs',{name:username, email:emailId,data:webtoken}) 
})


})

app.post('/admin/postNews',(req,res)=>{
    news.insertMany(req.body,(err,result)=>{
        if(err){
           res.json({status:'ok',message:err.message})
        }
        if(!result){
            const string = encodeURIComponent('please enter the details correctly')
            res.redirect('/api/login?msg2' +string)
        }
        else{
            const string = encodeURIComponent('news added successfully')
           
            res.json({status:'ok', message:'added succesfully'})
        }
    })
})

app.get('/news/getNews',(req,res)=>{
    news.find((err,result)=>{
if(err){
    res.json({status:'500',message:err.message})
}
else{
    const data={result}
    // console.log(data.result[1])
//   res.send(data.result[0].articles[0].title)
       res.render('editNews.ejs',{news:data})
}
    })
})

app.post('/news/update',(req,res)=>{
    const {title, i} = req.body
    console.log(i)
//   const id = parseInt(id)
 
    console.log(title)
    console.log(i)
    
    news.findOneAndUpdate({_id:i },{$set:{"title": title}},(err,result)=>{
        if(err){
            console.log(err.message)

        }
        else{
            res.send('updated successfully')
        }
    })
// news.findOne({_id:1},(err,result)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(result)
//     }
// })

})
  




// app.post('/login',(req,res)=>{
// client.connect((dberr,dbres)=>{
//     if(dberr){
//         res.send({
//             status:500,
//             message:'db errr'
//         })
//     }
//         else{
//             const db= dbres.db('test')
//             db.collection('users2').find({email:req.body.email,password:req.body.password}).toArray((err,result)=>{
//                 if(err){
//                     console.log('no use found')
//                 }
        //         else{
        //             for(i=0; i<data[0].length;i++){
            
        //        if(data[0][i].email!=req.body.email && data[0][i].password===req.body.password){
        //         res.send('no user found')
        //        }
        //        else if(data[0][i].email===req.body.email && data[0][i].password!=req.body.password){
        //         res.send('wrong password')
        //        }
        //        else if(data[0][i].email!=req.body.email && data[0][i].password!=req.body.password){
        //         res.send('no user found')
        //        }
        //        else{
        //         res.render('home.ejs',{username:result.name,email:req.body.email})
//         //    }
// else{
//     res.render('home.ejs')

// }
               
                // }
            // }
//             })
        
//         }
    
// })
//  })

// app.post('/details',(req,res)=>{
//    client.connect((dber,dbre)=>{
//     if(dber){
//         console.log(dber)
//     }
//     else{
//         const db=dbre.db('test')
//         db.collection('users2').insert(req.body,(err,result)=>{
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 res.render('home.ejs',{username:req.body.name, email:req.body.email})
//             }
//         })
//     }
//    })
// })

// app.post('/addNews',(req,res)=>{
//     client.connect((dberr,dbress)=>{
//         if(dberr){
//             res.send(dberr)
//         }
//         else{
//             const db = dbress.db('test')
//              db.collection('news').insert(req.body,(err,result)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     res.render('home.ejs',{})

//                 }
//              })
//         }
//     })
// })

// app.put('/update',(req,res)=>{
//     client.connect((dberr,dbress)=>{
//         if(dberr){
//             res.send(dberr)
//         }
//         else{
//             const db= dbress.db('test')
//             db.collection('news').updateOne()
//         }
//     })
// })

// app.post('/data',(req,res)=>{
//     client.connect((dber,dbre)=>{
//      if(dber){
//          console.log(dber)
//      }
//      else{
//          const db=dbre.db('test')
//          db.collection('users').find().toArray((err,result)=>{
//              if(err){
//                  console.log(err)
//              }
//              else{
//                  res.send(result)
//              }
//          })
//      }
//     })
//  })

app.listen(4000,()=>{
    console.log('4000')
})