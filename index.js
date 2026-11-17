import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, remove } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyCe5NvRgNVuJ1Vy1UzX7lNKerTb4xOGsuQ",
    authDomain: "leads-tracker-app-69b69.firebaseapp.com",
    databaseURL: "https://leads-tracker-app-69b69-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "leads-tracker-app-69b69",
    storageBucket: "leads-tracker-app-69b69.firebasestorage.app",
    messagingSenderId: "688898536807",
    appId: "1:688898536807:web:538e4238d3daaa08a8ebc2"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")


function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist= snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
    
})

deleteBtn.addEventListener("dblclick", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = "" 
})