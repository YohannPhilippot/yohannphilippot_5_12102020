const apiUrl = 'http://localhost:3000/api/teddies/';

//creation de la fonction createNewTag
function createNewTag (tagName, className, inner, parent, attributes) {
    const item = document.createElement(tagName)
    item.className = className
    item.innerHTML = inner
    for (const id in attributes) {
        item.setAttribute(id, attributes[id])
    }
    parent.appendChild(item)
    return item
}



async function createTeddiesCard(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddiesInfo = await res.json()
        console.log(teddiesInfo)

        for (let teddy of teddiesInfo) {
            //creation des cartes teddies avec la fonction createNewTag
                const itemRow = document.getElementById('itemList')
                const itemCol = createNewTag('div', 'col-lg-6 col-sm-4 mb-4', null, itemRow, null)
                const itemCard = createNewTag('div', 'card', null, itemCol, null)
                const itemImg = createNewTag('img', 'card-img-top img-responsive', null, itemCard, { 'src': teddy.imageUrl, 'alt': teddy.name })
                const itemTitle = createNewTag('h3', 'card-title text-center', teddy.name, itemCard, null)
                const itemPrice = createNewTag('div', 'card-body', teddy.price/100 + 'E', itemCard, null)
                const itemButton = createNewTag('a', 'btn btn-primary mx-auto mb-3', 'Personnaliser'+ ' ' + teddy.name, itemCard, { 'href': 'produit.html?id=' + teddy._id })                    
        }
    } else {
        console.error('Erreur:', response.status)
    }

}
//appel de la fonction createTeddiesCard sur apiUrl
createTeddiesCard(apiUrl)