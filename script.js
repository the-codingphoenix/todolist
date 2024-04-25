var input = document.getElementById("userInput");
var button = document.getElementById("addTask");
var ul = document.querySelector("ul");

//check input length
function inputLength() {
    return input.value.length
}

//add task to list
function createListElement () {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    input.value = "";
}

//adding task to list on button click
button.addEventListener("click", function() {
    if (inputLength() > 0) {
        createListElement();
    }
});

//adding task to list on pressing the enter key
input.addEventListener("keypress", function(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        createListElement();
    }
});

// click function for completing/ removing task
ul.addEventListener("click", function(e) {
    //checking where we clicked. If clicked on the list item, it will activate the checked class
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("done");
        saveData(); //saving all task added to memory
    //if we clicked span, the parentelement will be removed
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); //saving all task added to memory
    }
}, false);

// function to keep task in memory even when we close app or refresh
function saveData() {
    localStorage.setItem("data", ul.innerHTML);
}

//function to display saved tasks
function showTask() {
    ul.innerHTML = localStorage.getItem("data");
}

showTask(); //displaying saved tasks after refresh or reopening app