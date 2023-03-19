const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedProducts = document.querySelectorAll('.onlyLogged');
const formularios = document.querySelectorAll('.formularios');
const productList = document.querySelectorAll('.product-list');

import { obtenerDatosUsuario, renderizarAdmin } from '../guardarTarea/firebase.js'
export const loginCheck = async user =>{
    if (user){
        loggedOutLinks.forEach(link =>{
            link.style.display = 'none';
        })
        loggedInLinks.forEach(link =>{
            link.style.display = 'block';
            link.classList.remove('displayNone')
        })
        loggedProducts.forEach(link =>{
            link.style.visibility = 'visible';
        })
        productList.forEach(products =>{
            products.classList.remove('displayNone')
        })
        const userData = await obtenerDatosUsuario(user.uid);
        if(userData.rol !== undefined){
        renderizarAdmin();
        }
    } else {
        loggedOutLinks.forEach(link =>{
            link.style.display = 'block';
        })
        loggedInLinks.forEach(link =>{
            link.style.display = 'none';
        })
        loggedProducts.forEach(link =>{
            link.style.visibility = 'hidden';
        })
        formularios.forEach(form =>{
            form.classList.remove('displayNone')
        })
        productList.forEach(products =>{
       //     products.classList.add('displayNone')
        })
    }
}