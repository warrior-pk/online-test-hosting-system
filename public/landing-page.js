function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "270px";
    document.getElementById("navbar-open-btn").style.display = "none";
    // document.getElementById("main-content-wrapper").style.filter = "blur(2px)";
    // document.getElementById("main-content-wrapper").style.zIndex = "-10";
}

function closeNav() {
    document.getElementById("navbar-open-btn").style.display = "";
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}