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

//creation de la base du panier
const basePanier = document.getElementById('panierBase')
basePanier.classList.add('bg-secondary', 'jumbotron', 'px-5','mx-0')

async function createTeddyElement(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddy = await res.json()
        console.log(teddy)

        const itemRow = document.getElementById('panierContent')

        //creation des produits dans le panier
        let teddiesToCart = JSON.parse(localStorage.getItem('cart'))
        if (teddiesToCart === null || teddiesToCart === undefined) {
            teddiesToCart = []
        }

        for (const itemInCart of teddiesToCart) {
            
            const newItemRow = createNewTag('article', 'row mb-3 p-4 bg-primary shadow-lg border border-dark rounded-lg', null, itemRow, null)
            const itemLink = createNewTag('a', 'col-4', null, newItemRow, {'href':'produit.html?id=' + itemInCart.id})
            const itemImg = createNewTag('img', 'mw-100 shadow-lg border border-dark rounded-lg', null, itemLink, {'src': itemInCart.img} )
            const itemName = createNewTag('div', 'col-8 col-xl-4 p-xl-5 my-1 my-xl-auto text-center text-xl-left font-weight-bold', itemInCart.name, newItemRow, null)
            const itemPrice = createNewTag('div', 'col-12 col-xl-8 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Prix: ' + itemInCart.price + '\u20ac', itemName, null)
            const itemQuantity = createNewTag('p', 'col-12 col-xl-8 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Quantit' + '\u00e9'+' : ' + itemInCart.quantity , itemName, null)
            const totalPrice = createNewTag('div', 'col-6 col-md-4 mx-auto my-auto text-center bg-light border border-dark rounded-lg', 'Total article : ' + itemInCart.price * itemInCart.quantity + '\u20ac', newItemRow, null)
            const deleteItem = createNewTag('button', 'col-6 col-xl-2 offset-3 offset-xl-5 mt-3 text-center bg-light border border-dark rounded-lg', 'Retirer du panier', newItemRow, { 'data-id': itemInCart.id })
            
            
            
            //evenement suppression d'un produit
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
            //evenement suppression du panier
            clearCart.addEventListener('click', function () {
                localStorage.removeItem('cart')
                JSON.parse(localStorage.getItem('cart'))
                window.location.href = 'panier.html'
            })
            //creation d'un tableau pour stocker les prix * quantité de chaque produit
            const cartTotal = []
            for (itemInCart of teddiesToCart) {
                let itemPrice = itemInCart.price * itemInCart.quantity
                cartTotal.push(itemPrice)
            }

            //addition de toutes les valeurs du tableau avec .reduce
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let orderPrice = cartTotal.reduce(reducer)

            const cartPrice = createNewTag('div', 'col-12 mt-3 text-center', 'Montant de la commande : ' + orderPrice + '\u20ac', basePanier, null)

            //creation du formulaire de contact
            const contactForm = createNewTag('form', 'row py-3 my-5 bg-light', null, basePanier, { 'id': 'contactForm' })
            const formTitle = createNewTag('h2', 'col-12 pb-3 text-center bg-light', 'Veuillez remplir le formulaire pour valider la commande', contactForm, null)
            const form = document.querySelector('#contactForm')

            //fonction de validation de champ du formulaire
            function valid(input, regex, smallInner) {
                let regEx = new RegExp(
                    regex, 'g'
                )
                const result = regEx.test(input.value)

                let small = input.nextElementSibling
                if (result) {
                    input.classList.remove('bg-danger')
                    small.innerHTML = null
                } else {
                    input.classList.add('bg-danger')
                    
                    small.innerHTML = smallInner
                }
            }
            //element prenom
            const firstName = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const firstNameLabel = createNewTag('label', 'col-6', 'Pr' + '\u00e9' + 'nom', firstName, null)
            const firstNameInput = createNewTag('input', 'form-control col-6 mx-3', null, firstName, { 'name': 'prenom', 'type': 'text', 'placeholder': 'Michel', 'required': true })
            const firstNameError = createNewTag('small', 'col-6 text-danger', null, firstName, null)
            //validation du champ prenom
            form.prenom.addEventListener('change', function () {
                valid(this, '^[a-zA-Z.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules . , -' )               
            })
            //element nom
            const lastName = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const lastNameLabel = createNewTag('label', 'col-6', 'Nom', lastName, null)
            const lastNameInput = createNewTag('input', 'form-control col-6 mx-3', null, lastName, { 'name': 'nom', 'type': 'text', 'placeholder': 'Dupont', 'required': 'true' })
            const lastNameError = createNewTag('small', 'col-6 text-danger', null, lastName, null)
            //validation du champ nom
            form.nom.addEventListener('change', function () {
                valid(this, '^[a-zA-Z.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules . , -')
            })
            //element adresse
            const adress = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const adressLabel = createNewTag('label', 'col-6', 'Adresse', adress, null)
            const adressInput = createNewTag('input', 'form-control col-6 mx-3', null, adress, { 'name': 'adresse', 'type': 'text', 'placeholder': '10 rue des bois', 'required': true })
            const adressError = createNewTag('small', 'col-6 text-danger', null, adress, null)
            //validation du champ adresse
            form.adresse.addEventListener('change', function () {
                valid(this, '^[ 0-9a-zA-Z.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules, chiffres . , -')
            })
            //element ville
            const city = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const cityLabel = createNewTag('label', 'col-6', 'Code Postal et Ville', city, null)
            const cityInput = createNewTag('input', 'form-control col-6 mx-3', null, city, { 'name': 'ville', 'type': 'text', 'placeholder': '75000 Paris', 'required': true })
            const cityError = createNewTag('small', 'col-6 text-danger', null, city, null)
            //validation du champ ville
            form.ville.addEventListener('change', function () {
                valid(this, '^[0-9]{5}[ ][ 0-9a-zA-Z.,\-]+$', 'Veuillez entrer un code postal a 5 chiffres,un espace, et le nom de la ville')
            })
            //element adresse email
            const email = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const emailLabel = createNewTag('label', 'col-6', 'E-mail', email, null)
            const emailInput = createNewTag('input', 'form-control col-6 mx-3', null, email, { 'name': 'email', 'type': 'email', 'placeholder': 'dupont.michel@wanadoo.com', 'required': true })
            const emailError = createNewTag('small', 'col-6 text-danger', null, email, null)
            //validation du champ adresse email
            form.email.addEventListener('change', function () {
                valid(this, '^[0-9a-zA-Z.,\-]+[@]{1}[0-9a-zA-Z,\-]+[.]{1}[a-zA-Z]{1,10}$', 'Veuillez entrer une adresse mail valide')
            })

            const sendOrder = createNewTag('button', 'col-4 offset-4 my-3 rounded-lg', 'Passer commande !', contactForm, null)

        } else {
            const panierVide = createNewTag('div', 'col py-3 text-center shadow-lg bg-primary rounded-lg', 'Votre panier est vide ! :(', basePanier, null)
        }
        
        
        


    } else {
        console.error('Erreur:', response.status)
    }

}

createTeddyElement(apiUrl)