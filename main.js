

if (document.readyState == "loading") {
   
    document.addEventListener("DOMContentLoaded", ready);

  } else {
    ready();
  }

  
  function ready() {
    let removeCartItemBtn = document.getElementsByClassName("btn-danger");
  
    for (let i = 0; i < removeCartItemBtn.length; i++) {
      let btn = removeCartItemBtn[i];
      btn.addEventListener("click", removeCartItem);
    }
    let quantityInput = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInput.length; i++) {
      let input = quantityInput[i];
      input.addEventListener("change", quantityChanged);
    }
  
  //   purchase btn
  
  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  
  
  
    // add To Cart btn
    let addToCartBtn = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCartBtn.length; i++) {
      let cartBtn = addToCartBtn[i];
      cartBtn.addEventListener("click", cartUpdate);
    }
  }
  
  
  // remove btn dry code
  function removeCartItem(event) {
    let btnclicked = event.target;
    btnclicked.parentElement.parentElement.remove();
    UpdateCartTotal();
  }
  
  // change quantity dry code
  function quantityChanged(e) {
    let input = e.target;
  
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    UpdateCartTotal();
  }
  
  //   addToCart function
  
  function cartUpdate(e) {
    let button = e.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("shop-item-title")[0].textContent;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].textContent;
    let imgSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  
    addItemToCart(title, price, imgSrc);
   UpdateCartTotal()
  }
  
  // purchase function and cleanUp the cart after purchase
  function purchaseClicked(){
      alert('Thank you for your purchase');
      let cartItems = document.getElementsByClassName('cart-items')[0];
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild)
      }
      UpdateCartTotal();
  }
  
  //   addItemToCart method
  
  function addItemToCart(title, price, imgSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName("cart-items")[0];
  
  //   getting items names and giving an alert if already added
  let  cartItemsNames = document.getElementsByClassName('cart-item-title');
  for (let i= 0; i< cartItemsNames.length; i++) {
      if(cartItemsNames[i].textContent == title){
          alert('This item is already added to cart');
          return;
      }
     
  }
    let cartRowContent = `
    
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  
      `
     
      cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
  }
  
  // updatecartTotal
  function UpdateCartTotal() {
    // finding every single row and for total
    let cartContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0];
      let quantityEl = cartRow.getElementsByClassName("cart-quantity-input")[0];
      let price = priceElement.textContent.replace("$", "");
      let quantity = quantityEl.value;
      total = total + price * quantity;
    }
    // rounding of the total
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].textContent =
      "$" + total;
  }
