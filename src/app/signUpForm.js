import { getAuth, createUserWithEmailAndPassword, updateProfile,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import { auth} from './firebase.js'
import { showMessage} from '../index.js'
import { guardarUsuario} from '../guardarTarea/firebase.js  '
// const signupForm = document.getElementById('signup-form');
const btnSignUp = document.getElementById('btnSignUp');

btnSignUp.addEventListener('click', async (e)=>{
    e.preventDefault()
    const signupForm = e.target.parentElement.parentElement;
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value
    const userName = signupForm['signup-username'].value
    const documento = signupForm['signup-document'].value
    console.log(email);
    try{
        const auth = getAuth();
        const credencialesDeUsuario = await createUserWithEmailAndPassword(auth, email, password)
        const uid = credencialesDeUsuario.user.uid;
        const formularios = document.querySelector('.formularios')
        formularios.classList.add('displayNone')
        showMessage(`!Bienvenido! ${userName}`,'success')
        guardarUsuario(documento, userName, email, uid);
        updateProfile(auth.currentUser, {
            displayName: userName,
        }).then(()=>{
            
        })
      //  const signupModal = document.querySelector('#modalRegistrar');
      //  const modal = bootstrap.Modal.getInstance(signupModal);
      //  modal.hide()
        document.getElementById('signup-email').value = "";
        document.getElementById('signup-password').value = "";
        document.getElementById('signup-username').value = "";
        document.getElementById('signup-document').value = "";
        showMessage('Registrado exitosamente!','success')
        } catch (error){
            console.log(error.code)
            if(error.code === 'auth/invalid-email'){
                showMessage('Correo invalido','error')
            }
            if(error.code === 'auth/weak-password'){
                showMessage('Contraseña demasiado debil','error')
            }
            if(error.code === 'auth/email-already-in-use'){
                showMessage('Correo electronico ya existe','error')
            }
        }
})


/* signupForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value
    const userName = signupForm['signup-username'].value
    const documento = signupForm['signup-document'].value
    console.log('Correcto')
    try{
    const auth = getAuth();
    const credencialesDeUsuario = await createUserWithEmailAndPassword(auth, email, password)
    const uid = credencialesDeUsuario.user.uid;
    showMessage(`!Bienvenido! ${userName}`,'success')
    guardarUsuario(documento, userName, email, uid);
    updateProfile(auth.currentUser, {
        displayName: userName,
    }).then(()=>{
        
    })
  //  const signupModal = document.querySelector('#modalRegistrar');
  //  const modal = bootstrap.Modal.getInstance(signupModal);
  //  modal.hide()
    document.getElementById('signup-email').value = "";
    document.getElementById('signup-password').value = "";
    showMessage('Registrado exitosamente!','success')
    } catch (error){
        console.log(error.code)
        if(error.code === 'auth/invalid-email'){
            showMessage('Correo invalido','error')
        }
        if(error.code === 'auth/weak-password'){
            showMessage('Contraseña demasiado debil','error')
        }
        if(error.code === 'auth/email-already-in-use'){
            showMessage('Correo electronico ya existe','error')
        }
    }
}) */