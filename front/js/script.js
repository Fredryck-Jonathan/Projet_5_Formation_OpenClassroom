// let promise01 = fetch("http://localhost:3000/api/products");
// let items = document.getElementById("items")

 // promise01 
    // .then((response) => {
        
        // const productsData = response.json();
    
        // productsData.then((products) => {
            // for (product of products){
                // let lien = document.createElement("a")
                // let href = document.createAttribute("href")
                // href.value = "./product.html?id="+ product._id;
                // lien.setAttributeNode(href)


                // let article = document.createElement("article")


                // let img = document.createElement("img")
                // let src = document.createAttribute("src")
                // src.value = product.imageUrl
    
                // let alt = document.createAttribute("alt")
                // alt.value = product.altTxt

                // img.setAttributeNode(src)
                // img.setAttributeNode(alt)

            
                // let titre = document.createElement("h3")
                // let classeNom = document.createAttribute("class")
                // classeNom.value = "productName"
                // titre.textContent = product.name

                // titre.setAttributeNode(classeNom)

                // let para = document.createElement("p")
                // let classePara = document.createAttribute("class")
                // classePara.value = "productDescription"
                // para.textContent = product.description
                
                // para.setAttributeNode(classePara)

                // lien.append(article)
                // article.append(img)
                // article.append(titre)
                // article.append(para)
                // items.append(lien)


            // console.log(href, products, src, alt, titre, para, img)




            // }
        // });

       
    // })
    

// const products = promise01
// console.log(products)

function init() {
    try{
        fetch("http://localhost:3000/api/products")
        
        .then((response) => response.json())
        .then((products) => {
            turnOnProducts(products);
        });
    } catch(err){

    alert("error")
        
    }
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
    // let href = document.createAttribute("href");
    // href.value = "./product.html?id="+ product._id;
    // lien.setAttributeNode(href);
    // peut être remplacé par, tu remarqueras le litéral de gabarit pour éviter une concaténation la variable est entre ${}
    lien.setAttribute('href', `./product.html?id=${product._id}`);


    let article = document.createElement("article");


    let img = document.createElement("img");
    // let src = document.createAttribute("src");
    // src.value = product.imageUrl;

    // let alt = document.createAttribute("alt");
    // alt.value = product.altTxt;
    // peut être remplacé par
    img.setAttribute('src', product.imageUrl);
    img.setAttribute('alt', product.altTxt);

    // img.setAttributeNode(src);
    // img.setAttributeNode(alt);


    let titre = document.createElement("h3");
    // let classeNom = document.createAttribute("class");
    // classeNom.value = "productName";
    // peut être remplacé par
    titre.classList.add('productName');

    titre.textContent = product.name;

    // titre.setAttributeNode(classeNom);

    let para = document.createElement("p");
    // let classePara = document.createAttribute("class");
    // classePara.value = "productDescription";
    // peut être remplacé par
    para.classList.add('productDescription');

    para.textContent = product.description;
    
    // para.setAttributeNode(classePara);

    lien.append(article);
    // article.append(img);
    // article.append(titre);
    // article.append(para);
    // peut être remplacé par
    article.append(img, titre, para);

    return lien;
}


window.addEventListener("DOMContentLoaded", (event) => {
try{
  init();
} 
catch(err) {
    alert("ERROR : Veuillez contacter le service client")
}



});







