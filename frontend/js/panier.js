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


async function createTeddyElement(url) {
    //recuperation des donnees de l'api
    let res = await fetch(url)
    if (res.ok) {
        let teddy = await res.json()
        console.log(teddy)


        for (let i = 0; i < localStorage.length; i++) {
            const itemRow = document.getElementById('panierContent')
            const newItemRow = createNewTag('div', 'col-12', null, itemRow, null)
            const itemName = createNewTag('div', 'col-4', teddy.name, newItemRow, null)
            const itemPrice = createNewTag('div', 'col-4', teddy.price, newItemRow, null)
            const itemColor = createNewTag('div', 'col-4', teddy.colors, newItemRow, null)
        }



    } else {
        console.error('Erreur:', response.status)
    }

}