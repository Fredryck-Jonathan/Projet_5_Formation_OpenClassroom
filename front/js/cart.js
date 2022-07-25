let sectionCartItems = document.getElementById("cart__items")
let spanQuantity = document.getElementById("totalQuantity")
let spanTotalPrice = document.getElementById("totalPrice")

let totalQt = 0
let prixtotal = 0

for( let i = 0; i < localStorage.length; i++){
 
    let stokey = localStorage.key(i);
    let stoget = localStorage.getItem(stokey);
    let stockageObject = JSON.parse(stoget);

    console.log(stockageObject)

    let idStockage = stockageObject.id
    let colorStockage = stockageObject.couleur
    let quantiteStockage = stockageObject.quantite

    let promise = fetch("http://localhost:3000/api/products/"+ idStockage)

    promise
        .then((response) => {
        
        const productData = response.json();

        productData.then((infos) => {

            let article = document.createElement("article")
            let classCartItem = document.createAttribute("class")
                classCartItem.value = "cart__item"

            let dataId = document.createAttribute("data-id")
                dataId.value = idStockage

            let dataColor = document.createAttribute("data-color")
                dataColor.value = colorStockage

            article.setAttributeNode(classCartItem)
            article.setAttributeNode(dataId)
            article.setAttributeNode(dataColor)


            let divItemImg = document.createElement("div")
            let classItemImg = document.createAttribute("class")
                classItemImg.value = "cart__item__img"

            divItemImg.setAttributeNode(classItemImg)

            let img = document.createElement("img")
            let imgSrc = document.createAttribute("src")
                imgSrc.value = infos.imageUrl;

            let imgAlt = document.createAttribute("alt")
                imgAlt.value = infos.altTxt;

            
            img.setAttributeNode(imgSrc)
            img.setAttributeNode(imgAlt)

            let divItemContent = document.createElement("div")

            let classItemContent = document.createAttribute("class")
            classItemContent.value = "cart__item__content"

            divItemContent.setAttributeNode(classItemContent)

            let divItemContentDescription = document.createElement("div")

            let classItemContentDescription = document.createAttribute("class")
                classItemContentDescription.value = "cart__item__content__description"

                divItemContentDescription.setAttributeNode(classItemContentDescription)

                let h2 = document.createElement("h2")
                    h2.textContent = infos.name;

                let paraColor = document.createElement("p")
                    paraColor.textContent = colorStockage

                let paraPrice = document.createElement("p")
                    paraPrice.textContent = infos.price + "€"

                let divItemContentSetting = document.createElement("div")
                
                let classItemContentSetting = document.createAttribute("class")
                    classItemContentSetting.value = "cart__item__content__settings"

                divItemContentSetting.setAttributeNode(classItemContentSetting)

                    let divItemContentSettingQt = document.createElement("div")
                
                    let classItemContentSettingQt = document.createAttribute("class")
                        classItemContentSettingQt.value = "cart__item__content__settings_quantity"

                        divItemContentSettingQt.setAttributeNode(classItemContentSettingQt)

                            let paraQt = document.createElement("p")
                                paraQt.textContent = "Qté : " + quantiteStockage

                            let inputQt = document.createElement("input")

                                let typeInput = document.createAttribute("type")
                                typeInput.value = "number"

                                let classInput = document.createAttribute("class")
                                    classInput.value = "itemQuantity"

                                let nameInput = document.createAttribute("name")
                                    nameInput.value = "itemQuantity"

                                let minInput = document.createAttribute("min")
                                    minInput.value = 1

                                let maxInput = document.createAttribute("max")
                                    maxInput.value = 100

                                let valueInput = document.createAttribute("value")
                                    valueInput.value = quantiteStockage
                                

                                    inputQt.setAttributeNode(typeInput)
                                    inputQt.setAttributeNode(classInput)
                                    inputQt.setAttributeNode(nameInput)
                                    inputQt.setAttributeNode(minInput)
                                    inputQt.setAttributeNode(maxInput)
                                    inputQt.setAttributeNode(valueInput)


                    let divItemContentSettingDel = document.createElement("div")

                    let classItemContentSettingDel = document.createAttribute("class")
                        classItemContentSettingDel.value = "cart__item__content__settings_delete"

                    divItemContentSettingDel.setAttributeNode(classItemContentSettingDel)

                                let paraDel = document.createElement("p")
                                let classParaDel = document.createAttribute("class")
                                    classParaDel.value = "deleteItem"

                                paraDel.setAttributeNode(classParaDel)

                                paraDel.textContent = "Supprimer"

                                sectionCartItems.append(article)
                                    article.append(divItemImg)
                                        divItemImg.append(img)
                                    article.append(divItemContent)
                                        divItemContent.append(divItemContentDescription)
                                            divItemContentDescription.append(h2)
                                            divItemContentDescription.append(paraColor)
                                            divItemContentDescription.append(paraPrice)
                                        divItemContent.append(divItemContentSetting)
                                            divItemContentSetting.append(divItemContentSettingQt)
                                                divItemContentSettingQt.append(paraQt)
                                                divItemContentSettingQt.append(inputQt)
                                            divItemContentSetting.append(divItemContentSettingDel)
                                                divItemContentSettingDel.append(paraDel)

                                                paraDel.addEventListener("click", function delCommand() 
                                                {
                        
                                                let idDel = article.dataset.id
                                                let colorDel = article.dataset.color
                        
                                                console.log(idDel, colorDel)
                        
                                                for( let i = 0; i < localStorage.length; i++){
                        
                                                let stokey = localStorage.key(i);
                                                let stoget = localStorage.getItem(stokey);
                                                let stockageObject = JSON.parse(stoget);
                        
                                                let idstorage = stockageObject.id;
                                                let colorstorage = stockageObject.couleur;
                        
                                                if ( idDel == idstorage && colorDel == colorstorage){
                        
                                                localStorage.removeItem(stokey);
                        
                        
                                                
                                                article.remove()
                                                divItemImg.remove()
                                                divItemContent.remove()
                                                img.remove()
                                                h2.remove()
                                                paraColor.remove()
                                                paraPrice.remove()
                                                divItemContentSetting.remove()
                                                divItemContentSettingDel.remove()
                                                divItemContentSettingQt.remove()
                                                paraQt.remove()
                                                inputQt.remove()
                                                paraDel.remove()
                                                    
                        
                                                }
                        
                                                }
                        
                                
                                
                        
                        
                                        
                        
                        
                        
                                })

                                totalQt = Number(totalQt)
                                quantiteStockage = Number(quantiteStockage)


                                totalQt = quantiteStockage + totalQt

                                let prixtotalproduit = quantiteStockage * infos.price
                                prixtotal = prixtotal + prixtotalproduit
                                spanTotalPrice.textContent = prixtotal

                                    

                               

                                spanQuantity.textContent = totalQt

                                inputQt.addEventListener("change", function qtChange () {
        
                                    console.log(totalQt)
                            
                                let newQT = inputQt.value
                            

                                prixtotal = prixtotal - prixtotalproduit

                                
                                totalQt = Number(totalQt)
                                quantiteStockage = Number(quantiteStockage)

                                totalQt = totalQt - quantiteStockage
                             
                                quantiteStockage = newQT

                                prixtotalproduit = quantiteStockage * infos.price
                                prixtotal = prixtotal + prixtotalproduit
                                spanTotalPrice.textContent = prixtotal



                                totalQt = Number(totalQt)
                                quantiteStockage = Number(quantiteStockage)

                                totalQt = totalQt + quantiteStockage

                            
                                spanQuantity.textContent = totalQt


        
                                
                                paraQt.textContent = "Qté : " + quantiteStockage

                                quantiteStockage = quantiteStockage.toString();
                                stockageObject.quantite = quantiteStockage

                                localStorage.setItem(stokey, JSON.stringify(stockageObject))

                            



                                return quantiteStockage
        
        
                                })



                                


                        })

          

    
    

    })
    




}

