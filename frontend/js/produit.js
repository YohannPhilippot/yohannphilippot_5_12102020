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

function cartCount() {
    const teddiesToCart = JSON.parse(localStorage.getItem('cart'))
    const itemsInCart = document.getElementById("itemsInCart")
    if (teddiesToCart) {
        const itemCount = teddiesToCart.reduce((sum, item) => sum += item.quantity, 0)
        const itemElement = createNewTag('span', 'col d-none d-lg-block bg-primary text-light px-2 rounded-circle', itemCount, itemsInCart, null)
    }
}

cartCount()

const params = new URLSearchParams(location.search)
const id = params.get('id')



async function createTeddyElement(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddy = await res.json()
        console.log(teddy)


        //creation de la carte du teddy choisi avec la fonction createNewTag
        const itemRow = document.getElementById('itemChosen')
        const itemCol1 = createNewTag('div', 'col-md-8 px-0', null, itemRow, null)
        const itemImg = createNewTag('img', 'card-img-top img-responsive', null, itemCol1, { 'src': teddy.imageUrl, 'alt': teddy.name })
        const itemCol2 = createNewTag('div', 'col-md-4 bg-secondary', null, itemRow, null)
        const itemTitle = createNewTag('h3', 'card-title text-center my-5', teddy.name, itemCol2, null)
        const itemDescription = createNewTag('div', 'col-12 text-center mb-5', teddy.description, itemCol2, null)
        const itemPrice = createNewTag('div', 'col-12 text-center mb-5', teddy.price / 100 + '\u20ac', itemCol2, null)
        const itemColor = createNewTag('select', 'col-12 text-center mb-5', '', itemCol2, { 'id': 'colorSelect' })
        const itemButton = createNewTag('a', 'btn btn-primary col-12 mx-auto mb-3', 'Ajouter au panier', itemCol2, { 'href': '#', 'id': 'addToCart'})

        //Remplissage balise select avec le tableau Colors de l'API
        const select = document.getElementById("colorSelect");
        for (const selectedColor of teddy.colors) {
            const colorChoice = createNewTag('option', null, selectedColor, itemColor, { 'value': selectedColor })
        }


        // ajout du teddy selectionné au localStorage

        const addToCart = document.getElementById("addToCart")
        addToCart.addEventListener('click', function () {

            let selectedTeddy = {
                name: teddy.name,
                id: teddy._id,
                price: teddy.price / 100,
                color: select.value,
                img: teddy.imageUrl,
                quantity: 1
            }
            console.log(selectedTeddy)

            let teddiesToCart = JSON.parse(localStorage.getItem('cart'))
            if (teddiesToCart === null || teddiesToCart === undefined) {
                teddiesToCart = []
            }

            if (teddiesToCart) {
                const productInCart = teddiesToCart.find(elem => elem.id == teddy._id && elem.color == select.value)
                if (productInCart === undefined) {
                    teddiesToCart.push(selectedTeddy)
                } else {
                    productInCart.quantity++
                }

                localStorage.setItem('cart', JSON.stringify(teddiesToCart))

                if (confirm(teddy.name + ' ' + 'a ete ajoute au panier! Souhaitez-vous passer commande?')) {
                    location.href = 'panier.html'
                }
                else {
                    location.href = 'index.html'
                }
              
            }
        }
        )
       
    } else {
        console.error('Erreur:', response.status)
    }

}
//appel de la fonction createTeddiesCard sur apiUrl+id
createTeddyElement(apiUrl+id)
