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
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Added!!!",
                showConfirmButton: false,
              });
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
    localStorage.setItem(`get`, getID)
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
const onUpdate = ele => {
    let newOj = {
        title: titleControl.value,
        body: bodyControl.value,
        userID: UserIdControl.value,
    }
    cl(newOj)
    let getID = localStorage.getItem(`get`)
    let updatedUrl = `${post}/${getID}`
    let xhr = new XMLHttpRequest()
    xhr.open(`PATCH`, updatedUrl, true)
    xhr.send(JSON.stringify(newOj))
    xhr.onload = function () {
        if (xhr.status === 200) {
            let getIndex2 = postArray.findIndex(ele => {
                return ele.id == getID

            })
            postArray[getIndex2].title = newOj.title,
                postArray[getIndex2].body = newOj.body,
                postArray[getIndex2].userID = newOj.userID
                update.classList.add(`d-none`)
                submit.classList.remove(`d-none`)
            tempalting(postArray);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Updated!!!",
                showConfirmButton: false,
              });
        }


    }
    formControl.reset()
}
const OnDelete = ele => {
    let getDeleteID = ele.closest(`.card`).id
    let DeleteUrl = `${post}/${getDeleteID}`
    let xhr = new XMLHttpRequest()
    xhr.open(`DELETE`, DeleteUrl, true)
    xhr.send()
    xhr.onload = function () {
        if (xhr.status === 200) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                        timer: 1500
                    });
                    document.getElementById(getDeleteID).remove();
                }
            });
            
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
            <button class="btn btn-danger" onClick="OnDelete(this)"> delete</button>
        </div>
    </div>`

    });
    card.innerHTML = result;
})
formControl.addEventListener(`submit`, onSubmit)
update.addEventListener(`click`, onUpdate)




//HTTP HTML Request => 1>instance 2>OPen 3>Send 4>Onload >> Before ES-6