import './app/signInForm.js'
import {
  auth
} from './app/firebase.js'
import './app/signUpForm.js'
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
import './app/logout.js'
import './app/googleLogin.js'
import {
  loginCheck
} from './app/loginCheck.js'
import {
  productsInCart,
  purchaseProduct
} from './app/ShoppingCart/app.js'
import {
  obtenerDatosUsuario,
  obtenerPedidosUsuario,
  obtenerProductos
} from './guardarTarea/firebase.js'
const btnUser = document.querySelector('.btn-user');
export function showMessage(message, type) {
  Toastify({
    text: message,
    duration: 2000,
    destination: "",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === "success" ? "green" : "red"
    },
    onClick: function () {} // Callback after click
  }).showToast();
}
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user)
    const userId = user.uid;
    const userData = await obtenerDatosUsuario(userId)
    //   const userPedidos = await obtenerPedidosUsuario(userId)
    let username = userData.name;
    let userEmail = userData.email;
    let userIdBD = userData.uid;
    let userDoc = userData.documento;
    let DOMuserName = document.querySelector('#profileUserName');
    let DOMuserEmail = document.querySelector('#profileEmail');
    let DOMuserID = document.querySelector('#profileUserID');
    let DOMdoc = document.querySelector('#profileDoc');
    DOMuserName.value = username;
    DOMuserEmail.value = userEmail;
    DOMuserID.value = userIdBD;
    DOMdoc.value = userDoc;
  } else {
    loginCheck(user)
  }
})

const btnUserLogin = document.querySelector('.userLogin');
btnUser.addEventListener('click', () => {
  btnUserLogin.classList.toggle('displayNone');
})

$(document).ready(function () {
  var panelOne = $('.form-panel.two').height(),
    panelTwo = $('.form-panel.two')[0].scrollHeight;

  $('.form-panel.two').not('.form-panel.two.active').on('click', function (e) {
    e.preventDefault();

    $('.form-toggle').addClass('visible');
    $('.form-panel.one').addClass('hidden');
    $('.form-panel.two').addClass('active');
    // $('.form').animate({
    //   'height': panelTwo
    // }, 200);
  });

  $('.form-toggle').on('click', function (e) {
    e.preventDefault();
    $(this).removeClass('visible');
    $('.form-panel.one').removeClass('hidden');
    $('.form-panel.two').removeClass('active');
    // $('.form').animate({
    //   'height': panelOne
    // }, 200);
  });
});

$(document).ready(function () {

  $('.toggle-btn').click(function () {
    $(this).toggleClass('active').siblings().removeClass('active');
  });

});

const btnCargarProductos = document.querySelector('.btn-productos');
btnCargarProductos.addEventListener('click', () => {
  let root = document.querySelector('.root');
  let html = '';
  html = `
  <div class="container d-flex justify-content-center product-list">
  
  </div>
  `
  root.innerHTML = html;
  obtenerProductos();
  const productList = document.querySelector('.product-list');
  productList.addEventListener('click', purchaseProduct);
})


// BOTON PEDIDO
document.querySelectorAll('.truck-button').forEach(button => {
  button.addEventListener('click', e => {

      e.preventDefault();
      
      let box = button.querySelector('.box'),
          truck = button.querySelector('.truck');
      
      if(!button.classList.contains('done')) {
          
          if(!button.classList.contains('animation')) {

              button.classList.add('animation');

              gsap.to(button, {
                  '--box-s': 1,
                  '--box-o': 1,
                  duration: .3,
                  delay: .5
              });

              gsap.to(box, {
                  x: 0,
                  duration: .4,
                  delay: .7
              });

              gsap.to(button, {
                  '--hx': -5,
                  '--bx': 50,
                  duration: .18,
                  delay: .92
              });

              gsap.to(box, {
                  y: 0,
                  duration: .1,
                  delay: 1.15
              });

              gsap.set(button, {
                  '--truck-y': 0,
                  '--truck-y-n': -26
              });

              gsap.to(button, {
                  '--truck-y': 1,
                  '--truck-y-n': -25,
                  duration: .2,
                  delay: 1.25,
                  onComplete() {
                      gsap.timeline({
                          onComplete() {
                              button.classList.add('done');
                          }
                      }).to(truck, {
                          x: 0,
                          duration: .4
                      }).to(truck, {
                          x: 40,
                          duration: 1
                      }).to(truck, {
                          x: 20,
                          duration: .6
                      }).to(truck, {
                          x: 96,
                          duration: .4
                      });
                      gsap.to(button, {
                          '--progress': 1,
                          duration: 2.4,
                          ease: "power2.in"
                      });
                  }
              });
              
          }
          
      } else {
          button.classList.remove('animation', 'done');
          gsap.set(truck, {
              x: 4
          });
          gsap.set(button, {
              '--progress': 0,
              '--hx': 0,
              '--bx': 0,
              '--box-s': .5,
              '--box-o': 0,
              '--truck-y': 0,
              '--truck-y-n': -26
          });
          gsap.set(box, {
              x: -24,
              y: -6
          });
      }

  });
});
