export var productsInCart = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.querySelector('.cartContainer');
const cartList = document.querySelector('.ProductList');
const cartTotalValue = document.getElementById('cart-total-value'); 
const cartBtn = document.querySelector('.cart-btn');
const tasaDolar = 11.5;
const btnCloseCart = document.querySelector('.bx-exit');

const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;
eventListeners();

btnCloseCart.addEventListener('click', (e)=>{
    e.preventDefault
    cartContainer.classList.remove('show-cart')
})

function showMessage(message, type){
    Toastify({
        text: message,
        duration: 2000,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success" ? "green" : "red"
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

cartBtn.addEventListener('click', (e)=>{
    e.preventDefault
    cartContainer.classList.add('show-cart')
})

function eventListeners(){
window.addEventListener('DOMContentLoaded', () => {
    loadCart();
});
}
cartList.addEventListener('click', deleteProduct);

function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
  //  cartTotalValue2.textContent = cartInfo.total;
    productsInCart = JSON.parse(localStorage.getItem('products'));
}

export function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-button')){
        showMessage(`¡Añadido al carrito!`, 'success')
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}
// get product info after add to cart button click
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent,
        cantidad: parseFloat(product.querySelector('.inputCantidad').value).toFixed(2),
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('singleProduct');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    <img class="productImg" src="${product.imgSrc}" alt="">
    <div class="productInfo">
        <h1>${product.name}</h1>
        <h2>${product.price.substr(1)*product.cantidad}$</h2>
        <h3>${product.cantidad}</h3>
        <button class="btnEliminarProducto"><i class='bx bxs-trash-alt'></i></button>
    </div>
    `;
    cartList.appendChild(cartItem);
}


function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
    
}

function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    // calculate and update UI of cart info 
    updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing dollar sign
        let cantidad = parseFloat(product.cantidad).toFixed(2);
        let TotalPrice = cantidad *= price;
        return acc += TotalPrice;
    }, 0); // adding all the prices

    return{
       // total2: (total*tasaDolar).toFixed(2),
        total: total.toFixed(2),
        productCount: products.length
    }
}

function deleteProduct(e){
    let cartItem;
    if (e.target.tagName === "BUTTON"){
    cartItem = e.target.parentElement.parentElement;
    }
    else if (e.target.tagName === "I"){
    cartItem = e.target.parentElement.parentElement.parentElement;
    }
    cartItem.remove();
    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();

}
