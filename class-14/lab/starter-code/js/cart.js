/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {

  // localData stores a cartItems array
  // for us to use Cart methods, we have to pass this array thru the Cart constructor

  var cartItems = JSON.parse(localStorage.getItem('localData')) || [];

  cart = new Cart(cartItems);
  
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {

  loadCart();
  clearCart();
  showCart();
  updateCounter();
}

// copy pasted from catalog.js
function updateCounter() {
  var span = document.getElementById('itemCount');
  span.textContent = ` (${cart.items.length})`;

}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  
  var table = document.getElementsByTagName('tbody')[0];

  while (table.hasChildNodes() === true) {
    var tableRow = table.firstChild;
    table.removeChild(tableRow);
  }

}
 
// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // get the table
  var table = document.getElementsByTagName('tbody')[0];
  // console.log('table, ', table);

  for (var i = 0; i < cart.items.length; i++){

    var trEl = document.createElement('tr');
    
    // create elements
    var tdElOne = document.createElement('td');
    var tdElTwo = document.createElement('td');
    var tdElThree = document.createElement('td');

    // give them data
    // delete link
    tdElOne.textContent = 'delete';

    // quantity
    tdElTwo.textContent = cart.items[i].quantity;

    // item name
    tdElThree.textContent = cart.items[i].product.name;

    // add to row
    trEl.appendChild(tdElOne);
    trEl.appendChild(tdElTwo);
    trEl.appendChild(tdElThree);

    //append to table
    table.appendChild(trEl);

  }

}


function removeItemFromCart(event) {

  // remove item from cart
  var clickedElement = event.target;
  var clickedName = clickedElement.nextSibling.nextSibling.textContent;

  // for each item
  for (var i = 0; i < cart.items.length; i++){
    
    // if it is the removed item
    if (cart.items[i].product.name === clickedName){
      // remove it
      var selectedItem = cart.items[i];
      cart.removeItem(selectedItem);
    }
  }

  // update local storage
  cart.saveToLocalStorage();
  
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
