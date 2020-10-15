const apiUrl = 'http://localhost:3000/api/teddies/';

//creation de la fonction createNewTag
function createNewTag(tagName, className, inner, parent, attributes) {
    const item = document.createElement(tagName)
    item.className = className
    item.innerHTML = inner
    for (const id in attributes) {
        item.setAttribute(id, attributes[id])
    }
    parent.appendChild(item)
    return item
}

const params = new URLSearchParams(location.search)
const id = params.get('id')

async function createTeddyElement(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddy = await res.json()
        console.log(teddy)


        //creation de la carte teddy avec la fonction createNewTag
        const itemRow = document.getElementById('itemChosen')
        const itemCol1 = createNewTag('div', 'col-md-8', null, itemRow, null)
        const itemImg = createNewTag('img', 'card-img-top img-responsive', null, itemCol1, { 'src': teddy.imageUrl, 'alt': teddy.name })
        const itemCol2 = createNewTag('div', 'col-md-4', null, itemRow, null)
        const itemTitle = createNewTag('h3', 'card-title text-center my-5', teddy.name, itemCol2, null)
        const itemDescription = createNewTag('div', 'col-12 text-center mb-5', teddy.description, itemCol2, null)
        const itemPrice = createNewTag('div', 'col-12 text-center mb-5', teddy.price / 100 + 'E', itemCol2, null)
        const itemColor = createNewTag('select', 'col-12 text-center mb-5', '', itemCol2, { 'id': 'colorSelect' })
        const itemButton = createNewTag('a', 'btn btn-primary col-12 mx-auto mb-3', 'Ajouter au panier', itemCol2, { 'href': '#' })


        //Remplissage balise select avec le tableau Colors de l'API
        const select = document.getElementById("colorSelect");
        for (let i = 0; i < teddy.colors.length; i++) {
            const colorChoice = createNewTag('option', '', teddy.colors[i], itemColor, null)
        }

       
    } else {
        console.error('Erreur:', response.status)
    }

}
//appel de la fonction createTeddiesCard sur apiUrl
createTeddyElement(apiUrl+id)
