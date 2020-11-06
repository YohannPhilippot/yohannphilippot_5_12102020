async function createTeddiesCard(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddiesInfo = await res.json()
        console.log(teddiesInfo)

        for (let teddy of teddiesInfo) {
            //creation des cartes teddies avec la fonction createNewTag
            const itemRow = document.getElementById('itemList')
            const itemCol = createNewTag('div', 'col-md-6 col-lg-5 col-sm-4 mb-4', null, itemRow, null)
            const itemCard = createNewTag('div', 'card cardsize shadow', null, itemCol, null)
            const itemImgContainer = createNewTag('div', 'cardImgSize', null, itemCard, null)
            const itemImg = createNewTag('img', 'card-img-top img-responsive', null, itemImgContainer, { 'src': teddy.imageUrl, 'alt': teddy.name })
            const itemTitle = createNewTag('h3', 'card-title text-center', teddy.name, itemCard, null)
            const itemPrice = createNewTag('div', 'card-body', teddy.price / 100 + '\u20ac', itemCard, null)
            const itemButton = createNewTag('a', 'btn btn-primary mx-auto mb-3', 'Personnaliser'+ ' ' + teddy.name, itemCard, { 'href': 'produit.html?id=' + teddy._id })                    
        }
    } else {
        console.error('Erreur:', response.status)
    }

}
//appel de la fonction createTeddiesCard sur apiUrl
createTeddiesCard(apiUrl)