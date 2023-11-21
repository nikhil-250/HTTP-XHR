const cl = console.log;
const card = document.getElementById(`card`)

let BaseUrl = `https://jsonplaceholder.typicode.com/`

let post = `${BaseUrl}/posts`

//config
let xhr = new XMLHttpRequest()
xhr.open(`GET`, post)

xhr.send()

xhr.onload = function () {
    // cl(xhr.response)
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.response)
        cl(data)
        tempalting(data)
    } else {
        `Something went wrong`
    }
}
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