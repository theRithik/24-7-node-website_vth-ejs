


 
function myFunction(){
    localStorage.setItem('secret',webToken)
    localStorage.setItem('name', name )
    localStorage.setItem('email',email)

}

async function frontPage(){
    const username = localStorage.getItem('name')
    const emailId = localStorage.getItem('email')
    const token = localStorage.getItem('secret')

 const result = await fetch('/admin/addNews',
    {method:'POST',
    headers:{
        Accept:'application.json',
        'Content-Type':'application/json'
    },
    body:{
        'userName':username,
        'emailId':emailId,
        'token':token
    }
    .then((res)=>{res.json()})
    .catch((err)=>{console.log(err)})


})

}

function header(){
 let name= localStorage.getItem('name')
let email=  localStorage.getItem('email')

document.getElementById('name').innerHTML=name
document.getElementById('email').innerText=email
document.getElementById('nameID').innerText="username:"
document.getElementById('emailID').innerText="email:"
}

function onReset(){
    alert('reset ok ?')
}

async function edit(i){
  const title = document.getElementById(i).value
  const id = news.result[i]._id
    console.log(id)
    console.log(title)
    const token = localStorage.getItem('secret')

const result = await fetch('/news/update',{method:'POST',
headers:{
    Accept:'application.json',
    'Content-Type':'application/json'
},

body: JSON.stringify({
    "i":id,
    "title":title,
    "token":token
   
})
})
.then((res)=>{res.json})
.catch((err)=>{console.log(err)})
alert('updated successfully')

}


function remove(){
    localStorage.removeItem('name')
    localStorage.removeItem('secret')
    localStorage.removeItem('email')
}
