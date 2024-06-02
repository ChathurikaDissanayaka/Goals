import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-8eb31-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const goalListInDB = ref(database, "goalList")

let inputFieldEl = document.getElementById("input-field")
let addButton = document.getElementById("add-button")
let goalListEl = document.getElementById("goal-list")

addButton.addEventListener("click", function(){
    let inputValue = inputFieldEl.value
    if(inputValue != ""){
        push(goalListInDB, inputValue)
        clearInput()
    } 
})

onValue(goalListInDB, function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearGoalListEl()

        for(let i = 0; i < itemsArray.length; i++){
            let currentItem = itemsArray[i]
            appendItemToGoalListEl(currentItem)
        }
    } else{
        goalListEl.innerHTML = "No items here... yet"
    }
    
})

function clearInput(){
    inputFieldEl.value= ""
}

function clearGoalListEl(){
    goalListEl.innerHTML= ""
}

function appendItemToGoalListEl(item){
    if(item != ""){
        let itemKey = item[0]
        let itemValue = item[1]

        let newEl = document.createElement("li")
        newEl.textContent = itemValue

        newEl.addEventListener("dblclick", function(){
            let exactLocationOfStoryInDB = ref(database, `goalList/${itemKey}`)
        
        remove(exactLocationOfStoryInDB)
        })

        goalListEl.append(newEl)
    }
}