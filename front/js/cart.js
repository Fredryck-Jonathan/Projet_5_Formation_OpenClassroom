async function  init(){

    let arrayStorage = localStorage.getItem("ArrayStorage");
    arrayStorage = JSON.parse(arrayStorage);

    console.log(JSON.stringify(arrayStorage))

    if(localStorage.length == 0 || JSON.stringify(arrayStorage) == "[]"){

    alert("Votre panier est vide");
    location.replace("./index.html");

    } else {

        for (object in arrayStorage){


            let id = arrayStorage[object].id;




            let promise = fetch("http://localhost:3000/api/products/"+ id);

  

            
            await promise.then(async (response) => {



                
                let productData = response.json();

                

                await productData.then(async (infos) => {

                console.log(infos, arrayStorage)

                let objCreateItems = createItems(infos, object,arrayStorage);


                let objCalculQt = calculQt(infos, arrayStorage, object);


            
                objCalculQt.spanTotalPrice.textContent =+ objCalculQt.prixtotal;

                objCalculQt.spanQuantity.textContent =+ objCalculQt.totalQt;


                objCreateItems.paraDel.addEventListener("click", (event) => {
                    delCommand(object, arrayStorage,objCreateItems, objCalculQt, infos);
                });

                objCreateItems.inputQt.addEventListener("change", (event) => {
                    qtChange(object, objCreateItems, infos, arrayStorage, objCalculQt);
                });


                });

            });



        };
    };




};


function createItems(infos, object, arrayStorage){

    console.log(object)

    let article = document.createElement("article")
    article.setAttribute('class',"cart__item")
    article.setAttribute('date-id',infos.id)
    article.setAttribute('data-color',arrayStorage[object].couleur)


    let divItemImg = document.createElement("div")
    divItemImg.setAttribute('class',"cart__item__img")


    let img = document.createElement("img")
    img.setAttribute('src', infos.imageUrl)
    img.setAttribute('alt', infos.altTxt)


    let divItemContent = document.createElement("div")
    divItemContent.setAttribute('class',"cart__item__content")


    let divItemContentDescription = document.createElement("div")
    divItemContentDescription.setAttribute('class',"cart__item__content__description")


        let h2 = document.createElement("h2")
        h2.textContent = infos.name;

        let paraColor = document.createElement("p")
        paraColor.textContent = arrayStorage[object].couleur

        let paraPrice = document.createElement("p")
        paraPrice.textContent = infos.price + "€"

        let divItemContentSetting = document.createElement("div")
        divItemContentSetting.setAttribute('class', "cart__item__content__settings")


            let divItemContentSettingQt = document.createElement("div")

                divItemContentSettingQt.setAttribute('class',"cart__item__content__settings_quantity")

                    let paraQt = document.createElement("p")
                        paraQt.textContent = "Qté : " + arrayStorage[object].quantite

                    let inputQt = document.createElement("input")
                    inputQt.setAttribute('type',"number")
                    inputQt.setAttribute('class',"itemQuantity")
                    inputQt.setAttribute('name',"itemQuantity")
                    inputQt.setAttribute('min', 1)
                    inputQt.setAttribute('max',100)
                    inputQt.setAttribute('value', arrayStorage[object].quantite)

            let divItemContentSettingDel = document.createElement("div")
            divItemContentSettingDel.setAttribute('class',"cart__item__content__settings_delete")

                        let paraDel = document.createElement("p")
                        paraDel.setAttribute('class',"deleteItem")
                        paraDel.textContent = "Supprimer"

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





                        ajoutItems(objtCreateItems)

                        return objtCreateItems;

}



function ajoutItems(objtCreateItems){

    
    let sectionCartItems = document.getElementById("cart__items")


    sectionCartItems.append(objtCreateItems.article)
        objtCreateItems.article.append(objtCreateItems.divItemImg, objtCreateItems.divItemContent, objtCreateItems.divItemContentSetting)
        objtCreateItems.divItemImg.append(objtCreateItems.img)
        objtCreateItems.divItemContent.append(objtCreateItems.divItemContentDescription)
        objtCreateItems.divItemContentDescription.append(objtCreateItems.h2, objtCreateItems.paraColor, objtCreateItems.paraPrice)
        objtCreateItems.divItemContentSetting.append(objtCreateItems.divItemContentSettingQt, objtCreateItems.divItemContentSettingDel)
        objtCreateItems.divItemContentSettingQt.append(objtCreateItems.paraQt, objtCreateItems.inputQt)
        objtCreateItems.divItemContentSettingDel.append(objtCreateItems.paraDel)




}


function delCommand(object, arrayStorage, objCreateItems, objCalculQt, infos) {
                        
            console.log(arrayStorage)                             

            let arrayStorageQt = arrayStorage[object].quantite
                
            arrayStorage.splice(object,1)

            console.log(object)

            localStorage.ArrayStorage = JSON.stringify(arrayStorage);
                                   


            location.reload();

            

            if(JSON.stringify(arrayStorage) == "[]"){


            alert("Votre panier est vide");
            location.replace("./index.html");


            } else {

                let prixtotal = objCalculQt.prixtotal;
                let totalQt = objCalculQt.totalQt;

                console.log(prixtotal, totalQt)

                let prixObjet = infos.price * arrayStorageQt

                prixtotal = Number(prixtotal) - Number(prixObjet)

                console.log(prixtotal, prixObjet, infos.price, arrayStorageQt)

                objCalculQt.spanTotalPrice.textContent = prixtotal;

                objCalculQt.spanQuantity.textContent = totalQt - arrayStorageQt;
            
            }

                                            
}

function calculQt(infos, arrayStorage, object){


    let spanQuantity = document.getElementById("totalQuantity");
    let spanTotalPrice = document.getElementById("totalPrice");

    let totalQt = Number(spanQuantity.textContent);
    let prixtotal = Number(spanTotalPrice.textContent);

    quantiteStockage = Number(arrayStorage[object].quantite);

    totalQt = quantiteStockage + totalQt;

    let prixtotalproduit = quantiteStockage * infos.price;
    prixtotal = prixtotal + prixtotalproduit;
    


    let objCalculQt = {
        prixtotal : prixtotal ,
        totalQt : totalQt,
        spanQuantity : spanQuantity,
        spanTotalPrice : spanTotalPrice,
        prixtotalproduit: prixtotalproduit

    }

    return objCalculQt
    

}


function qtChange (object, objCreateItems, infos, arrayStorage, objCalculQt) {

    
    
    console.log(arrayStorage);
    

    let prixtotalproduit = Number(objCalculQt.totalQt) * infos.price;

    console.log(prixtotalproduit, arrayStorage, object);

    prixtotal = Number(objCalculQt.spanTotalPrice.textContent) - prixtotalproduit;

       
    let newQT = objCreateItems.inputQt.value;

    if (newQT <= 0){

    alert("La valeur doit être au dessus de 0 ou être supprimer via le bouton supprimer")
    

    } else {

    

    console.log(prixtotal);

    let totalQt = Number(objCalculQt.spanQuantity.textContent);
    
    let quantiteStockage = Number(arrayStorage[object].quantite);


    totalQt = totalQt - quantiteStockage;


    quantiteStockage = newQT;


    prixtotalproduit = quantiteStockage * infos.price;
    prixtotal = prixtotal + prixtotalproduit;
    objCalculQt.spanTotalPrice.textContent = prixtotal;



    totalQt = Number(totalQt) + Number(quantiteStockage);
    
    
    objCalculQt.spanQuantity.textContent = totalQt;
    
    
    objCreateItems.paraQt.textContent = "Qté : " + quantiteStockage;

    arrayStorage[object].quantite = quantiteStockage;

    console.log(arrayStorage[object].quantite, totalQt);

    localStorage.ArrayStorage = JSON.stringify(arrayStorage);

    objCalculQt.totalQt = totalQt


    }

}




    
    





window.addEventListener("DOMContentLoaded", (event) => {
    init();
  });