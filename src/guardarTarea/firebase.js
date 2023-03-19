// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { showMessage } from "../index.js";
import {
  getAuth,
  updateProfile,
  updateEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "VARIABLEDEENTORNO",
  authDomain: "VARIABLEDEENTORNO",
  projectId: "VARIABLEDEENTORNO",
  storageBucket: "VARIABLEDEENTORNO",
  messagingSenderId: "VARIABLEDEENTORNO",
  appId: "VARIABLEDEENTORNO",
};
const auth = getAuth();
const btnActualizarPerfil = document.getElementById("actualizarPerfil");
var editStatus = false;
var id = "";
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const saveTasks = (producto, cantidad, userID) => {
  addDoc(collection(db, "Pedidos"), {
    producto,
    cantidad,
    userID,
  });
};

export const realizarPedido = (
  doc,
  fecha,
  nameCliente,
  pedido,
  totalPedido,
  userID
) => {
  addDoc(collection(db, "Pedidos"), {
    doc,
    fecha,
    nameCliente,
    pedido,
    totalPedido,
    userID,
  });
};
export const guardarUsuario = async (documento, username, email, uid) => {
  await setDoc(doc(db, "Usuarios", uid), {
    documento: documento,
    name: username,
    email: email,
    uid: uid,
  });
};

export const obtenerDatosUsuario = async (uid) => {
  const docRef = await doc(db, "Usuarios", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
  /*if (docSnap.exists()) {
        console.log("informacion de usuario:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No hay informacion!");
    } */
};
export const obtenerPedidosUsuario = async (uid) => {
  let containerPedidos = document.querySelector(".contenedorPedidos");
  const q = query(collection(db, "Pedidos"), where("userID", "==", uid));
  const querySnapshot = await getDocs(q);
  let html = "";
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let pedido = doc.data();
    let timeStamp = pedido.fecha;
    // const date = timeStamp.toDate().toLocaleString()
    /////////////////////////////////////////
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const date = timeStamp.toDate().toLocaleDateString((undefined, options));
    /////////////////////////////////////////
    html += `<tr class="cell-1">
        <td class="text-center">
            <div class="toggle-btn btnVerPedido" data-id="${doc.id}" data-bs-toggle="modal"
            data-bs-target="#modalVerPedido">
                <div class="inner-circle" ></div>
            </div>
        </td>
        <td>${date}</td>
        <td>${pedido.doc}</td>
        <td><span class="badge btn-enviado">Enviado</span></td>
        <td>${pedido.totalPedido}</td>
        <td><i class="fas fa-backspace btn-eliminar-pedido" data-id="${doc.id}"></i></td>
    </tr>
        `;
  });
  /* html += `
         <div>
         <h3>${pedido.producto}</h3>
         <p>${pedido.cantidad}</p>
         <button class="btn-delete" data-id="${doc.id}">Delete</button>
         <button class="btn-edit" data-id="${doc.id}">Editar</button>
         </div>
    `*/
  containerPedidos.innerHTML = html;
  const btnsDelete = document.querySelectorAll(".btn-eliminar-pedido");
  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let ID = e.target.dataset.id;
      deleteTask(ID);
      const userID = document.querySelector("#profileUserID");
      obtenerPedidosUsuario(userID.value);
    });
  });

  const cProductsPedido = document.querySelector(".cProductsPedido");
  const btnsVerPedido = document.querySelectorAll(".btnVerPedido");
  btnsVerPedido.forEach(async (btn) => {
    btn.addEventListener("click", async (e) => {
      let ID = e.target.dataset.id;
      if (e.target.classList.contains("inner-circle")) {
        ID = e.target.parentElement.dataset.id;
      } else ID = e.target.dataset.id;
      let doc = await getTask(ID);
      let product = doc.data();
      let JsonDelPedido = JSON.parse(product.pedido);
      let html = "";
      JsonDelPedido.forEach((pedido) => {
        html += `
                <div class="singleProduct">
                <img class="productImg" src="${pedido.imgSrc}" alt="">
                    <div class="productInfo">
                <h1>${pedido.name}</h1>
                <h2>${pedido.price}</h2>
                <h3>${pedido.cantidad}</h3>
                    </div>
                </div>
                `;
      });
      cProductsPedido.innerHTML = html;
    });
  });
};
export const obtenerProductos = async () => {
  let containerProduct = document.querySelector(".product-list");
  const q = query(collection(db, "Productos"));
  const querySnapshot = await getDocs(q);
  let HTML = "";
  querySnapshot.forEach((doc) => {
    let product = doc.data();
    HTML += `
    <figure class="card card-product-grid card-lg product-img"><a href="#" class="img-wrap" data-abc="true"><img src="${product.urlImg}"></a>
      <figcaption class="info-wrap">
          <div class="row">
              <div class="col-md-9 col-xs-9">
              <a href="#" class="title product-name" data-abc="true">${product.nombre}</a>
              <span class="rated product-category">${product.codigo}</span>
              </div>
          </div>
      </figcaption>
          <div class="bottom-wrap-payment">
              <figcaption class="info-wrap">
              <div class="row">
              <div class="col-md-9 col-xs-9 displayFlex">
                  <a href="#" class="title product-price" data-abc="true">$${product.precio}</a>
                  <input type="number" value="1" class="inputCantidad"></div>
              </div>
              </figcaption>
          </div>
      <div class="bottom-wrap">
        <a class="btn btn-primary float-right add-to-cart-button" data-abc="true">Buy now</a>
      </div>
  </figure>
    `;
  });
  containerProduct.innerHTML = HTML;
};
export const obtenerPedidos = async () => {
  let containerPedidos = document.querySelector(".contenedorPedidos");
  const q = query(collection(db, "Pedidos"));
  const querySnapshot = await getDocs(q);
  let html = "";
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let pedido = doc.data();
    let timeStamp = pedido.fecha;
    // const date = timeStamp.toDate().toLocaleString()
    /////////////////////////////////////////
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const date = timeStamp.toDate().toLocaleDateString((undefined, options));
    /////////////////////////////////////////
    html += `<tr class="cell-1">
        <td class="text-center">
            <div class="toggle-btn btnVerPedido" data-id="${doc.id}" data-bs-toggle="modal"
            data-bs-target="#modalVerPedido">
                <div class="inner-circle" ></div>
            </div>
        </td>
        <td>${date}</td>
        <td>${pedido.doc}</td>
        <td><span class="badge btn-enviado">Enviado</span></td>
        <td>${pedido.totalPedido}</td>
        <td><i class="fas fa-backspace btn-eliminar-pedido" data-id="${doc.id}"></i></td>
    </tr>
        `;
  });
  /* html += `
         <div>
         <h3>${pedido.producto}</h3>
         <p>${pedido.cantidad}</p>
         <button class="btn-delete" data-id="${doc.id}">Delete</button>
         <button class="btn-edit" data-id="${doc.id}">Editar</button>
         </div>
    `*/
  containerPedidos.innerHTML = html;
  const btnsDelete = document.querySelectorAll(".btn-eliminar-pedido");
  btnsDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let ID = e.target.dataset.id;
      deleteTask(ID);
      const userID = document.querySelector("#profileUserID");
      obtenerPedidos();
    });
  });

  const cProductsPedido = document.querySelector(".cProductsPedido");
  const btnsVerPedido = document.querySelectorAll(".btnVerPedido");
  btnsVerPedido.forEach(async (btn) => {
    btn.addEventListener("click", async (e) => {
      let ID = e.target.dataset.id;
      if (e.target.classList.contains("inner-circle")) {
        ID = e.target.parentElement.dataset.id;
      } else ID = e.target.dataset.id;
      let doc = await getTask(ID);
      let product = doc.data();
      let JsonDelPedido = JSON.parse(product.pedido);
      let html = "";
      JsonDelPedido.forEach((pedido) => {
        html += `
                <div class="singleProduct">
                <img class="productImg" src="${pedido.imgSrc}" alt="">
                    <div class="productInfo">
                <h1>${pedido.name}</h1>
                <h2>${pedido.price}</h2>
                <h3>${pedido.cantidad}</h3>
                    </div>
                </div>
                `;
      });
      cProductsPedido.innerHTML = html;
    });
  });
};

btnActualizarPerfil.addEventListener("click", (e) => {
  e.preventDefault();
  let DOMdoc = document.querySelector("#profileDoc").value;
  let DOMuserName = document.querySelector("#profileUserName").value;
  let DOMuserEmail = document.querySelector("#profileEmail").value;
  let DOMuserID = document.querySelector("#profileUserID").value;
  updateProfile(auth.currentUser, {
    displayName: DOMuserName,
  })
    .then(() => {
      updateEmail(auth.currentUser, DOMuserEmail);
      guardarUsuario(DOMdoc, DOMuserName, DOMuserEmail, DOMuserID);
      // OCULTAR MODAL
      const modalPerfil = document.querySelector("#modalPerfil");
      const modal = bootstrap.Modal.getInstance(modalPerfil);
      modal.hide();
      // OCULTAR MODAL
      showMessage(`¡Credenciales actualizadas!`, "success");
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
});

export const getTasks = () => getDocs(collection(db, "Pedidos"));
export const onGetTask = (callback) =>
  onSnapshot(collection(db, "Pedidos"), callback);
export const deleteTask = (id) => deleteDoc(doc(db, "Pedidos", id));
export const deleteProduct = (id) => deleteDoc(doc(db, "Productos", id));
export const actualizarProduct = (id, nuevosDatos) =>
  updateDoc(doc(db, "Productos", id), nuevosDatos);
export const getTask = (id) => getDoc(doc(db, "Pedidos", id));
export const renderizarAdmin = () => {
  // RENDERIZAR LISTA DE ADMINISTRADOR
  let navbarAdmin = document.querySelector(".navbar-nav");
  let html = "";
  html = `<li class="nav-item logged-in btn-productosAdmin">
                <a class="nav-link">Productos admin</a>
            </li>
            <li class="nav-item logged-in btn-pedidosAdmin">
                <a class="nav-link">Pedidos admin</a>
            </li>
            <li class="nav-item logged-in btn-registrar">
                <a class="nav-link" data-bs-toggle="modal" data-bs-target="#modalPerfil">Perfil</a>
            </li>
            <li class="nav-item logged-in btn-cerrar-sesion">
                <a class="nav-link" href="#" id="logout">Cerrar sesion</a>
            </li>`;
  navbarAdmin.innerHTML = html;
  // RENDERIZAR LISTA DE ADMINISTRADOR

  // FUNCION VER PEDIDOS ADMINISTRADOR
  const btnPedidos = document.querySelector(".btn-pedidosAdmin");
  btnPedidos.addEventListener("click", async () => {
    let root = document.querySelector(".root");
    let html2 = "";
    html2 = `
  <div class="container containerPedidos logged-in">
        <h1>Pedidos</h1>
        <div class="d-flex justify-content-center row">
            <div class="col-md-10">
                <div class="rounded">
                    <div class="table-responsive table-borderless">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Ver</th>
                                    <th>Fecha</th>
                                    <th>Documento</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table-body contenedorPedidos">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
    root.innerHTML = html2;
    let uid = document.querySelector("#profileUserID");
    const userPedidos = await obtenerPedidos();
  });
  // FUNCION VER PRODUCTOS ADMINISTRADOR
  const btnProductos = document.querySelector(".btn-productosAdmin");
  btnProductos.addEventListener("click", async () => {
    let root = document.querySelector(".root");
    let html = "";
    html = `
  <div class="container containerProductos logged-in">
        <h1>Productos</h1>
        <button class="btn-primary btnCrearProducto" data-bs-toggle="modal" data-bs-target="#modalCrearProducto">Crear producto</button>
        <div class="d-flex justify-content-center row">
            <div class="col-md-10">
                <div class="rounded">
                    <div class="table-responsive table-borderless">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody class="table-body contenedorProductos">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
    root.innerHTML = html;
    obtenerProductos();
    //  let uid = document.querySelector('#profileUserID');
    //   const userPedidos = await obtenerPedidos()
  });
  // FUNCION PARA GUARDAR PRODUCTO
  const guardarProducto = async (codigo, nombre, precio, urlImg) => {
    await addDoc(collection(db, "Productos"), {
      codigo: codigo,
      nombre: nombre,
      precio: precio,
      urlImg: urlImg,
    });
  };
  const btnCrearProducto = document.getElementById("crearProducto");
  btnCrearProducto.addEventListener("click", (e) => {
    e.preventDefault();
    const productForm = document.getElementById("product-form");
    let codigo = productForm["productCod"].value;
    let nombre = productForm["productName"].value;
    let precio = productForm["productPrice"].value;
    // CREAR ESTRUCTURA DE LINK IMAGEN
    let url = window.location.href;
    let urlForm = productForm["productImg"].files[0].name;
    let urlImg = `${url}img/${urlForm}`;
    guardarProducto(codigo, nombre, precio, urlImg);
    const modalCrear = document.querySelector("#modalCrearProducto");
    const modal = bootstrap.Modal.getInstance(modalCrear);
    modal.hide();
    obtenerProductos();
    // OCULTAR MODAL
    showMessage(`¡Producto creado!`, "success");
  });
  // FUNCION PARA GUARDAR PRODUCTO
  // OBTENER PRODUCTOS CREADOS
  const obtenerProductos = async () => {
    let contenedorProductos = document.querySelector(".contenedorProductos");
    const q = query(collection(db, "Productos"));
    const querySnapshot = await getDocs(q);
    let html = "";
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let product = doc.data();
      html += `
            <tr class="cell-1">
            <td class='code'>${product.codigo}</td>
            <td class='name'>${product.nombre}</td>
            <td class='price'>${product.precio}</td>
            <td class='urlImg'>${product.urlImg}</td>
            <td><i class='bx bx-edit btnEditProduct' data-id='${doc.id}' data-bs-toggle="modal" data-bs-target="#modalEditarProducto"></i></td>
            <td><i class='bx bx-message-square-x btnDeleteProduct' data-id='${doc.id}'></i></td>
        </tr>
            `;
    });
    contenedorProductos.innerHTML = html;
    const btnDeleteProduct = document.querySelectorAll(".btnDeleteProduct");
    btnDeleteProduct.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let ID = e.target.dataset.id;
        deleteProduct(ID);
        obtenerProductos();
      });
    });
    const btnEditProduct = document.querySelectorAll(".btnEditProduct");
    btnEditProduct.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const ID = e.target.dataset.id;
        const ProductInfo = e.target.parentElement.parentElement;
        const formEdit = document.getElementById("edit-product-form");
        formEdit["productCod"].value =
          ProductInfo.querySelector(".code").textContent;
        formEdit["productName"].value =
          ProductInfo.querySelector(".name").textContent;
        formEdit["productPrice"].value =
          ProductInfo.querySelector(".price").textContent;
        formEdit["urlImg"].value =
          ProductInfo.querySelector(".urlImg").textContent;
        formEdit["editarProducto"].dataset.id = ID;
      });
    });
    const btnActualizarProduct = document.getElementById("editarProducto");
    btnActualizarProduct.addEventListener("click", (e) => {
      e.preventDefault();
      let Identificador = e.target.dataset.id;
      let formEdit = document.getElementById("edit-product-form");
      let cod = formEdit["productCod"].value;
      let name = formEdit["productName"].value;
      let price = formEdit["productPrice"].value;
      let urlImg = formEdit["urlImg"].value;
      //   let urlImg = ProductInfo.querySelector('.urlImg').textContent;
      actualizarProduct(Identificador, {
        codigo: cod,
        nombre: name,
        precio: price,
        urlImg: urlImg,
      });
      cod = "";
      name = "";
      price = "";
      urlImg = "";
      Identificador = "";
      const modalEditar = document.querySelector("#modalEditarProducto");
      const modal = bootstrap.Modal.getInstance(modalEditar);
      modal.hide();
      // OCULTAR MODAL
      showMessage(`¡Producto actualizado!`, "success");
    });
  };

  // FUNCION PARA CERRAR SESION
  const btnLogout = document.querySelector("#logout");
  btnLogout.addEventListener("click", async (e) => {
    e.preventDefault();
    let productList = document.querySelector(".product-list");
    if (productList !== null) {
      productList.classList.add("displayNone");
    }
    let containerPedidos = document.querySelector(".containerPedidos");
    if (containerPedidos !== null) {
      containerPedidos.classList.add("displayNone");
    }
    await signOut(auth);
  });
};

const btnPedidos = document.querySelector(".btn-pedidos");
btnPedidos.addEventListener("click", async () => {
  let root = document.querySelector(".root");
  let html2 = "";
  html2 = `
  <div class="container containerPedidos logged-in">
        <h1>Mis pedidos</h1>
        <div class="d-flex justify-content-center row">
            <div class="col-md-10">
                <div class="rounded">
                    <div class="table-responsive table-borderless">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Ver</th>
                                    <th>Fecha</th>
                                    <th>Documento</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table-body contenedorPedidos">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
  root.innerHTML = html2;
  let uid = document.querySelector("#profileUserID");
  const userPedidos = await obtenerPedidosUsuario(uid.value);
});
