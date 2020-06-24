/* global Product, Cart */
'use strict';
// Set up a cart for use on this page.
var cart;
// if localData has no existing info create new cart
if (localStorage.getItem('localData') === null) {
    cart = new Cart([]);
} else {
    // otherwise populate it with the existing cart items
    var cartItems = JSON.parse(localStorage.getItem('localData'));
    cart = new Cart(cartItems);
    // and update the preview
    updateCounter();
}

function populateForm() {
    //TODO: Add an <option> tag inside the form's select for each product
    var selectElement = document.getElementById('items');
    for (var i in Product.allProducts) {
        //element.appendChild(aChild);
        var o = document.createElement('option');
        o.value = Product.allProducts[i].name;
        o.textContent = Product.allProducts[i].name;
        selectElement.appendChild(o);
    }
}

function handleSubmit(event) {
    //prevent default behavior
    event.preventDefault();
    // TODO: Prevent the page from reloading
    // Do all the things ...
    addSelectedItemToCart();
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();
}
// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
    // TODO: suss out the item picked from the select list
    var productName = event.target.items.value;
    var selectedProduct;
    for (var i = 0; i < Product.allProducts.length; i++) {
        // console.log('test');
        if (productName === Product.allProducts[i].name) {
            // console.log('match');
            selectedProduct = Product.allProducts[i];
        }
    }
    // TODO: get the quantity
    var quantity = event.target.quantity.value;
    // console.log(selectedProduct);
    // console.log(quantity);
    // TODO: using those, add one item to the Cart
    cart.addItem(selectedProduct, quantity);
    console.log('cart: ', cart);
}
// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
    var span = document.getElementById('itemCount');
    span.textContent = ` (${cart.items.length})`;
}
// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
    var selectElement = document.getElementById('cartContents');
    var itemName = cart.items[cart.items.length - 1].product.name;
    var itemQuantity = cart.items[cart.items.length - 1].quantity;
    var p = document.createElement('p');
    p.value = itemName;
    p.textContent = `Item: ${itemName} | Amount: ${itemQuantity}`;
    selectElement.appendChild(p);
}
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);
populateForm();