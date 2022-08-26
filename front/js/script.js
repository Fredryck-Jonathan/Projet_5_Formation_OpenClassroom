/**
 * 
 * 
 * Fonction qui initie les autre fonction, elle recupere les éléments du back office
 */
function init() {
    let promise = fetch("http://localhost:3000/api/products")


        .then((response) => response.json())
        .then((products) => {
            turnOnProducts(products);
    
            
        
        });
        promise.catch((err) =>{

            alert("Nous avons une erreur du type "+ err.message +" merci de contacter le service client")

        }
        )


 
}

/**
 * argument: products (tableau d'objet)
 * 
 * Le but de cette fonction est d'initié la création des items via displayProduct et d'ensuite les ajoutés à la section "items" afin de les afficher
 */
function turnOnProducts(products) {
    let items = document.getElementById("items");
    for (let product of products){
        let cardProduct = displayProduct(product);
        items.append(cardProduct);
    }
}


/**
 * argument: product (object)
 * renvoie: lien (object)
 * le but de cette fonction est de créer les items qui est nécessaire a l'affichage.
 */
function displayProduct(product) {

    let lien = document.createElement("a");
    lien.setAttribute('href', `./product.html?id=${product._id}`);


    let article = document.createElement("article");


    let img = document.createElement("img");

    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altTxt);

    let titre = document.createElement("h3");

    titre.classList.add('productName');

    titre.textContent = product.name;

    let para = document.createElement("p");

    para.classList.add('productDescription');

    para.textContent = product.description;

    lien.append(article);

    article.append(img, titre, para);

    return lien;
}


window.addEventListener("DOMContentLoaded", (event) => {
    init();
});







