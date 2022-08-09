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

window.addEventListener("DOMContentLoaded", (event) => {
    init();
  });