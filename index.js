import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://prodb-a82d1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const postListInDB = ref(database, "posts")

const postListEl = document.getElementById("post-list")
const postEl = document.createElement("li")
const inputEl = document.getElementById("input-area")
const actionBtn = document.getElementById("btn")

actionBtn.addEventListener("click", function(){
    clearInputEL()
    const inputValue = inputEl.value
    push(postListInDB, inputValue)
    renderPost(inputValue)
})

function clearInputEL(){
     postEl.innerHTML = ""
}

function renderPost(inputVal){
    postEl.innerHTML = `<p>${inputVal}</p>`
    postListEl.append(postEl)
}

onValue(postListInDB, function(snapshot){
    const postArray = Object.entries(snapshot.val())
    console.log(postArray)
})