/**
 * 
 * 
 * Le but de cette fonction est d'initialiser le scripte de la page suite a la fin du chargement de celle-ci
 */
async function  init(){

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage);

    console.log(JSON.stringify(arrayStorage));

    let submit =  document.forms[0]
 
    submit.addEventListener("submit", (e) => {
        e.preventDefault();
        submitOrder();
        return false;
    });

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



        };

    };

};

/**
 * Argument: infos (object), product (object)
 * 
 * Le but de cette fonction est de creer les items afin de les envoyer à ajoutItems.
 */
function createItems(infos,  product){

    console.log(typeof product, typeof infos)

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
 * Argument: objtCreateItems (object)
 * 
 * Le but de cette fonction est d'ajouter les objt de la fonction CreateItems dans le document html
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
 * Argument: event (object)
 * 
 * Le but de cette fonction est de supprimer l'objet selectionner lors du clique de l'evenement, et de lancer la fonction calculQt.
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
 * Le but de cette fonction est de calculer la valeur quantité et de l'afficher.
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
 * Argument : event (object)
 * 
 * le but de cette fonction est que si la valeur quantité change, il modifie cette valeur et recalcul le total
 */
function qtChange (event) {

    console.log(typeof event,)

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

/**
 * 
 *  Renvoie l'objet contact si error = false sinon renvoie false
 *  Le but de cette fonction est de renvoyer si les valeurs sont bonnes suite au passage test de regex, l'objet avec les valeurs validé sinon renvoie false
 */
function recupOrder(){

    let error = false;

    let firstName = document.getElementById('firstName');
    if (verifName(firstName, firstName.value) === false){

        error = true;

    }

     let lastName = document.getElementById('lastName');

     if (verifName(lastName, lastName.value) === false){

        error = true;

    }

    let address = document.getElementById('address');
    if (verifAdress(address, address.value) === false){

        error = true;

    }


    let city = document.getElementById('city');
    if (verifName(city, city.value) === false){

        error = true;

    }


    let email = document.getElementById('email');

    if (verifEmail(email, email.value) === false){

        error = true;

    }

    if (error == false ){
        let contact = {

            firstName : firstName.value,
            lastName : lastName.value,
            address : address.value,
            city : city.value,
            email : email.value,

        }

        return contact
    }

    return false;

}

/**
 * 
 * 
 * le but de cette fonction et suite a la recuperation de recupOrder recuperer un objet et amener le client devant son numéro de commande
 */
async function submitOrder(){

        if (recupOrder() === false){

            return false

        }

        let contact = recupOrder();

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

          let idResponse = jsonResponse.orderId;

          localStorage.removeItem("ArrayStorage");

          location.replace("./confirmation.html?id="+idResponse);

          console.log(jsonResponse, idResponse, envoyerCommande);
    }

/**
 * Argument: name (object), value (string)
 * Renvoie la valeur "value" (string) si jamais la valeur passe le regex sinon renvoie false
 * Test value avec le regex enregistrer
 */
function verifName(name, value){

    console.log(typeof name, typeof value)


    let regex = /^[^%$€"'~*+.;:!?,<>"#°=+£¤&²{}[\]`@()_|\/[\\^¨§µ\d]*$/g;
    let paraFail = document.getElementById(name.name + "ErrorMsg");

    if(regex.test(value)){

        paraFail.textContent = "";
        return value

    } else {

        console.log(paraFail, name)
        paraFail.textContent = "Le Champ n'est pas valide";

        return false;

    }
}


/**
 * Argument : name (object), value (string)
 * Renvoie la valeur "value"(string) si jamais la valeur passe le regex sinon renvoie false
 * Test value avec le regex enregistrer
 */
function verifAdress(name, value){

    let regex = /^[^%$€"'~*+.;:!?,<>"#°=+£¤&²{}[\]`@()_|\/[\\^¨§µ]*$/g;
    let paraFail = document.getElementById(name.name + "ErrorMsg");

    if(regex.test(value)){

        paraFail.textContent = "";
        return value;

    } else {


        paraFail.textContent = "Le champ n'est pas valide";

        return false;

    }
}

/**
 * Argument : name (object), value (string)
 * Renvoie la valeur "value"(string) si jamais la valeur passe le regex sinon renvoie false
 * Test value avec le regex enregistrer
 */
function verifEmail(name, value){


    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let paraFail = document.getElementById(name.name + "ErrorMsg");

    if(regex.test(value)){

        paraFail.textContent = "";
        return value;

    } else {


        paraFail.textContent = "Le champ n'est pas valide";

        return false;
    }
}

/**
 * 
 * 
 * une fois la page charger entierement, on execute la fonction init
 */
window.addEventListener("DOMContentLoaded", (event) => {
    init();
});