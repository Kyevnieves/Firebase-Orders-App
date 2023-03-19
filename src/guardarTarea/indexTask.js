import {
    saveTasks,
    realizarPedido,
    getTasks,
    onGetTask,
    deleteTask,
    getTask,
} from './firebase.js'
import {
    obtenerPedidosUsuario
} from '../guardarTarea/firebase.js'
import { productsInCart} from '../app/ShoppingCart/app.js'
import { showMessage } from '../index.js'
const btnPedido = document.querySelector('.btnPedido');
var id = '';

btnPedido.addEventListener('click', (e)=>{
    e.preventDefault()
    let containerPedidos = document.querySelector('.containerPedidos')
    let DOMuserName = document.querySelector('#profileUserName');
    let DOMuserID = document.querySelector('#profileUserID');
    let DOMuserDoc = document.querySelector('#profileDoc');
    let DOMtotalPedido = document.getElementById('cart-total-value').textContent;
    let totalPedido = Number(DOMtotalPedido)
    // Guardar Hora
    const accion = Date.now()
    const objAccion = new Date (accion)
    let pedido = JSON.stringify(productsInCart)
    realizarPedido(DOMuserDoc.value,objAccion,DOMuserName.value,pedido,totalPedido,DOMuserID.value)
    if(containerPedidos !== null){
    obtenerPedidosUsuario(DOMuserID.value)
    }
})