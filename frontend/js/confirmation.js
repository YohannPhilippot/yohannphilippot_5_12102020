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

async function createConfirmation(url) {
    const confirmationRow = document.getElementById('recapOrder')

    const orderId = localStorage.getItem('orderId')
    const orderPrice = localStorage.getItem('totalPrice')

    const confirmationBg = createNewTag('div', 'col-8 mx-auto px-0 bg-secondary', null, confirmationRow, null)
    const confirmationTitle = createNewTag('h3', 'col-12 mx-0 px-0 py-3 text-center bg-primary', 'Confirmation de votre commande :', confirmationBg, null)
    const confirmationId = createNewTag('div', 'col-12 my-3 text-center', 'Votre num' + '\u00e9' + 'ro de commande : ' + orderId, confirmationBg, null)
    const confirmationTotalPrice = createNewTag('div', 'col-12 my-3 text-center', 'Montant total de la commande : ' + orderPrice + ' \u20ac', confirmationBg, null)
    const confirmationText = createNewTag('div', 'col-12 my-3 text-center', "Merci d'avoir command\u00e9 vos Teddies chez Orinoco !", confirmationBg, null)
    const backToIndex = createNewTag('button', 'col-8 col-md-4 my-3 offset-2 offset-md-4 btn-primary', "Retour a l'accueil", confirmationBg, null)

    backToIndex.addEventListener('click', function () {
        document.location.href = 'index.html'
    })
}

createConfirmation(apiUrl + 'order')