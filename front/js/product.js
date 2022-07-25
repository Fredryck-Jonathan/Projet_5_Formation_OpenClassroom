let href = window.location.href;

let selector = document.getElementById("colors")

let descriptionhtml = document.getElementById("description")
let imgcontainer = document.getElementsByClassName("item__img") 
let title = document.getElementById("title")
let pricehtml = document.getElementById("price")
let inputquantity = document.getElementById("quantity")
let addToCart = document.getElementById("addToCart")


let  url = new URL(href);

let id = url.searchParams.get("id");

let promise01 = fetch("http://localhost:3000/api/products/"+ id)

promise01
.then((response) => {
        
    const productData = response.json();

    productData.then((infos) => {
        
        let img = document.createElement("img")
        let src = document.createAttribute("src")
        src.value = infos.imageUrl;
        let alt = document.createAttribute("alt")
        alt.value = infos.altTxt;

        img.setAttributeNode(src)
        img.setAttributeNode(alt)

        imgcontainer[0].append(img)


        let name = infos.name

        title.textContent = name

        let price = infos.price

        pricehtml.textContent = price

        let description = infos.description

        descriptionhtml.textContent = description

        let colors = infos.colors

        for (color in colors){

        
        let option = document.createElement("option")
        let valeur = document.createAttribute("value")
        valeur.value = colors[color]

        let text = colors[color]

        option.setAttributeNode(valeur)
        option.textContent = text

        selector.append(option)
        }

        addToCart.addEventListener("click", function createcommand () {

            
            let idcommand = id;
            let colorcommand = selector.value;
            let numbercommand = inputquantity.value;

            let numberStorage = localStorage.length

        if (colorcommand == "" ){

            alert("Veuillez choisir une couleur")

        
        }
   
        else {

        if (numbercommand == 0){

        alert("Veuillez choisir une quantité au-dessus de 0")

        }
         
        else { if (localStorage.length != 0 ){
            for( let i = 0; i <= localStorage.length; i++){

                if (i == localStorage.length){

                    let commandesto = {
                        id : idcommand,
                        couleur : colorcommand,
                        quantite : numbercommand
                    }
            
                    console.log(colorcommand)
                    numberStorage = localStorage.length

                    localStorage.setItem('commande'+ numberStorage, JSON.stringify(commandesto) )     //+ numberStorage = JSON.stringify(commandesto);

                    break



                }

                else {  let stokey = localStorage.key(i);
                        let stoget = localStorage.getItem(stokey);
                        let stockageObject = JSON.parse(stoget);

                        let idstorage = stockageObject.id;
                        let colorstorage = stockageObject.couleur;
                        let numberstorage = stockageObject.quantite;

                


                if( idstorage === idcommand && colorstorage === colorcommand){


                let stokey = localStorage.key(i);
                let stoget = localStorage.getItem(stokey);
                let stockageObject = JSON.parse(stoget);
            
    


                //On la remplace par une nouvelle valeur qu'on ajjoute
                numberstorage = Number(numbercommand) + Number(numberstorage);
                numberstorage = numberstorage.toString();

                stockageObject.quantite = numberstorage;

                

                console.log(numberstorage, stockageObject.quantite,stockageObject);


                

                localStorage.setItem( stokey, JSON.stringify(stockageObject) )
            

                break
           
    
    }}}}


    else {

        let commandesto = {
            id : idcommand,
            couleur : colorcommand,
            quantite : numbercommand
        }

        numberStorage = localStorage.length

        localStorage.setItem('commande'+ numberStorage , JSON.stringify(commandesto) )

        
        
    }}}

    


})









     }


    

       




        
        
)})







