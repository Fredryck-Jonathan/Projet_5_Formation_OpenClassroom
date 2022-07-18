let promise01 = fetch("http://localhost:3000/api/products");
let items = document.getElementById("items")

 promise01 
    .then((response) => {
        
        const productsData = response.json();
    
        productsData.then((products) => {
            for (product in products){
                let lien = document.createElement("a")
                let href = document.createAttribute("href")
                href.value = "./product.html?id="+ products[product]._id;
                lien.setAttributeNode(href)


                let article = document.createElement("article")


                let img = document.createElement("img")
                let src = document.createAttribute("src")
                src.value = products[product].imageUrl
    
                let alt = document.createAttribute("alt")
                alt.value = products[product].altTxt

                img.setAttributeNode(src)
                img.setAttributeNode(alt)

            
                let titre = document.createElement("h3")
                let classeNom = document.createAttribute("class")
                classeNom.value = "productName"
                titre.textContent = products[product].name

                titre.setAttributeNode(classeNom)

                let para = document.createElement("p")
                let classePara = document.createAttribute("class")
                classePara.value = "productDescription"
                para.textContent = products[product].description
                
                para.setAttributeNode(classePara)

                lien.append(article)
                article.append(img)
                article.append(titre)
                article.append(para)
                items.append(lien)


            console.log(href, products, src, alt, titre, para, img)




            }
        });

       
    })
    

const products = promise01
console.log(products)