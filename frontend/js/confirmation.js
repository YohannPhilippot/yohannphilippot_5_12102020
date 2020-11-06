//fonction asynchrone pour creer le visuel de la page de confirmation
async function createConfirmation(url) {
    const confirmationRow = document.getElementById('recapOrder')
    //recuperation du prix et du numero de commande
    const orderId = localStorage.getItem('orderId')
    const orderPrice = localStorage.getItem('totalPrice')
    //creation des elements
    const confirmationBg = createNewTag('div', 'col-8 mx-auto px-0 bg-secondary rounded-lg', null, confirmationRow, null)
    const confirmationTitle = createNewTag('h3', 'col-12 mx-0 px-0 py-3 text-center bg-primary rounded-lg', 'Confirmation de votre commande :', confirmationBg, null)
    const confirmationId = createNewTag('div', 'col-12 my-3 text-center', 'Votre num' + '\u00e9' + 'ro de commande : ' + orderId, confirmationBg, null)
    const confirmationTotalPrice = createNewTag('div', 'col-12 my-3 text-center', 'Montant total de la commande : ' + orderPrice + ' \u20ac', confirmationBg, null)
    const confirmationText = createNewTag('div', 'col-12 my-3 text-center', "Merci d'avoir command\u00e9 vos Teddies chez Orinoco !", confirmationBg, null)
    const backToIndex = createNewTag('button', 'col-8 col-md-4 my-3 offset-2 offset-md-4 btn-primary rounded-lg', "Retour a l'accueil", confirmationBg, null)

    //evenement click pour retourner a l'accueil
    backToIndex.addEventListener('click', function () {
        document.location.href = 'index.html'
    })
}
//appel de la fonction createConfirmation sur l'URL de l'API (+order)
createConfirmation(apiUrl + 'order')