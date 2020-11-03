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
            
            const newItemRow = createNewTag('article', 'row mb-5 p-4 bg-basket shadow-lg border border-dark rounded-lg', null, itemRow, null)
            const itemLink = createNewTag('a', 'col-4', null, newItemRow, {'href':'produit.html?id=' + itemInCart.id})
            const itemImg = createNewTag('img', 'mw-100 shadow border border-dark rounded-lg', null, itemLink, {'src': itemInCart.img} )
            const itemName = createNewTag('div', 'col-8 col-xl-4 p-xl-5 my-1 my-xl-auto text-center text-xl-left font-weight-bold', itemInCart.name + ' (' + itemInCart.color + ')', newItemRow, null)
            const itemPrice = createNewTag('div', 'col-12 col-xl-8 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Prix: ' + itemInCart.price + '\u20ac', itemName, null)
            const itemQuantity = createNewTag('p', 'col-12 col-xl-8 my-1 my-xl-3 bg-light border border-dark rounded-lg', 'Quantit' + '\u00e9'+' : ' + itemInCart.quantity , itemName, null)
            const totalPrice = createNewTag('div', 'col-12 col-xl-6 col-md-4 mx-auto my-auto text-center bg-light border border-dark rounded-lg', 'Total article : ' + itemInCart.price * itemInCart.quantity + '\u20ac', newItemRow, null)
            const deleteItem = createNewTag('button', 'col-12 col-lg-6 col-xl-2 offset-lg-3 offset-xl-5 mt-3 text-center bg-light border border-dark rounded-lg', 'Retirer du panier', newItemRow, { 'data-id': itemInCart.id })
            
            
            
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
            const clearCart = createNewTag('button', 'col-6 mx-auto btn-danger', 'Vider le panier !', basePanier, null)
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

            const cartPrice = createNewTag('div', 'col-12 mt-3 text-center font-weight-bold h2', 'Montant de la commande : ' + orderPrice + '\u20ac', basePanier, null)

            //creation du formulaire de contact
            const contactForm = createNewTag('form', 'row py-3 my-5 bg-light', null, basePanier, { 'id': 'contactForm' })
            const formTitle = createNewTag('h2', 'col-12 pb-3 h5 text-center bg-light', 'Veuillez remplir le formulaire pour valider la commande', contactForm, null)
            const form = document.querySelector('#contactForm')


            let testFirstname = false
            let testLastName = false
            let testAddress = false
            let testCity = false
            let testEmail = false

           
            //fonction de validation de champ du formulaire
            function valid(input, regex, smallInner, testValid) {
                let regEx = new RegExp(
                    regex, 'g'
                )
                const result = regEx.test(input.value)

                let small = input.nextElementSibling
                
                if (result) {
                    input.classList.remove('bg-danger')
                    small.innerHTML = null
                    testValid = true                  
                    
                } else {
                    input.classList.add('bg-danger')
                    small.innerHTML = smallInner
                    testValid = false
                    
                }
                return testValid
                
                
            }
            //fonction d'activation du bouton de soumission du formulaire
            function enableButton() {
                if (testFirstname && testLastName && testAddress && testCity && testEmail) {
                    console.log('test MAIL' + testEmail)
                    enable = document.getElementById('submitButton')
                    enable.removeAttribute("disabled")
                } else {
                    enable = document.getElementById('submitButton')
                    enable.setAttribute("disabled", true)
                }
            }

            //element prenom
            const firstName = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const firstNameLabel = createNewTag('label', 'col-lg-6', 'Pr' + '\u00e9' + 'nom', firstName, null)
            const firstNameInput = createNewTag('input', 'form-control col-lg-6 mx-lg-3', null, firstName, { 'name': 'prenom', 'type': 'text', 'placeholder': 'Michel', 'required': true })
            const firstNameError = createNewTag('small', 'col-lg-6 text-danger', null, firstName, null)
            //validation du champ prenom
            form.prenom.addEventListener('change', function () {
                var validFirstName = valid(this, '^[a-zA-Z\u00C0-\u017F.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules . , -', testFirstname)                        
                testFirstname = validFirstName    
                enableButton()
            })
            //element nom
            const lastName = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const lastNameLabel = createNewTag('label', 'col-lg-6', 'Nom', lastName, null)
            const lastNameInput = createNewTag('input', 'form-control col-lg-6 mx-lg-3', null, lastName, { 'name': 'nom', 'type': 'text', 'placeholder': 'Dupont', 'required': 'true' })
            const lastNameError = createNewTag('small', 'col-lg-6 text-danger', null, lastName, null)
            //validation du champ nom
            form.nom.addEventListener('change', function () {
                var validLastName = valid(this, '^[a-zA-Z\u00C0-\u017F.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules . , -', testLastName)
                testLastName = validLastName
                enableButton()
            })
            //element adresse
            const adress = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const adressLabel = createNewTag('label', 'col-lg-6', 'Adresse', adress, null)
            const adressInput = createNewTag('input', 'form-control col-lg-6 mx-lg-3', null, adress, { 'name': 'adresse', 'type': 'text', 'placeholder': '10 rue des bois', 'required': true })
            const adressError = createNewTag('small', 'col-lg-6 text-danger', null, adress, null)
            //validation du champ adresse
            form.adresse.addEventListener('change', function () {
                var validAdress = valid(this, '^[ 0-9a-zA-Z\u00C0-\u017F.,\-]+$', 'Caract' + '\u00e8' + 'res accept' + '\u00e9' + 's: minuscules, majuscules, chiffres . , -', testAddress)
                testAddress = validAdress
                enableButton()
            })
            //element ville
            const city = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const cityLabel = createNewTag('label', 'col-lg-6', 'Code Postal et Ville', city, null)
            const cityInput = createNewTag('input', 'form-control col-lg-6 mx-lg-3', null, city, { 'name': 'ville', 'type': 'text', 'placeholder': '75000 Paris', 'required': true })
            const cityError = createNewTag('small', 'col-lg-6 text-danger', null, city, null)
            //validation du champ ville
            form.ville.addEventListener('change', function () {
                var validCity = valid(this, '^[0-9]{5}[ ][ 0-9a-zA-Z\u00C0-\u017F.,\-]+$', 'Veuillez entrer un code postal a 5 chiffres,un espace, et le nom de la ville', testCity)
                testCity = validCity
                enableButton()
            })
            //element adresse email
            const email = createNewTag('div', 'form-group col-12', null, contactForm, null)
            const emailLabel = createNewTag('label', 'col-lg-6', 'E-mail', email, null)
            const emailInput = createNewTag('input', 'form-control col-lg-6 mx-lg-3', null, email, { 'name': 'email', 'type': 'email', 'placeholder': 'dupont.michel@wanadoo.com', 'required': true })
            const emailError = createNewTag('small', 'col-lg-6 text-danger', null, email, null)
            //validation du champ adresse email
            form.email.addEventListener('change', function () {
                var validEmail = valid(this, '^[0-9a-zA-Z\u00C0-\u017F.,\-]+[@]{1}[0-9a-zA-Z,\-]+[.]{1}[a-zA-Z]{1,10}$', 'Veuillez entrer une adresse mail valide', testEmail)
                testEmail = validEmail
                enableButton()
            })


            

            

            const sendOrder = createNewTag('button', 'col-10 offset-1 col-md-4 offset-md-4 my-3 rounded-lg', 'Passer commande !', contactForm, { 'id':'submitButton', 'href': '/confirmation.html', 'type': 'button', 'disabled': 'true' })
            

            sendOrder.addEventListener('click', function () {

                
                //creation de l'objet contact
                let contact = {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    address: adressInput.value,
                    city: cityInput.value,
                    email: emailInput.value
                }

                //creation du tableau de produit
                let products = []
                for (itemInCart of teddiesToCart) {
                    let productsId = itemInCart.id
                    products.push(productsId)               
                }

                //creation d'un objet regroupant contact et products
                const data = {
                    contact,
                    products
                }

                //envoi des données au serveur avec une requête POST
                const jsonData = JSON.stringify(data)
                
                const options = {
                    method: 'POST',
                    body: jsonData,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                

                fetch(apiUrl + 'order', options)
                    .then(res => res.json())
                    .then(res => localStorage.setItem('orderId', res.orderId))

                localStorage.setItem('totalPrice', orderPrice)
                document.location.href = 'confirmation.html'

                localStorage.removeItem('cart')
            })
            const footer = document.querySelector('footer')
            console.log(footer)
            footer.classList.remove('footer')

        } else {
            const panierVide = createNewTag('h3', 'col py-3 text-center shadow-lg bg-primary rounded-lg', 'Votre panier est vide ! :(', basePanier, null)
            
            
        }
        
        
        


    } else {
        console.error('Erreur:', response.status)
    }

}

createTeddyElement(apiUrl)