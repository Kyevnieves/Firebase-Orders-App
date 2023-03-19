const url = "productos.xlsx";
const oReq = new XMLHttpRequest();
document.addEventListener('DOMContentLoaded', async () => {
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (e) {
    var info = readData();
    async function readData(){
      var arraybuffer = await oReq.response;
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i])
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary"
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var info = await XLSX.utils.sheet_to_json(worksheet, {
        raw: true
      })
      let Viveres = info.filter(p => p.DISPONIBLE == "1" && p.Categoria == "VIVERES");
      let ProductosNavBar = info.filter(p => p.DISPONIBLE == "1");
      let Agotados = info.filter(p => p.DISPONIBLE == "0");
      //  var MayoraMenor = info.sort((a,b)=> {return b.Precio - a.Precio})
      let htmlCarrousel = ""
      Viveres.forEach(product => {
        htmlCarrousel += `
                <div class = "product-item elementoCarruselProductos">
                <div class = "product-img">
                    <img src = "${product.ImgSrc}" alt="Super lomas express" class="remove_Bg fadeIn show-modal" loading="lazy">
                    <i class='bx bxs-package StatusPositivo' > Disponible</i>
                </div>
                <div class = "product-content">
                    <span class = "product-category">${product.Categoria}</span>
                    <h3 class = "product-name">${product.Nombre}</h3>
                    <p class = "product-price">${product.Precio}</p><span class="cart-item-price2">$</span>
                    <button class="add-to-cart-button">
                    <span class="add-to-cart">Comprar</span>
                      <span class="added-to-cart">Agregado</span>
                      <svg class="add-to-cart-box box-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
                      <svg class="add-to-cart-box box-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="2" fill="#ffffff"/></svg>
                      <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                      <svg class="tick" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>
                    </button>
                    <div class="number number2">
                      <span class="minus">-</span>
                      <input id="Cantidad" type="text" value="1" class="inputPesos" readonly="readonly"/>
                      <span class="plus">+</span>
                    </div>
                </div>
                </div>
                `;
      })
      carruselProductos.innerHTML = htmlCarrousel;

      let htmlNavBar = '';
      ProductosNavBar.forEach(product => {
        htmlNavBar += `
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
                      <input id="Cantidad" type="text" value="1" class="inputPesos" readonly="readonly">
                    </div>
                </div>
              </div>
                    `
      })
      navBarProducts.innerHTML = htmlNavBar;
    }
  }
  oReq.send();
})