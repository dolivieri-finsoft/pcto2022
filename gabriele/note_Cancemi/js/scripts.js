/*!
* Start Bootstrap - Shop Homepage v5.0.4 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/



$(document).ready(function(){
	
	

	aggiorna();
		
	if(localStorage.length == 0){
		 localStorage.setItem("ColoreTesto","#ffffff");
		 localStorage.setItem("ColoreSfondo","#ffffff");

	};
	
			
    $("body").css("background-color", localStorage.ColoreSfondo);
	$("#coloreTestoT").val(localStorage.ColoreTesto);
	$("#testoDaColorare").css('color', localStorage.ColoreTesto);
    $("#coloreSfondoT").val(localStorage.ColoreSfondo);



	
	
	if(localStorage.length == 2){sessionStorage.clear();};
	
	
	if(sessionStorage.length != 0){
	
	let valore = sessionStorage.getItem('valore');
	
	let modifica = localStorage.getItem(valore);
    let notaDaModificare = JSON.parse(modifica);
    $("#titoloModifica").val(notaDaModificare.titolo);
	$("#testoModifica").val(notaDaModificare.testo);
    $("#coloreModifica").val(notaDaModificare.coloreTesto);
	$("#coloreSfondoModifica").val(notaDaModificare.coloreSfondo);}
	
	
	
	function aggiorna(){
		
		if(localStorage.length == 2 || localStorage.length == 0){
		   		   	        $("#lista").html('<div class="col mb-5"><div class="card h-100"><img class="card-img-top" src="img/vuoto.jpg" alt="..." /><div class="card-body p-4"><div class="text-center"><h5 class="fw-bolder" id="titoloNota">Non sono presenti note</h5>Clicca su<br/>"Crea una nota"<br/>per cominciare</div></div><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"></div></div></div>');

		}
		
		else{
		
		for(let key in localStorage) {
         
		if(key != "ColoreTesto" && key != "ColoreSfondo"){ 
		 if (!localStorage.hasOwnProperty(key)) {
           continue; 
		   }
		   

		    let notaStringa = localStorage.getItem(key);

		   
		   let nota = JSON.parse(notaStringa);
		   
		   let immagine = nota.sfondo;
		   let sfondo = "";
		   let data1 = new Date(nota.data);
		   
		   
		   if(immagine == ""){
		    sfondo = "immagini_per_note/1.jpg";
		   }
		   else{
		    sfondo = "immagini_per_note/" + immagine;
		   }
		   
		   
		   
		   
		   let H, M, S, g, m, a;
		   
		   
		   g = data1.getDate() + "/";
           m = data1.getMonth() + 1 + "/";
           a = data1.getFullYear();
		   H = data1.getHours() + ":";
           M = data1.getMinutes() + ":";
           S = data1.getSeconds();
		   
		   let data = g + m + a + " " + H  + M  + S;
		   let idElimina = nota.titolo.replace(/ /g, '_') + "elimina";
		   let idModifica = nota.titolo.replace(/ /g, '_') + "modifica";

		   
		   
		   	        $("#lista").append('<div class="col mb-5"><div class="card h-100" style="background-color:' + nota.coloreSfondo + '"><img class="card-img-top" src=' + sfondo + ' alt="..." /><div class="card-body p-4"><div class="text-center"><h5 class="fw-bolder" id="titoloNota"><font color="'+ nota.coloreTesto + '">' + nota.titolo + '</font></h5><font color="' + nota.coloreTesto + '">' + nota.testo + '</font><br/><i><sub><font color="' + nota.coloreTesto + '">' + data + '</font></sub></i></div></div><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><button class="btn btn-outline-blue mt-auto" id="' + idModifica + '">Modifica</button></div><br/><div class="text-center"><button class="btn btn-outline-dark mt-auto" type="button" id="' + idElimina + '">Elimina</button></div></div></div></div><script>$("#' + idElimina + '").click(function(){localStorage.removeItem("' + nota.titolo + '"); location.reload();}); $("#' + idModifica + '").click(function(){ sessionStorage.setItem("valore", "' + nota.titolo + '");  window.location.replace("pagine/modifica.html");});</script>');

           
		}
	   }
      }
		   
    }
	
	
	
	
	
	$("#crea").click(function(){
		
		let titolo1 = $("#titolo").val();
		let testo1 = $("#testo").val();
		
		if(titolo1 != "" && testo1 != ""){
			
			let Nota = {titolo:null,testo:null,coloreTesto:null,coloreSfondo:null,sfondo:null,data:null};
			
		 Nota.titolo = $("#titolo").val();
		 Nota.testo = $("#testo").val();
		 Nota.coloreTesto = $("#coloreTesto").val();
		 Nota.coloreSfondo = $("#coloreSfondo").val();
		 Nota.sfondo = $("#sfondo").val().replace(/C:\\fakepath\\/i, '');
		 Nota.data = new Date();

		 localStorage.setItem(Nota.titolo,JSON.stringify(Nota));

	     window.location.replace('../index.html');
		}
		else{
		 
		 if(titolo1 == "" && testo1 != ""){
		 		 alert("Necessario inserire un titolo.");
		 }
		 else if(titolo1 != "" && testo1 == ""){
		 		 alert("Necessario inserire un testo.");

		 }
		 else{
			 	 alert("Necessario inserire un titolo e un testo.");

		 }
		 
		
		}
			
	});
	
	
	$("#elimina").click(function(){
		for(let key in localStorage) {
         
		 if(key != "ColoreTesto" && key != "ColoreSfondo"){
			 if (!localStorage.hasOwnProperty(key)) {
           continue; 
		   }
           localStorage.removeItem(key);		 
		
		 }
		
		}
		
		location.reload();
			
	});
	
    $("#modificaSfondo").click(function(){
       let coloreS = $("#coloreSfondoT").val();
       localStorage.ColoreSfondo = coloreS;
	   
	   $("body").css("background-color", coloreS);

			
	});
	
	$("#modificaTesto").click(function(){
	   let coloreT = $("#coloreTestoT").val();
	   localStorage.ColoreTesto = coloreT;

	   
       $("#testoDaColorare").css('color', coloreT);

	});
	
	$("#modificaNota").click(function(){
		
		let valoreDaCancellare = sessionStorage.getItem('valore');
		localStorage.removeItem(valoreDaCancellare);
		


        let titolo1 = $("#titoloModifica").val();
		let testo1 = $("#testoModifica").val();
		
		if(titolo1 != "" && testo1 != ""){
			
			let Nota = {titolo:null,testo:null,coloreTesto:null,coloreSfondo:null,sfondo:null,data:null};
			
		 Nota.titolo = $("#titoloModifica").val();
		 Nota.testo = $("#testoModifica").val();
		 Nota.coloreTesto = $("#coloreModifica").val();
		 Nota.coloreSfondo = $("#coloreSfondoModifica").val();
		 Nota.sfondo = $("#sfondoModifica").val().replace(/C:\\fakepath\\/i, '');
		 Nota.data = new Date();

		 localStorage.setItem(Nota.titolo,JSON.stringify(Nota));

	     window.location.replace('../index.html');
		}
		else{
		 
		 if(titolo1 == "" && testo1 != ""){
		 		 alert("Necessario inserire un titolo.");
		 }
		 else if(titolo1 != "" && testo1 == ""){
		 		 alert("Necessario inserire un testo.");

		 }
		 else{
			 	 alert("Necessario inserire un titolo e un testo.");

		 }
		 
		
		}

        sessionStorage.clear();

	});
	
	
	
	
	
})