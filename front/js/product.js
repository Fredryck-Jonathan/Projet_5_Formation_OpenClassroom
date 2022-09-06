/** 
 * 
 * 
 * Recupere l'id et va chercher les données avec l'id recuperer et initialise la fonction createItems
*/
function init(){

    id = recupId();

    let promise01 = fetch("http://localhost:3000/api/products/"+ id);

    let addToCart = document.getElementById("addToCart");

    addToCart.addEventListener("click", (event) => {
        createcommand();
    });

    promise01
    .then((response) => {

        const productData = response.json();

        productData.then((infos) => { 

            createItems(infos);

        })

    })
}



/** 
 * argument: infos (object)
 * 
 * cette fonction créé les items suite a la recuperation des donnés effectuer en amont et declenche la fonction addColor
*/
function createItems(infos){

    let img = document.createElement("img");

    img.setAttribute('src', infos.imageUrl);

    img.setAttribute('alt', infos.altTxt);

    let imgcontainer = document.getElementsByClassName("item__img") ;
    imgcontainer[0].append(img);

    let title = document.getElementById("title");
    title.textContent = infos.name;

    let pricehtml = document.getElementById("price");
    pricehtml.textContent = infos.price;

    let descriptionhtml = document.getElementById("description");
    descriptionhtml.textContent = infos.description;

    console.log(infos);
    let colors = infos.colors;

    for (let color in colors){ 

        addColor(colors);

    }
}

/** 
 * argument: colors (array)
 * 
 * créer les valeurs option et valeur et les ajjoutes au selecteur
*/
function addColor(colors){

    let option = document.createElement("option");
    let valeur = document.createAttribute("value");
    valeur.value = colors[color];

    let text = colors[color];

    option.setAttributeNode(valeur);
    option.textContent = text;

    let selector = document.getElementById("colors");
    selector.append(option);

}







/** 
 * 
 * 
 *  valeur qui initie la création de la commande
*/
function createcommand() {

    let recupValeur = recupValue();

    console.log(recupValeur);

    if (recupValeur.couleur == "" ){

        alert("Veuillez choisir une couleur");
        return false

    }

    if (recupValeur.quantite < 1){

    alert("Veuillez choisir une quantité au-dessus de 0");
    return false

    }
 
    let ArrayStorage = localStorage.getItem("ArrayStorage");

    console.log(ArrayStorage, recupValeur)

        if (localStorage.length != 0 && ArrayStorage != "[]" ){

            ArrayStorage = JSON.parse(ArrayStorage);

            let addNewItem = false

            for(let i in ArrayStorage){

                let objectSto = ArrayStorage[i]

            if( objectSto.id === recupValeur.id && objectSto.couleur === recupValeur.couleur){

                changementquantite(recupValeur, objectSto, i);
                let quantiteStorage = parseInt(ArrayStorage[i].quantite);
                ArrayStorage[i].quantite = quantiteStorage + parseInt(recupValeur.quantite);
                addNewItem = true

            }
        }

        if (!addNewItem) {

            addItem(recupValeur, ArrayStorage);

        } else {
            localStorage.setItem('ArrayStorage',JSON.stringify(ArrayStorage));
            alert("Votre commande a bien été modifiée")
        }
    } else { 

        addItem(recupValeur);

    }
}
    



/** 
 * 
 * Renvoie: id (String)
 * fonction qui sert à aller chercher l'id grace à l'URL
*/
function recupId(){

    let href = window.location.href;
    let  url = new URL(href);
    let id = url.searchParams.get("id");

    return id
}


/** 
 * l'argument: object
 * Renvoie: objRecupSto (object)
 * Recupere les infos du arrayStorage est les place dans un object objRecupSto
*/
function recupSto(object){

    ArrayStorage = localStorage.getItem("ArrayStorage");

    ArrayStorage = JSON.parse(ArrayStorage);

    let elementArray = ArrayStorage[object];

    let objRecupSto = {

        ArrayStorage : ArrayStorage,
        elementArray : elementArray

    }

    return objRecupSto;
}


/** 
 * l'argument: object
 * renvoie: ObjStockage (object)
 * à l'aide de la fonction recupSto, on recupere les valeurs stockage objet et on initialise un nouvelle objet qu'on utilisera plu tard
*/
function initSto(object){

    let ArrayStorage = recupSto(object).ArrayStorage;
    let elementArray = recupSto(object).elementArray;

    let ObjStockage = {

        idstorage : elementArray.id,
        colorstorage : elementArray.couleur,
        numberstorage : elementArray.quantite,
        elementArray: elementArray,
        ArrayStorage : ArrayStorage

    }

    return ObjStockage;

}

/** 
 * 
 * renvoie: objValue (object)
 * recupere les valeurs du selecteur et des quantités pour les renvoyer dans un objet
*/
function recupValue(){

    inputquantity = document.getElementById("quantity");
    selector = document.getElementById("colors");
    id = recupId();
    colorcommand = selector.value;
    numbercommand = inputquantity.value;

    let objValue = {

        id : id ,
        couleur : colorcommand,
        quantite : numbercommand,

    }

    return objValue;

}

/** 
 * argument: objectSto (object) , object (number)
 * 
 * Recupere les valeurs recupValeur et valeurSto et remplace les quantités
*/
function changementquantite(recupValeur, objectSto, object){

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage);


    numberstorage = Number(recupValeur.quantite) + Number(objectSto.quantite);

    objectSto.quantite = numberstorage;

    console.log(objectSto,objectSto.quantite , object, recupValeur)

    arrayStorage[object] = objectSto;

    localStorage.ArrayStorage = JSON.stringify(arrayStorage);

    alert("Votre commande a été ajouter");

}


/** 
 * 
 * renvoie une alert 
 * ajjoute push un objet a l'arrayStorage recuperer et remplace le ArrayStorage du localStorage par l'arrayStorage modifier
*/
function addItem(object, ArrayStorage) {

    if ('undefined' === typeof(ArrayStorage)){
        ArrayStorage = [];
    }

    ArrayStorage.push(object);

    localStorage.setItem('ArrayStorage', JSON.stringify(ArrayStorage));

    alert("Votre commande a été ajouter au panier");

}

window.addEventListener("DOMContentLoaded", (event) => {
    init();
});