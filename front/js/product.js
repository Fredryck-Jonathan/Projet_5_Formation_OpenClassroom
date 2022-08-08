/** 
 * 
 * 
 * Recupere l'id et va chercher les données avec l'id recuperer et initialise la fonction createItems
*/
function init(){

    id = recupId();


    let promise01 = fetch("http://localhost:3000/api/products/"+ id);

    promise01
    .then((response) => {

        const productData = response.json();

        productData.then((infos) => { 


        createItems(infos);

        let addToCart = document.getElementById("addToCart");

        addToCart.addEventListener("click", (event) => {
        createcommand();
        });



        })

    })
}



/** 
 * 
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


        for (color in colors){ 

            addColor(colors);

        }
}

/** 
 * arguement colors
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
 *  valeur qui initie la création de la command
*/
function createcommand () {

    let recupValeur = recupValue();

    console.log(recupValeur);


    if (colorcommand == "" ){

        alert("Veuillez choisir une couleur");


    }
   
    else {

        if (numbercommand < 1){

        alert("Veuillez choisir une quantité au-dessus de 0");

        }

        else { 

            let ArrayStorage = localStorage.getItem("ArrayStorage");

            console.log(ArrayStorage)

            if (localStorage.length != 0 && ArrayStorage != "[]" ){

              
              ArrayStorage = JSON.parse(ArrayStorage);

                for( object in ArrayStorage ){

                    console.log(object)
  
                    let objectSto = ArrayStorage[object]
                    
                    let recupValueCommand = recupValue();

                    console.log(objectSto.id,recupValueCommand.idcommand, objectSto.couleur,recupValueCommand.colorcommand)

                        if( objectSto.id === recupValueCommand.idcommand && objectSto.couleur === recupValueCommand.colorcommand){

                        changementquantite(objectSto, object);

                        break;

                        }

                        else if( object == (Number(ArrayStorage.length)-1)) {

                        addItem(object)


                        }
                    }
                
            }


            else { 

            

            addFirstItem();

            }

        }
    }




}

/** 
 * 
 * un id : String
 * fonction qui sert à aller chercher l'id grace à l'URL
*/
function recupId(){

let href = window.location.href;
    let  url = new URL(href);
    let id = url.searchParams.get("id");

    return id
}

/** 
 * l'argument i
 * un objet contenant la valeur stokey et stockageObject
 * 
*/
function recupSto(object){

    //let stokey = localStorage.key(i);
    //let stoget = localStorage.getItem(stokey);
    //let stockageObject = JSON.parse(stoget);

    console.log(object)

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
 * l'argument i
 * 
 * à l'aide de la fonction recupSto, on recupere les valeurs stockage objet et on initialise un nouvelle objet qu'on utilisera plu tard
*/
function initSto(object){

    let ArrayStorage = recupSto(object).ArrayStorage;
    let elementArray = recupSto(object).elementArray;

    console.log(elementArray)

    let ObjStockage = {

    idstorage : elementArray.id,
    colorstorage : elementArray.couleur,
    numberstorage : elementArray.quantite,
    elementArray: elementArray,
    ArrayStorage : ArrayStorage


    }

    console.log(ObjStockage);

    return ObjStockage;

}

/** 
 * 
 * renvoi l'objet value
 * recupere les valeurs du selecteur et des quantités pour les renvoyer dans un objet
*/
function recupValue(){

    inputquantity = document.getElementById("quantity");
    selector = document.getElementById("colors");
    id = recupId();
    colorcommand = selector.value;
    numbercommand = inputquantity.value;



let objValue = {

    idcommand : id ,
    colorcommand : colorcommand,

    numbercommand : numbercommand,


}

    return objValue;
}

/** 
 * 
 * 
 * Recupere les valeurs recupValeur et valeurSto et remplace les quantités
*/
function changementquantite(objectSto, object){

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage)





    let recupValeur = recupValue();

    numberstorage = Number(recupValeur.numbercommand) + Number(objectSto.quantite);

    objectSto.quantite = numberstorage;

    console.log(objectSto,objectSto.quantite , object)

    arrayStorage[object] = objectSto

    console.log(arrayStorage)

    localStorage.ArrayStorage = JSON.stringify(arrayStorage);
    
    
    alert("Votre commande a été ajouter")






}

/** 
 * 
 * renvoie une alert 
 * ajjoute l'objet commandesto au local storage
*/
function addItem() {

let objInitSto = initSto(object);

arrayStorage = objInitSto.ArrayStorage;


console.log(ArrayStorage)

let recupValeur = recupValue();

console.log(recupValeur);

arrayStorage.push({id: recupValeur.idcommand, couleur: recupValeur.colorcommand, quantite: recupValeur.numbercommand},);

localStorage.setItem('ArrayStorage', JSON.stringify(arrayStorage));

alert("Votre commande a été ajjouter au panier");


}


function addFirstItem() {

    let ArrayStorage = [];

    let recupValeur = recupValue();
    
    console.log(recupValeur);
    
    ArrayStorage.push({id: recupValeur.idcommand, couleur: recupValeur.colorcommand, quantite: recupValeur.numbercommand});
    
    localStorage.setItem('ArrayStorage', JSON.stringify(ArrayStorage));
    
    alert("Votre commande a été ajouter au panier");
    
    
    }


window.addEventListener("DOMContentLoaded", (event) => {
    init();
  });