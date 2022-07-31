function init(){

    id = recupId()
    

    let promise01 = fetch("http://localhost:3000/api/products/"+ id);

    promise01
    .then((response) => {
        
        const productData = response.json();

        productData.then((infos) => { 
            
            
        createItems(infos)



        })

        
    
    })
}




function createItems(infos){

    let img = document.createElement("img")

    img.setAttribute('src', infos.imageUrl)
    //let src = document.createAttribute("src")
    //src.value = infos.imageUrl;
    img.setAttribute('alt', infos.altTxt)
    //let alt = document.createAttribute("alt")
    //alt.value = infos.altTxt;
    //img.setAttributeNode(src)
    //img.setAttributeNode(alt)

    let imgcontainer = document.getElementsByClassName("item__img") 
    imgcontainer[0].append(img)


    //let name = infos.name

    let title = document.getElementById("title")
    title.textContent = infos.name

    //let price = infos.price

    let pricehtml = document.getElementById("price")
    pricehtml.textContent = infos.price

    //let description = infos.description


    let descriptionhtml = document.getElementById("description")
    descriptionhtml.textContent = infos.description

    console.log(infos)
    let colors = infos.colors
    

        for (color in colors){ 
            
            addColor(colors)

        }
}


function addColor(colors){        
        

let option = document.createElement("option")
let valeur = document.createAttribute("value")
valeur.value = colors[color]

let text = colors[color]

option.setAttributeNode(valeur)
option.textContent = text


let selector = document.getElementById("colors")
selector.append(option)




}

let addToCart = document.getElementById("addToCart")

addToCart.addEventListener("click", (event) => {
    createcommand();
  });
  





function createcommand () {

    let recupValeur = recupValue();

    console.log(recupValeur)


    if (colorcommand == "" ){

        alert("Veuillez choisir une couleur")

        
    }
   
    else {

        if (numbercommand < 1){

        alert("Veuillez choisir une quantité au-dessus de 0")

        }
         
        else { 
            
            if (localStorage.length != 0 ){
                    
                for( let i = 0; i <= localStorage.length; i++){

                    if (i == localStorage.length){

                    addItem()    

                    break


                    }

                    else {  
                        
                    
                    let valueInitSto = initSto(i)
                    let recupValueCommand = recupValue()

                    console.log(valueInitSto.idstorage)

                        if( valueInitSto.idstorage === recupValueCommand.idcommand && valueInitSto.colorstorage === recupValueCommand.colorcommand){

                        initSto(i)

                        changementquantite();
                    
                        break
           
    
                        }
                    }
                }
            }


            else { 
        
            addItem()

            }

        }
    }

    


}

function recupId(){

let href = window.location.href;
    let  url = new URL(href);
    let id = url.searchParams.get("id");

    return id
}

function recupSto(i){

    let stokey = localStorage.key(i);
    let stoget = localStorage.getItem(stokey);
    let stockageObject = JSON.parse(stoget);

    let stoObj = {

        stokey : stokey,
        stockageObject: stockageObject


    }

        


    

    return stoObj;
}

function initSto(i){

    let stockageObject = recupSto(i).stockageObject;
    let stokey = recupSto(i).stokey;

    console.log(stockageObject)

    let ObjStockage ={

    idstorage : stockageObject.id,
    colorstorage : stockageObject.couleur,
    numberstorage : stockageObject.quantite,
    stockageObject: stockageObject,
    stokey : stokey


    }

    console.log(ObjStockage)

    return ObjStockage

}

function recupValue(){

    inputquantity = document.getElementById("quantity");
    selector = document.getElementById("colors");
    id = recupId();
    colorcommand = selector.value;
    numbercommand = inputquantity.value;
    numberStorage = localStorage.length;

let objValue = {

    idcommand : id ,
    colorcommand : colorcommand,

    numbercommand : numbercommand,
    
    numberStorage : numberStorage,

}

    return objValue;
}

function changementquantite(){
    let recupValeur = recupValue()
    let valeurSto = initSto()
    numberstorage = Number(recupValeur.numbercommand) + Number(valeurSto.numberstorage);
    numberstorage = numberstorage.toString();

    valeurSto.stockageObject.quantite = numberstorage;

    localStorage.setItem(valeurSto.stokey, JSON.stringify(valeurSto.stockageObject) )



}

function addItem() {

let recupValeur = recupValue();

let commandesto = {
    id : recupValeur.idcommand,
    couleur : recupValeur.colorcommand,
    quantite : recupValeur.numbercommand
}

numberStorage = localStorage.length

localStorage.setItem('commande'+ numberStorage , JSON.stringify(commandesto) )


}


window.addEventListener("DOMContentLoaded", (event) => {
    init();
  });