const cl = console.log;
const card = document.getElementById(`card`)
const formControl = document.getElementById(`postform`)
const titleControl = document.getElementById(`title`)
const bodyControl = document.getElementById(`body`)
const UserIdControl = document.getElementById(`userid`)

let BaseUrl = `https://jsonplaceholder.typicode.com/`

let post = `${BaseUrl}/posts`

let postArray =[];



const onHandler = eve =>{
    eve.preventDefault()
    let Newobj = {
        title: titleControl.value ,
        body: bodyControl.value ,
        userID : UserIdControl.value
    }
    cl(Newobj)
    let xhr = new XMLHttpRequest()

    xhr.open(`POST`,post)
    xhr.send(JSON.stringify(Newobj));
    xhr.onload=function(){
        if(xhr.status===200 || xhr.status ===201){
            Newobj.id = JSON.parse(xhr.response).id
            postArray.push(Newobj)
            tempalting(postArray)
        }
    }
    formControl.reset()
}



const GetHandler = eve =>{
    let xhr = new XMLHttpRequest()
xhr.open(`GET`, post)

xhr.send()

xhr.onload = function () {
    // cl(xhr.response)
    if (xhr.status === 200) {
        postArray = JSON.parse(xhr.response)
        cl(postArray)
        tempalting(postArray)
    } else {
        `Something went wrong`
    }
}
}
GetHandler()


let tempalting = (arr => {
    let result = ``;
    arr.forEach(ele => {
        result += `  <div class="card mb-4" id= "CARD">
        <div class="card-header">
            <h3>
                ${ele.title}
            </h3>
        </div>
        <div class="card-body">
            <p>
               ${ele.body}
        </div>
        <div class="card-footer d-flex justify-content-between ">
            <button class="btn btn-success"> edit</button>
            <button class="btn btn-danger"> delete</button>
        </div>
    </div>`

    });
    card.innerHTML = result;
})
formControl.addEventListener(`submit`,onHandler)