function init() {

        fetch("http://localhost:3000/api/products")
        
        .then((response) => response.json())
        .then((products) => {
            turnOnProducts(products);
            
        
        });
        

 
}

function turnOnProducts(products) {
    let items = document.getElementById("items");
    for (product of products){
        let cardProduct = displayProduct(product);
        items.append(cardProduct);
    }
}

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







