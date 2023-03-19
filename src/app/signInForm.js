import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import {
    auth,
} from './firebase.js'
import {
    showMessage
} from '../index.js'
import {
    obtenerDatosUsuario,
    obtenerPedidosUsuario,
    renderizarAdmin
} from '../guardarTarea/firebase.js'


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let loader = document.querySelector('.lds-ripple');
    const email = loginForm["login-email"].value
    const password = loginForm["login-password"].value
    try {
        loader.classList.remove('displayNone')
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        const uid = userCredentials.user.uid;
        const userData = await obtenerDatosUsuario(uid)
    //    const userPedidos = await obtenerPedidosUsuario(uid)
        if(userData.rol !== undefined){
            renderizarAdmin();
        }
        const username = userData.name;
        const userEmail = userData.email;
        const userId = userData.uid;
        const userDoc = userData.documento;
        const formularios = document.querySelector('.formularios')
        let DOMuserName = document.querySelector('#profileUserName');
        let DOMuserEmail = document.querySelector('#profileEmail');
        let DOMuserID = document.querySelector('#profileUserID');
        let DOMdoc = document.querySelector('#profileDoc');      
        DOMuserName.value = username;
        DOMuserEmail.value = userEmail;
        DOMuserID.value = userId;
        DOMdoc.value = userDoc;
        // OCULTAR MODAL
      //  const signinModal = document.querySelector('#modalIngresar');
      //  const modal = bootstrap.Modal.getInstance(signinModal);
      //  modal.hide()
        // OCULTAR MODAL
        // MOSTRAR MENSAJE A USUARIO
        formularios.classList.add('displayNone')
        loader.classList.add('displayNone')
        showMessage(`¡Bienvenido! ${username}`, 'success')
        // LIMPIAR CAMPOS FORMULARIO
        document.getElementById('login-email').value = "";
        document.getElementById('login-password').value = "";
    } catch(error) {
        if(error.code === "auth/wrong-password"){
            loader.classList.add('displayNone')
            showMessage('Contraseña incorrecta','error')
        }
        if(error.code === "auth/user-not-found"){
            loader.classList.add('displayNone')
            showMessage('Correo electronico no existe','error')
        }
        console.log(error.code)
    }

})