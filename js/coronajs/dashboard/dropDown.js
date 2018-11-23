/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
 function userLogout() {
    document.getElementById("userDetails").classList.toggle("toggle");
    //document.getElementById("userDropdownId").classList.remove("toggle"); 
    document.getElementById("dashDropdownId").classList.remove("toggle");  
}

function dashDropdown() {
 document.getElementById("dashDropdownId").classList.toggle("toggle");
 //document.getElementById("userDropdownId").classList.remove("toggle"); 
 document.getElementById("userDetails").classList.remove("toggle");
} 
 function userDropdown() {
    document.getElementById("userDropdownId").classList.toggle("toggle");
    document.getElementById("dashDropdownId").classList.remove("toggle");  
    document.getElementById("userDetails").classList.remove("toggle");
}