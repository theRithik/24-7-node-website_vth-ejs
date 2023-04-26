

 
function myFunction(){
    console.log(webToken)
    localStorage.setItem('secret',webToken)
    localStorage.setItem('name', name )
    localStorage.setItem('email',email)

}

function header(){
 let name=   localStorage.getItem('name')
let email=  localStorage.getItem('email')

document.getElementById('details').innerHTML=name
}

function onReset(){
    alert('reset ok ?')
}

async function edit(i){
  const title = document.getElementById(i).value
  const id = news.result[i]._id
    console.log(id)
    console.log(title)

const result = await fetch('/news/update',{method:'POST',
headers:{
    Accept:'application.json',
    'Content-Type':'application/json'
},
body: JSON.stringify({
    "i":id,
    "title":title,
   
})
})
.then((res)=>{res.json})
.catch((err)=>{console.log(err)})
alert('updated successfully')

}


//  async function addNews(){
//     const url='http://localhost:4000/api/login'
//     const result = await fetch(url)

//     if(result.status.ok){
//         alert('news added sucessfully')
//     }
// }

function remove(){
    localStorage.removeItem('name')
    localStorage.removeItem('secret')
    localStorage.removeItem('email')
}