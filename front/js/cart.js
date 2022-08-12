/**
 * 
 * 
 * 
 */
async function  init(){

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage);

    console.log(JSON.stringify(arrayStorage));

    if(localStorage.length == 0 || JSON.stringify(arrayStorage) == "[]"){

    alert("Votre panier est vide");
    location.replace("./index.html");

    } else {

        for (let object in arrayStorage){

            let id = arrayStorage[object].id;

            let promise = await fetch("http://localhost:3000/api/products/"+ id);

            let infos = await promise.json();

            createItems(infos, arrayStorage[object]);

            calculQt();

            let submit =  document.getElementById('order')
 
            submit.addEventListener("click", (event) => {
                submitOrder(event);
            });

        };

    };

};

/**
 * 
 * 
 * 
 */
function createItems(infos,  product){

    let article = document.createElement("article");
    article.setAttribute('class',"cart__item");
    article.setAttribute('date-id', product.id);
    article.setAttribute('data-color', product.couleur);

    let divItemImg = document.createElement("div");
    divItemImg.setAttribute('class',"cart__item__img");

    let img = document.createElement("img");
    img.setAttribute('src', infos.imageUrl);
    img.setAttribute('alt', infos.altTxt);

    let divItemContent = document.createElement("div");
    divItemContent.setAttribute('class',"cart__item__content");

    let divItemContentDescription = document.createElement("div");
    divItemContentDescription.setAttribute('class',"cart__item__content__description");


    let h2 = document.createElement("h2");
    h2.textContent = infos.name;

    let paraColor = document.createElement("p");
    paraColor.textContent = product.couleur;

    let paraPrice = document.createElement("p");
    paraPrice.textContent = infos.price + "€";

    let divItemContentSetting = document.createElement("div");
    divItemContentSetting.setAttribute('class', "cart__item__content__settings");

    let divItemContentSettingQt = document.createElement("div");

    divItemContentSettingQt.setAttribute('class',"cart__item__content__settings_quantity");

    let paraQt = document.createElement("p");
    paraQt.textContent = "Qté : " + product.quantite;

    let inputQt = document.createElement("input");
    inputQt.setAttribute('type',"number");
    inputQt.setAttribute('class',"itemQuantity");
    inputQt.setAttribute('name',"itemQuantity");
    inputQt.setAttribute('min', 1);
    inputQt.setAttribute('max',100);
    inputQt.setAttribute('value', product.quantite);
    inputQt.priceProd = infos.price;
    inputQt.idProd = product.id;
    inputQt.colorProd = product.couleur;
    inputQt.addEventListener("change", (event) => {
        qtChange(event);
    });

    let divItemContentSettingDel = document.createElement("div");
    divItemContentSettingDel.setAttribute('class',"cart__item__content__settings_delete");

    let paraDel = document.createElement("p");
    paraDel.setAttribute('class',"deleteItem");
    paraDel.textContent = "Supprimer";
    paraDel.idProd = product.id;
    paraDel.colorProd = product.couleur;
    paraDel.addEventListener("click", (event) => {
        delCommand(event);
    });

    let objtCreateItems = {

        article : article,
        divItemImg : divItemImg,
        divItemContent : divItemContent,
        divItemContentSetting: divItemContentSetting,
        img: img,
        divItemContentDescription: divItemContentDescription,
        h2 : h2,
        paraColor : paraColor,
        paraPrice : paraPrice,
        paraQt : paraQt,
        inputQt : inputQt,
        paraDel : paraDel,
        divItemContentSettingDel: divItemContentSettingDel,
        divItemContentSettingQt : divItemContentSettingQt

    }

    ajoutItems(objtCreateItems);

}

/**
 * 
 * 
 * 
 */
function ajoutItems(objtCreateItems){

    let sectionCartItems = document.getElementById("cart__items");

    sectionCartItems.append(objtCreateItems.article);
        objtCreateItems.article.append(objtCreateItems.divItemImg, objtCreateItems.divItemContent, objtCreateItems.divItemContentSetting);
        objtCreateItems.divItemImg.append(objtCreateItems.img);
        objtCreateItems.divItemContent.append(objtCreateItems.divItemContentDescription);
        objtCreateItems.divItemContentDescription.append(objtCreateItems.h2, objtCreateItems.paraColor, objtCreateItems.paraPrice);
        objtCreateItems.divItemContentSetting.append(objtCreateItems.divItemContentSettingQt, objtCreateItems.divItemContentSettingDel);
        objtCreateItems.divItemContentSettingQt.append(objtCreateItems.paraQt, objtCreateItems.inputQt);
        objtCreateItems.divItemContentSettingDel.append(objtCreateItems.paraDel);

}

/**
 * 
 * 
 * 
 */
function delCommand(event) {

    let element = event.target;

    let idProd = element.idProd;
    let colorProd = element.colorProd;

    let arrayStorage = localStorage.getItem("ArrayStorage");

    arrayStorage = JSON.parse(arrayStorage);

    for (let object of arrayStorage){

        if (object.id == idProd && object.couleur == colorProd){

            let numberObject = arrayStorage.indexOf(object);

            arrayStorage.splice(numberObject,1);

            localStorage.ArrayStorage = JSON.stringify(arrayStorage);

            let article = element.closest("article");

            article.remove();

            calculQt();

        }
 
    }

    if(JSON.stringify(arrayStorage) == "[]"){

        alert("Votre panier est vide");
        location.replace("./index.html");

    }

}

/**
 * 
 * 
 * 
 */
function calculQt(){

    let elements = document.getElementsByClassName("itemQuantity");
    let totalPrice = 0;
    let totalQt = 0;

    for (let element of elements){

        totalQt += Number(element.value);
        totalPrice += Number(element.value) * Number(element.priceProd);

    }

    document.getElementById("totalQuantity").textContent = totalQt;
    document.getElementById("totalPrice").textContent= totalPrice;

}

/**
 * 
 * 
 * 
 */
function qtChange (event) {

    let inputQt = event.target;
    let divParaQt = inputQt.closest("div");
    let paraQt = divParaQt.querySelector("p");

    let newQT = inputQt.value;

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage);

    if (newQT <= 0){

        alert("La valeur doit être au dessus de 0 ou être supprimer via le bouton supprimer");

    } else {

        for (let element of arrayStorage)  {

            if(inputQt.idProd == element.id && inputQt.colorProd == element.couleur){

                element.quantite = newQT;

                let numberElement = arrayStorage.indexOf(element);

                arrayStorage[numberElement] = element;

                localStorage.ArrayStorage = JSON.stringify(arrayStorage);

            }
        } 

    paraQt.textContent = "Qté : " + newQT;

    calculQt();

    }
}

function recupOrder(){

    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    let objRecupOrder = {

        firstName : firstName,
        lastName : lastName,
        address : address,
        city : city,
        email : email,

    }

    return objRecupOrder;

}

async function submitOrder(event){

    let firstName = verifFirstName();
    let lastName = verifLastName();
    let address = verifAdress();
    let city = verifCity();
    let email = verifEmail();

    if(firstName == "Erreur" || lastName == "Erreur" || address == "Erreur" || city == "Erreur" || email == "Erreur"){

    alert("Veuillez corriger votre formulaire");

    } else {

        let contact = {

        firstName : firstName,
        lastName : lastName,
        address : address,
        city : city,
        email : email

        }

        let arrayStorage = localStorage.getItem('ArrayStorage');
        arrayStorage = JSON.parse(arrayStorage);
        let products = new Array();

        for (let object of arrayStorage){

        let id = object.id;
        products.push(id);

        }

        let envoyerCommande = {

            contact: contact,
            products: products

        }

        let response = await fetch('http://localhost:3000/api/products/order', {

            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },

            body: JSON.stringify(envoyerCommande)

          });


          let jsonResponse = await response.json();

          let idResponse = jsonResponse.orderId

          location.replace("./confirmation.html?id="+idResponse)

          console.log(jsonResponse, idResponse, envoyerCommande)
    }
}

function verifFirstName(){

    let objrecupOrder = recupOrder();

    let regex = /[a-zA-Z]+/g;

    if(regex.test(objrecupOrder.firstName.value)){

        return objrecupOrder.firstName.value

    } else {

        let paraFail = document.getElementById("firstNameErrorMsg");
        paraFail.textContent = "Le First Name n'est pas valide";

        return "Erreur";

    }
}

function verifLastName(){

    let objrecupOrder = recupOrder();
    let regex = /[a-zA-Z]+/g;

    if(regex.test(objrecupOrder.lastName.value)){

        return objrecupOrder.lastName.value;

    } else {

        let paraFail = document.getElementById("lastNameErrorMsg");
        paraFail.textContent = "Le Last Name n'est pas valide";

        return "Erreur";

    }
}

function verifAdress(){

    let objrecupOrder = recupOrder();
    let regex = /[A-Za-z0-9'\.\-\s\,]/;

    if(regex.test(objrecupOrder.address.value)){

        return objrecupOrder.address.value;

    } else {

        let paraFail = document.getElementById("addressErrorMsg");
        paraFail.textContent = "L'adresse n'est pas valide";

        return "Erreur";

    }
}

function verifCity(){

    let objrecupOrder = recupOrder();
    let regex = /[a-zA-Z]+/g;

    if(regex.test(objrecupOrder.city.value)){

    return objrecupOrder.city.value

    } else {

        let paraFail = document.getElementById("cityErrorMsg");
        paraFail.textContent = "La ville n'est pas valide";

        return "Erreur";

    }
}

function verifEmail(){

    let objrecupOrder = recupOrder();
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(regex.test(objrecupOrder.email.value)){

        return objrecupOrder.email.value;

    } else {

        let paraFail = document.getElementById("emailErrorMsg");
        paraFail.textContent = "Le Email n'est pas valide";

        return "Erreur";
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    init();
});