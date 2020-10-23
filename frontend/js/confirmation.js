const apiUrl = 'http://localhost:3000/api/teddies';

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

async function createConfirmation(url) {
    const confirmationRow = document.getElementById('recapOrder')

    const confirmationBg = createNewTag('div', 'col-6 mx-auto bg-secondary', null, confirmationRow, null)
    const confirmationTitle = createNewTag('h3', 'col-12 text-center bg-primary', 'Confirmation de votre commande :', confirmationBg, null)
    const confirmationId = createNewTag('div', 'col-12 text-center', 'Votre numéro de commande', confirmationBg, null)
    const confirmationTotalPrice = createNewTag('div', 'col-12 text-center', 'Montant total : ' + orderPrice, confirmationBg, null)
    const confirmationText = createNewTag('div', 'col-12 text-center', "Merci d'avoir commandé vos Teddies chez Orinoco !", confirmationBg, null)
    const backToIndex = createNewTag('button', 'col-6 mx-auto bg-primary', "Retour a l'accueil", confirmationBg, { 'href': 'index.html' })



}

createConfirmation(apiUrl + '/order')