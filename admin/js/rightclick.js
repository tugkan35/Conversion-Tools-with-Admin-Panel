document.onmousedown=disableclick;
function disableclick(event){
  if (event.button==2) {
    alert("Right-clicking is disabled on this page.");
    return false;
  }
}
