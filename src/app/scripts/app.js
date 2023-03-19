// variables and constant
var productsInCart = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const productListCarrusel = document.querySelector('.product-list-Carrusel');
const navBarProducts = document.querySelector('.product-list-Nav-Bar');
const navHamburger = document.querySelector('.nav-bar-toggler');
const carruselProductos = document.querySelector('.carruselProductos');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartTotalValue2 = document.getElementById('cart-total-value2');
const cartTotalValueBs = document.getElementById('cart-total-valueBs');
const cartCountInfo = document.getElementById('cart-count-info');
const btn_EliminarFiltro = document.querySelector('.btn_EliminarFiltro');
const btn_filtro = document.querySelector('.btn_filtro');
const btn_enviar_pedido = document.querySelector('.btn_enviar_pedido');
const btn_unidad_mas = document.querySelector('plus');
const input_cantidad = document.querySelector('#Cantidad');
const input_cantidades = document.querySelectorAll('#Cantidad').value;
const Buscador = document.getElementById('buscador');
const xBuscador = document.querySelector('.xBuscador');
const xBuscadorNav = document.querySelector('.xBuscadorNav');
const cartBtn = document.getElementById('cart-btn');
const tasaDolar = 9.4;
const prueba = document.querySelector('.nav-bar-brand');

let cartItemID = 1;
eventListeners();
// all event listeners
function eventListeners(){
    window.addEventListener('load', ()=>{
        preloader = document.querySelector('.preloader');
        preloader.style.display = "none";
    })


  /*  navHamburger.addEventListener('click', ()=>{

            oReq.open("GET", url, true);
            oReq.responseType = "arraybuffer";
            oReq.onload = function(e){
                var info = readData();
                function readData(){
                    var arraybuffer = oReq.response;
                    var data = new Uint8Array(arraybuffer);
                    var arr = new Array();
                    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i])
                    var bstr = arr.join("");
                    var workbook = XLSX.read(bstr, {type:"binary"});
                    var first_sheet_name = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[first_sheet_name];
                    var info = XLSX.utils.sheet_to_json(worksheet, {raw:true})
                    let Disponibles = info.filter(p => p.DISPONIBLE == "1");
                  //  var MayoraMenor = info.sort((a,b)=> {return b.Precio - a.Precio})
                    let html = '';
                    Disponibles.forEach(product => {
                    html += `
                    <div class="product-item-nav-bar articulo" id="DisplayNone">
                    <div class="product-img-nav-Bar">
                      <img src="${product.ImgSrc}" alt="Super lomas express" class="remove_Bg fadeIn show-modal" loading="lazy">
                    </div>
                    <div class="product-content-nav-Bar">
                      <span class="product-category" style="display:none;">${product.Categoria}</span>
                      <h3 class="product-name" style="font-size:.9rem">${product.Nombre}</h3>
                      <p class="product-price" style="font-size: 1rem;">${product.Precio}</p><span class="cart-item-price2">$</span>
                    </div>
                    <div class="botones">
                      <button class="add-to-cart-button" style="height: 35px; width: 60px; top: 60px;">
                      <svg class="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"></rect></svg>
                      <svg class="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"></rect></svg>
                      <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                      <svg class="tick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"></path><path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"></path></svg>
                    </button>
                    <div class="number number2" id="inputNumber">
                      <input id="Cantidad" type="text" value="1">
                    </div>
                </div>
              </div>
                    `
                })
                navBarProducts.innerHTML = html;
                }
              }
            oReq.send();
    })
    */
    window.addEventListener('DOMContentLoaded', () => {
        loadCart();
    });
    // toggle nav-bar when toggle button is clicked
    document.querySelector('.nav-bar-toggler').addEventListener('click', () => {
        navBar = document.querySelector('.nav-bar-collapse');
        navBarToggler = document.querySelector('.nav-bar-toggler');
        let Carrito = document.querySelector('.cart-container');
        navBar.classList.toggle('show-nav-bar');
        navBarToggler.classList.toggle('is-active');
        if(Carrito.classList.contains('show-cart-container')){
            Carrito.classList.toggle('show-cart-container')
        }
    });

    // show/hide cart container
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
        navBar = document.querySelector('.nav-bar-collapse');
        navBarToggler = document.querySelector('.nav-bar-toggler');
        if(navBar.classList.contains('show-nav-bar')){
            navBar.classList.remove('show-nav-bar');
            navBarToggler.classList.remove('is-active')
        }
    });

    // add to cart
    productListCarrusel.addEventListener('click', purchaseProduct);
    navBarProducts.addEventListener('click', purchaseProductNavBar);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// update cart info
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
  //  cartTotalValue2.textContent = cartInfo.total;
    cartTotalValueBs.textContent = cartInfo.total2;
    productsInCart = JSON.parse(localStorage.getItem('products'));
}

// load product items content form JSON file
// purchase product
function purchaseProductNavBar(e){
    if(e.target.classList.contains('add-to-cart-button')){
        let product = e.target.parentElement.parentElement;
        getProductInfoNavBar(product);
        addToCartButton = e.target
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
    }
    if(e.target.classList.contains('add-to-cart')){
        let product = e.target.parentElement.parentElement.parentElement;
        getProductInfoNavBar(product);
        addToCartButton = e.target.parentElement
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
    }
    if(e.target.classList.contains('cart-icon')){
        let product = e.target.parentElement.parentElement.parentElement;
        getProductInfoNavBar(product);
        addToCartButton = e.target.parentElement
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
    }
}
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-button')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
        addToCartButton = e.target
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
    }
    if(e.target.classList.contains('add-to-cart')){
        let product = e.target.parentElement.parentElement.parentElement;
        getProductInfo(product);
        addToCartButton = e.target.parentElement
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
    }
    if(e.target.classList.contains('cart-icon')){
        let product = e.target.parentElement.parentElement.parentElement;
        getProductInfo(product);
        addToCartButton = e.target.parentElement
        addToCartButton.classList.add('added');
        cartBtn.classList.toggle('shake');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 1000);
        setTimeout(function(){
            cartBtn.classList.remove('shake');
        }, 500);
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
        cantidad: parseFloat(product.querySelector('#Cantidad').value).toFixed(2),
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}
// get product info after add to cart button click
function getProductInfoNavBar(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img-nav-Bar img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent,
        cantidad: parseFloat(product.querySelector('#Cantidad').value).toFixed(2),
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}
// add the selected product to the cart list
function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image" class="remove_Bg">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-price">${(product.price*product.cantidad).toFixed(2)}</span><span class="cart-item-price2">$</span>
            <div class="number">
	            <input class="inputCart" id="Cantidad" type="text" value="${(product.cantidad)}"/>
              </div>
        </div>

        <button type = "button" class = "cart-item-del-btn">
        <i class='bx bx-x'></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// save the product in the local storage
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// get all the products info if there is any in the local storage
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
    
}

// load carts product
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
        let price = parseFloat(product.price.substr(0)); // removing dollar sign
        cantidad = parseFloat(product.cantidad).toFixed(2);
        let TotalPrice = cantidad *= price;
        return acc += TotalPrice;
    }, 0); // adding all the prices

    return{
        total2: (total*tasaDolar).toFixed(2),
        total: total.toFixed(2),
        productCount: products.length
    }
}
// delete product from cart list and local storage
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.classList.add('fadeRight');
        setTimeout(function(){
            cartItem.remove();
        }, 500);
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.classList.add('fadeRight');
        setTimeout(function(){
            cartItem.remove();
        }, 500);
        // this removes from the DOM only
        
    }
    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}

addToCartButton = document.querySelectorAll(".add-to-cart-button");

document.querySelectorAll('.add-to-cart-button').forEach(function(addToCartButton) {
    addToCartButton.addEventListener('click', function() {
        addToCartButton.classList.add('added');
        setTimeout(function(){
            addToCartButton.classList.remove('added');
        }, 2000);
    });
});