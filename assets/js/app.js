const cl = console.log;
const card = document.getElementById(`card`)
const formControl = document.getElementById(`postform`)
const titleControl = document.getElementById(`title`)
const bodyControl = document.getElementById(`body`)
const UserIdControl = document.getElementById(`userid`)
const submit = document.getElementById(`submit`)
const update = document.getElementById(`update`)

let BaseUrl = `https://jsonplaceholder.typicode.com/`

let post = `${BaseUrl}/posts`

let postArray = [];



const onSubmit = eve => {
    eve.preventDefault()
    let Newobj = {
        title: titleControl.value,
        body: bodyControl.value,
        userID: UserIdControl.value
    }
    cl(Newobj)
    formControl.reset()
    CreateHandler(Newobj)
}

const CreateHandler = eve => {
    let xhr = new XMLHttpRequest()
    xhr.open(`POST`, post)
    xhr.send(JSON.stringify(eve));
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            eve.id = JSON.parse(xhr.response).id
            postArray.push(eve)
            tempalting(postArray)
        }
    }
}

const GetHandler = eve => {
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
const OnEdit = ele => {
    let getID = ele.closest('.card').id
    let getUrl = `${post}/${getID}`
    let xhr = new XMLHttpRequest()
    xhr.open(`GET`, getUrl, true)
    xhr.send()
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            let obj = JSON.parse(xhr.response)
            cl(obj)
            titleControl.value = obj.title
            bodyControl.value = obj.body
            UserIdControl.value = obj.userId
            submit.classList.add(`d-none`)
            update.classList.remove(`d-none`)
        }
    }
}

let tempalting = (arr => {
    let result = ``;
    arr.forEach(ele => {
        result += `  <div class="card mb-4" id= "${ele.id}">
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
            <button class="btn btn-success" onClick="OnEdit(this)" > edit</button>
            <button class="btn btn-danger"> delete</button>
        </div>
    </div>`

    });
    card.innerHTML = result;
})
formControl.addEventListener(`submit`, onSubmit)




//HTTP HTML Request => 1>instance 2>OPen 3>Send 4>Onload >> Before ES-6