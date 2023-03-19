function FuncionEjecutadora(){
    var  elNavegadorEsCompatible = ()=>{
      if (navigator.userAgent.indexOf("Chrome") || 
        navigator.userAgent.indexOf("Edge") ||  
        navigator.userAgent.indexOf("Safari")) return true;
      alert('El Navegador no es compatible con el Reconocimiento de voz');
      return  false;
    }
    if(elNavegadorEsCompatible()){
      var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
      recognition.lang = "es-ES";
      recognition.onresult = resultado  => {manejarResultado(resultado)};
      recognition.start();
      /* 2.5 */
    }
    var  manejarResultado = resultado  => {
        document.getElementById('buscador').value = resultado.results[0][0].transcript
        Buscar();
    }
    }
    
    // abrir wikipedia
    var  manejarResultado2 = resultado  => {
      document.body.innerHTML = resultado.results[0][0].transcript
      /* Adicional */
      if(resultado.results[0][0].transcript.toLowerCase().trim() == 'abrir wikipedia'){
      const  childFrame = document.createElement('iframe');
      childFrame.src = "https://es.wikipedia.org/wiki/Wikipedia:Portada";
      childFrame.style.width = "100vw";
      childFrame.style.height = "500px";
      document.body.append(childFrame)
      }
    }

    function BuscarPorVoz(){
      var  elNavegadorEsCompatible = ()=>{
        if (navigator.userAgent.indexOf("Chrome") || 
          navigator.userAgent.indexOf("Edge") ||  
          navigator.userAgent.indexOf("Safari")) return true;
        alert('El Navegador no es compatible con el Reconocimiento de voz');
        return  false;
      }
      if(elNavegadorEsCompatible()){
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = "es-ES";
        recognition.onresult = resultado  => {manejarResultado(resultado)};
        recognition.start();
        /* 2.5 */
      }
      var  manejarResultado = resultado  => {
          document.getElementById('buscadorNav').value = resultado.results[0][0].transcript
          BuscarEnNav();
      }
      }
      
      // abrir wikipedia
      var  manejarResultado2 = resultado  => {
        document.body.innerHTML = resultado.results[0][0].transcript
        /* Adicional */
        if(resultado.results[0][0].transcript.toLowerCase().trim() == 'abrir wikipedia'){
        const  childFrame = document.createElement('iframe');
        childFrame.src = "https://es.wikipedia.org/wiki/Wikipedia:Portada";
        childFrame.style.width = "100vw";
        childFrame.style.height = "500px";
        document.body.append(childFrame)
        }
      }