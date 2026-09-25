// CLICK ON THE LIST TO CHECK IT
document.getElementById("myUL").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
});

// Click CLOSE (×)
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("item-close")) {
        e.stopPropagation();
        e.target.parentElement.remove();
    }
});

// ADDING A NEW RECORD
document.getElementById("addBtn").addEventListener("click", newElement);

document.getElementById("myInput").addEventListener("keypress", function(e){
    if (e.key === "Enter") newElement();
});

function newElement() {
    let input = document.getElementById("myInput");
    let value = input.value.trim();

    if (value === "") {
        alert("You must write something!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = value;

    let btn = document.createElement("button");
    btn.className = "item-close";
    btn.innerHTML = "&times;";
    li.appendChild(btn);

    document.getElementById("myUL").appendChild(li);

    input.value = "";
}