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

const basePanier = document.getElementById('panierBase')
basePanier.classList.add('bg-secondary', 'jumbotron', 'px-5','mx-0')

async function createTeddyElement(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddy = await res.json()
        console.log(teddy)

        const itemRow = document.getElementById('panierContent')

        let teddiesToCart = JSON.parse(localStorage.getItem('cart'))
        if (teddiesToCart === null || teddiesToCart === undefined) {
            teddiesToCart = []
        }


        for (const itemInCart of teddiesToCart) {
            
            const newItemRow = createNewTag('article', 'row mb-3 p-4 bg-primary shadow-lg border border-dark rounded-lg', null, itemRow, null)
            const itemLink = createNewTag('a', 'col-4', null, newItemRow, {'href':'produit.html?id=' + itemInCart.id})
            const itemImg = createNewTag('img', 'mw-100 shadow-lg border border-dark rounded-lg', null, itemLink, {'src': itemInCart.img} )
            const itemName = createNewTag('div', 'col-8 col-xl-4 p-xl-5 my-1 my-xl-auto text-center text-xl-left font-weight-bold', itemInCart.name, newItemRow, null)
            const itemPrice = createNewTag('div', 'col-12 col-xl-6 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Prix: ' + itemInCart.price + '\u20ac', itemName, null)
            const itemQuantity = createNewTag('div', 'col-12 col-xl-6 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Quantité : ' + itemInCart.quantity , itemName, null)
            const totalPrice = createNewTag('div', 'col-6 col-md-4 mx-auto my-auto text-center bg-light border border-dark rounded-lg', 'Total article : ' + itemInCart.price * itemInCart.quantity + '\u20ac', newItemRow, null)
            const deleteItem = createNewTag('button', 'col-6 col-xl-2 offset-3 offset-xl-5 mt-3 text-center bg-light border border-dark rounded-lg', 'Retirer du panier', newItemRow, {'data-id': itemInCart.id})

            
            deleteItem.addEventListener('click', function (e) {
                const productInCart = teddiesToCart.filter(elem => elem.id == e.target.getAttribute('data-id'))[0]
                productInCart.quantity = 0
                const productIndex = teddiesToCart.indexOf(productInCart)
                teddiesToCart.splice(productIndex, 1)

                localStorage.setItem('cart', JSON.stringify(teddiesToCart))
                JSON.parse(localStorage.getItem('cart'))
                window.location.href = 'panier.html'
                
            })
        }

        if (teddiesToCart.length >= 1) {
            const clearCart = createNewTag('button', 'col-6 mx-auto', 'Vider le panier !', basePanier, null)

            clearCart.addEventListener('click', function () {
                localStorage.removeItem('cart')
                JSON.parse(localStorage.getItem('cart'))
                window.location.href = 'panier.html'
            })
        } else {
            const panierVide = createNewTag('div', 'col py-3 text-center shadow-lg bg-primary rounded-lg', 'Votre panier est vide ! :(', basePanier, null)
        }
        
        
        


    } else {
        console.error('Erreur:', response.status)
    }

}

createTeddyElement(apiUrl)