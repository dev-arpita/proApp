import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://prodb-a82d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const postListInDB = ref(database, "posts")

const postListEl = document.getElementById("post-list")
const inputEl = document.getElementById("input-area")
const actionBtn = document.getElementById("btn")

actionBtn.addEventListener("click", function(){
    const inputValue = inputEl.value
    push(postListInDB, inputValue)
    clearInputEL()
})

onValue(postListInDB, function(snapshot){
    const postArray = Object.entries(snapshot.val())
    console.log(postArray)
    clearInputEL()
    for(let i = 0; i < postArray.length; i++){
        let currentPost = postArray[i]
        let postId = postArray[0]
        let postMsg = postArray[1]
        renderPost(currentPost)
    }
})

function clearInputEL(){
    postListEl.innerHTML = ""
}

function renderPost(inputVal){
    let inputValId = inputVal[0]
    let inputValName = inputVal[1]
    const postEl = document.createElement("li")
    postEl.innerHTML = `<p>${inputValName}</p>`
    postListEl.append(postEl)
}
