const apiUrl = 'http://localhost:3000/api/teddies/';

//creation de la fonction createNewTag pour creer des elements
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

//creation de cartCount pour compter le nombre de produits dans le panier
function cartCount() {
    const teddiesToCart = JSON.parse(localStorage.getItem('cart'))
    const itemsInCart = document.getElementById("itemsInCart")
    if (teddiesToCart) {
        const itemCount = teddiesToCart.reduce((sum, item) => sum += item.quantity, 0)
        const itemElement = createNewTag('span', 'col d-none d-lg-block bg-primary text-light px-2 rounded-circle', itemCount, itemsInCart, null)
    }
}

cartCount()