document.getElementById("menuToggle").addEventListener("click", function () {
    var sidebar = document.getElementById("sidebarMenu");
    var content = document.querySelector(".content");

    sidebar.classList.toggle("closed");
    content.classList.toggle("full");
});