import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import {
    auth
} from './firebase.js'
import {
    showMessage
} from '../index.js'
//const googleBtn = document.querySelector('#googleLogin');
/* googleBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredentials = await signInWithPopup(auth, provider)
        const signinModal = document.querySelector('#modalIngresar');
        const modal = bootstrap.Modal.getInstance(signinModal);
        modal.hide()
        showMessage('Bienvenido!', 'success')
    } catch (error) {
        console.log(error)
    }

}) */