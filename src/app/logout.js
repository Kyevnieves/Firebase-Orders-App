// FUNCION PARA CERRAR SESION
import { signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { auth } from './firebase.js'
const btnLogout = document.querySelector('#logout');
btnLogout.addEventListener('click', async (e)=>{
    e.preventDefault()
    let productList = document.querySelector('.product-list')
    if(productList !== null){
        productList.classList.add('displayNone')
    }
    let containerPedidos = document.querySelector('.containerPedidos');
    if(containerPedidos !== null){
        containerPedidos.classList.add('displayNone')
    }
    await signOut(auth)
})