/**
 * 
 * 
 * 
 */
function init(){

id = recupId()

let orderId = document.getElementById("orderId");

orderId.textContent = id;

delete id;

}

function recupId(){

    let href = window.location.href;
    let  url = new URL(href);
    let id = url.searchParams.get("id");

    return id
}



window.addEventListener("DOMContentLoaded", (event) => {
    init();
});