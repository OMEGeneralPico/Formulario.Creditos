import { subirArchivo } from './firebase.js'
var enMarcha = false;
document.getElementById("form").addEventListener("submit", async function (e) {

    e.preventDefault(); // Prevent the default form submission
    var nombreFormulario = document.getElementById("Nombre").value + "_" + document.getElementById("Apellido").value;
    var total = 3 + 6 + 2 + enMarcha ? 1 : 0 + 3 + 2 + 1;
    mostrarFormularioCarga(total);
    barra.style.width = '6%';
    mensajito.textContent = 'Organizando archivos';
    document.getElementById("submit-button").disabled = true;
    var EquipamientoDetalle = "";
    var EquipamientoCantidad = "";
    var EquipamientoPrecio = "";
    var InsumosDetalle = "";
    var InsumosCantidad = "";
    var InsumosPrecio = "";
    var OtrosDetalle = "";
    var OtrosCantidad = "";
    var OtrosPrecio = "";
    
    for (let index = 0; index < Equipamiento[0].length; index++) {
        EquipamientoDetalle += Equipamiento[0][index].value + ";";
        EquipamientoCantidad += Equipamiento[1][index].value + ";";
        EquipamientoPrecio += Equipamiento[2][index].value + ";";
    }
    for (let index = 0; index < Insumos[0].length; index++) {
        InsumosDetalle += Insumos[0][index].value + ";";
        InsumosCantidad += Insumos[1][index].value + ";";
        InsumosPrecio += Insumos[2][index].value + ";";
    }
    for (let index = 0; index < Otros[0].length; index++) {
        OtrosDetalle += Otros[0][index].value + ";";
        OtrosCantidad += Otros[1][index].value + ";";
        OtrosPrecio += Otros[2][index].value + ";";
    }
    document.getElementById("EqupamientoDesc").setAttribute("value", EquipamientoDetalle);
    document.getElementById("EqupamientoCant").setAttribute("value", EquipamientoCantidad);
    document.getElementById("EqupamientoPrecio").setAttribute("value", EquipamientoPrecio);
    document.getElementById("InsumosDesc").setAttribute("value", InsumosDetalle);
    document.getElementById("InsumosCant").setAttribute("value", InsumosCantidad);
    document.getElementById("InsumosPrecio").setAttribute("value", InsumosPrecio);
    document.getElementById("OtrosDesc").setAttribute("value", OtrosDetalle);
    document.getElementById("OtrosCant").setAttribute("value", OtrosCantidad);
    document.getElementById("OtrosPRecio").setAttribute("value", OtrosPrecio);

    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="zona"]:checked');
    console.log(archivos);
    var constanciasOrden = ["DNIConstancia", "CUITConstancia", "CBUConstancia", "IIBBConstancia", "HabilitacionConstancia", "LocacionConstancia"];
    barra.style.width = '10%';
    let sumatoria = 10 / Object.keys(archivos).length;
    let sumaactual = 10;
    mensajito.textContent = 'Subiendo constancias';
    for (let archivito = 0; archivito < Object.keys(archivos).length; archivito++) {


        var Url = await subirArchivo(archivos[constanciasOrden[archivito]], nombreFormulario, constanciasOrden[archivito]);
        var newUrl = separarString(Url, posicionCorte);
        var url2 = String(newUrl)
        console.log("Nueva url " + newUrl);
        var miInput = document.getElementById(constanciasOrden[archivito] + "Form");
        sumaactual +- sumatoria;
        barra.style.width = sumaactual.toString() + '%';

        miInput.setAttribute("value", url2);
    } 
    mensajito.textContent = 'Subiendo Declaraciones Juradas';
    barra.style.width = '25%';
    var garante = await subirArchivo(document.getElementById("GaranteDecla"), nombreFormulario, "Garante_1_DDJJ");
    barra.style.width = '28%';
    garante = separarString(garante, posicionCorte);
    var miInput = document.getElementById("DDJJGarante");
    miInput.setAttribute("value", garante);
    ///////////////////////
    var garante2 = await subirArchivo(document.getElementById("GaranteDecla2"), nombreFormulario, "Garante_2_DDJJ");
    garante2 = separarString(garante2, posicionCorte);
    var miInput2 = document.getElementById("DDJJGarante2");
    miInput2.setAttribute("value", garante2);
    barra.style.width = '30%';
    ////////////////////////////
    if (enMarcha) {
        var ddjjmarcha = await subirArchivo(document.getElementById("Marcha"), nombreFormulario, "Ingresos_DDJJ");
        ddjjmarcha = separarString(ddjjmarcha, posicionCorte);
        var miInput3 = document.getElementById("MarchaForm");
        miInput3.setAttribute("value", ddjjmarcha);
        barra.style.width = '35%';
    }
   
    /////////////////////////
    var urlEquip = [];
    mensajito.textContent = 'Subiendo Presupuestos';
    barra.style.width = '40%';

     sumatoria = 40 / EqupamientoComprombant.length + InsumosComprobante.length + OtrosComprombant.length;
     sumaactual = 40;
    for (let index = 0; index < EqupamientoComprombant.length; index++) {

        urlEquip.push(await subirArchivo(EqupamientoComprombant[index], nombreFormulario + "/Equipamientos", "Comprobante_" + index));
        var newUrl = separarString(urlEquip[index], posicionCorte);
        urlEquip[index] = String(newUrl)
        console.log("Nueva url " + newUrl);
        sumaactual +- sumatoria;
        barra.style.width = sumaactual.toString() + '%';


    }
    //// hacer que pase la url solo la url, el resto ya lo estoy pasando
    var urlInsumos = [];
    for (let index = 0; index < InsumosComprobante.length; index++) {
        urlInsumos.push(await subirArchivo(InsumosComprobante[index], nombreFormulario + "/Insumos", "Comprobante_" + index));
        var newUrl = separarString(urlInsumos[index], posicionCorte);
        urlInsumos[index] = String(newUrl)
        console.log("Nueva url " + newUrl);
        sumaactual +- sumatoria;
        barra.style.width = sumaactual.toString() + '%';
    }

    var urlOtros = [];
    for (let index = 0; index < OtrosComprombant.length; index++) {


        urlOtros.push(await subirArchivo(OtrosComprombant[index], nombreFormulario + "/Otros", "Comprobante_" + index));
        var newUrl = separarString(urlOtros[index], posicionCorte);
        urlOtros[index] = String(newUrl)
        console.log("Nueva url " + newUrl);
        sumaactual +- sumatoria;
        barra.style.width = sumaactual.toString() + '%';
    }


    var respuestasZona = "";
    for (let index = 0; index < checkboxes.length; index++) {
        respuestasZona += checkboxes[index].value + ";";

    }
    document.getElementById("equpamientoUrl").setAttribute("value", urlEquip);
    document.getElementById("insumosUrl").setAttribute("value", urlInsumos);
    document.getElementById("otrosUrl").setAttribute("value", urlOtros);
    document.getElementById("zonaResp").setAttribute("value", respuestasZona);

    var checkboxesMeta = document.querySelectorAll('input[type="checkbox"][name="meta"]:checked');

    var respuestasMeta = "";
    for (let index = 0; index < checkboxesMeta.length; index++) {
        respuestasMeta += checkboxesMeta[index].value + ";";

    }
    document.getElementById("MetaResp").setAttribute("value", respuestasMeta);

    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
        keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");



    // Send a POST request to your Google Apps Script
    fetch(
        "https://script.google.com/macros/s/AKfycbzkwUgcRHZNxfXqXD6G9DZycdNQLDWWa8Wyk-Qr9LPRYVgaVf1gRxdNbYny9Fc9jtbnug/exec",
        {
            redirect: "follow",
            method: "POST",
            body: formDataString,
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        }
    )
        .then(function (response) {
            // Check if the request was successful
            if (response) {  
                barra.classList.remove("bg-success");
           
                mensajito.textContent = 'Datos completados!';
                barra.style.width = '100%';
            
                return response; // Assuming your script returns JSON response
            } else {
                throw new Error("Failed to submit the form.");
            }
        })
        .then(function (data) {
          
            document.getElementById("submit-button").disabled = false;
            document.getElementById("form").reset();

            setTimeout(function () {
              
                mensajito.textContent = 'Subiendo datos finales';
                barra.style.width = '80%';
            }, 2600);
        })
        .catch(function (error) {
            // Handle errors, you can display an error message here
            console.error(error);
            barra.classList.remove("bg-success");
            barra.classList.add("bg-danger");
            mensajito.textContent = 'Error';
            barra.style.width = '100%';
        });
});
function addDiv(tipo) {
    const newRow = document.createElement("tr");

    // Crea celdas con contenido dinámico (ajusta según tus necesidades)
    const cell1 = document.createElement("td");
    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("id", "cell1Input");
    inputText.classList.add("form-control");
   
    inputText.classList.add("form-control-lg");
    cell1.textContent = ""; // Elimina el texto "Nuevo dato 1"
    cell1.appendChild(inputText); // Agrega el input text a la celda
    newRow.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = "";
    const inputText2 = document.createElement("input");
    inputText2.setAttribute("type", "text");
    inputText2.setAttribute("id", "cell2Input");
    inputText2.classList.add("form-control");
    inputText2.classList.add("form-control-lg");
    cell2.appendChild(inputText2);
    newRow.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = "";
    const inputText3 = document.createElement("input");
    inputText3.setAttribute("type", "text");
    inputText3.setAttribute("id", "cell3Input");
    inputText3.classList.add("form-control");
    inputText3.classList.add("form-control-lg");
    cell3.appendChild(inputText3);
    newRow.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.textContent = "";
    const button = document.createElement("input");
    button.setAttribute("type", "file");
    button.setAttribute("class", "comprobante " + tipo);
    button.setAttribute("multiple", "false");
    button.classList.add("form-control");
    button.classList.add("form-control-lg");
    console.log(button.classList);
    cell4.appendChild(button);

    newRow.appendChild(cell4);





    // ... (agrega más celdas según sea necesario)

    const tbody = document.getElementById("tabla" + tipo);
    tbody.appendChild(newRow);


    if (tipo == "Equipo") {
        Equipamiento[0].push(inputText);
        Equipamiento[1].push(inputText2);
        Equipamiento[2].push(inputText3);
    } else if (tipo == "Insumos") {
        Insumos[0].push(inputText);
        Insumos[1].push(inputText2);
        Insumos[2].push(inputText3);
    } else if (tipo == "Otros") {
        Otros[0].push(inputText);
        Otros[1].push(inputText2);
        Otros[2].push(inputText3);
    }
}
var Equipamiento = [[], [], []];
var Insumos = [[], [], []];
var Otros = [[], [], []];
var respuestasZona = [];
const tabla = document.getElementById("myTable");
Equipamiento[0].push(document.getElementById("DetalleEquipamiento").value);
Equipamiento[1].push(document.getElementById("CantidadEquipamiento").value);
Equipamiento[2].push(document.getElementById("PrecioEquipamiento").value);

document.getElementById("añadirEquip").addEventListener("click", () => {
    const tipo = "Equipo";
    addDiv(tipo);
});
document.getElementById("añadirIns").addEventListener("click", () => {
    const tipo = "Insumos";
    addDiv(tipo);
});
document.getElementById("añadirOtros").addEventListener("click", () => {
    const tipo = "Otros";
    addDiv(tipo);
});

var seleccionadordeArchivos = document.getElementsByClassName("seleccionador");
for (const elemento of seleccionadordeArchivos) {
    elemento.addEventListener("change", (e) => {
        archivos[elemento.id] = (e.target.files[0]);
        console.log(archivos);
    })
};


var archivos = {};

var EquipamientoComp = document.getElementsByClassName("Equipamiento");
for (const elemento of EquipamientoComp) {
    elemento.addEventListener("change", (e) => {
        EqupamientoComprombant.push(e.target.files[0]);
    })
};
var EqupamientoComprombant = [];

var InsumosComp = document.getElementsByClassName("Insumos");
for (const elemento of InsumosComp) {
    elemento.addEventListener("change", (e) => {
        InsumosComprobante.push(e.target.files[0]);
    })
};
var InsumosComprobante = [];
var OtrosComp = document.getElementsByClassName("Otros");
for (const elemento of OtrosComp) {
    elemento.addEventListener("change", (e) => {
        OtrosComprombant.push(e.target.files[0]);
    })
};
var OtrosComprombant = [];

function separarString(cadena, posicion) {
    // Convertimos la cadena a un array
    const arrayPalabras = cadena.split('');

    // Cortamos el array en la posición indicada
    const primeraParte = arrayPalabras.slice(0, posicion);
    const segundaParte = arrayPalabras.slice(posicion);
    return segundaParte.join('').replace(/\//g, '@%2@F');

    console.log(primeraParte.join('') + segundaParteReemplazada + "=media");
    var resultado = segundaParteReemplazada + "=media";
    // Devolvemos un objeto con las dos partes
    return resultado;


}
document.getElementById("proyectoEstado").addEventListener('change', function (e) {
    var valor = this.value;
    var divMarchA = document.getElementById("DivMarcha");
    if (valor == "Nuevo") {
        enMarcha = false;
        divMarchA.style.display = "none"
    } else {
        enMarcha = true;
        divMarchA.style.display = "block"
    }
})
// Ejemplo de uso

const posicionCorte = 78;



function validarFormulario() {
    // Obtén todos los elementos del formulario con el atributo 'required'
    var camposRequeridos = document.querySelectorAll('#miFormulario [required]');

    // Itera sobre los campos requeridos y verifica que todos estén completos
    for (var i = 0; i < camposRequeridos.length; i++) {
        var campo = camposRequeridos[i];
        var spanError = document.getElementById('error' + campo.id.charAt(0).toUpperCase() + campo.id.slice(1));

        // Verifica que el campo no esté vacío
        if (campo.value.trim() === '') {
            spanError.innerText = 'Este campo es obligatorio.';
            return false; // Detén el envío del formulario si algún campo requerido no está completo
        } else {
            spanError.innerText = ''; // Limpiar mensajes de error si el campo está completo
        }
    }

    // Si todos los campos requeridos están completos, permite el envío del formulario
    return true;
}


function cambiarClase() {
    const anchoPantalla = document.documentElement.clientWidth;

    if (anchoPantalla < 1000) {
        const elementos = document.querySelectorAll(".csambioPantalla");
        console.log(anchoPantalla);
        // Recorre la lista de elementos y haz lo que necesites
        elementos.forEach((elemento) => {
            elemento.classList.add("container-fluid");
            elemento.classList.remove("container");
            // Ejemplo: agrega una clase a cada elemento

        });

    } else {
        const elementos = document.querySelectorAll(".cambioPantalla");

        // Recorre la lista de elementos y haz lo que necesites
        elementos.forEach((elemento) => {
            // Ejemplo: agrega una clase a cada elemento
            elemento.classList.add("container");
            elemento.classList.remove("container-fluid");
        });
    }

}

window.addEventListener("resize", cambiarClase);
cambiarClase();
function mostrarFormularioCarga(total) {
    /* document.getElementById("formulariocarga").style.display = "block"
     document.getElementById("formilarioModulo").style.display = "none"
     var barra = document.getElementById("barra");
     barra.setAttribute("aria-valuenow", 0);
 */
}
function OcultarFormulario(){
    var oculta = document.getElementById("Box");
    oculta.style.display = 'none';
    barra.style.display = 'block'
    barra.style.width = '6%';
    mensajito.textContent = 'Organizando archivos';
    console.log('a');
}
var barra = document.getElementById("cargando");
var mensajito = document.getElementById("mensajito");

function AgregarModaltoArray(tipo) {
    
    console.log(document.getElementById('modaltipo').value);
  document.getElementById('modaltipo').setAttribute('value',tipo);
  console.log(document.getElementById('modaltipo').value);
    /*<input type="text" class="form-control" id="modaltipo" name="modaltipo" placeholder="" style="display: none;">
    <label for="det">Detalle:</label><br>
    <input type="text" class="form-control" id="det" name="det" placeholder="">
    <label for="cant">Cantidad:</label><br>
    <input type="text" class="form-control" id="cant" name="cant" placeholder="">
    <label for="prec">Precio:</label><br>
    <input type="text" class="form-control" id="prec" name="prec" placeholder="">
    <label for="comproban">Comprobante:</label><br>
    <input type="file" class="form-control"  id="comproban" name="comproban">*/

   
   
    
}
document.getElementById("añadirEquipShort").addEventListener('click',() => {
    const tipo = "Equipamientos";
    AgregarModaltoArray(tipo);
});
document.getElementById("añadirInsumShort").addEventListener('click',() => {
    const tipo = "Insumos";
    AgregarModaltoArray(tipo);
});
document.getElementById("añadirOtrosShort").addEventListener('click',() => {
    const tipo = "Otros";
    AgregarModaltoArray(tipo);
});
// Ejemplo de uso
let botonModalGuardar = document.getElementById("tablamovilguardar").addEventListener('click',addTable);

// Simulamos una carga de 2 segundos
function addTable() {

    let tipo = document.getElementById('modaltipo').value;
    if (tipo == "Equipamientos") {
        let valor = document.getElementById('det').value == null ? 0 : document.getElementById('det').value; 
        Equipamiento[0].push(valor )
         valor = document.getElementById('cant').value == null ? 0 : document.getElementById('cant').value; 
        Equipamiento[1].push(valor );
        valor = document.getElementById('prec').value == null ? 0 : document.getElementById('prec').value; 
        Equipamiento[2].push(valor );
        console.log(document.getElementById('comproban').files);
        EqupamientoComprombant.push(document.getElementById('comproban').files[0]);
    }else if (tipo == "Insumos") {
        let valor = document.getElementById('det').value == null ? 0 : document.getElementById('det').value; 
        Insumos[0].push(valor )
         valor = document.getElementById('cant').value == null ? 0 : document.getElementById('cant').value; 
         Insumos[1].push(valor );
        valor = document.getElementById('prec').value == null ? 0 : document.getElementById('prec').value; 
        Insumos[2].push(valor );
        console.log(document.getElementById('comproban').files);
        InsumosComprobante.push(document.getElementById('comproban').files[0]);
    }else{
        let valor = document.getElementById('det').value == null ? 0 : document.getElementById('det').value; 
        Otros[0].push(valor )
         valor = document.getElementById('cant').value == null ? 0 : document.getElementById('cant').value; 
         Otros[1].push(valor );
        valor = document.getElementById('prec').value == null ? 0 : document.getElementById('prec').value; 
        Otros[2].push(valor );
        console.log(document.getElementById('comproban').files);
        OtrosComprombant.push(document.getElementById('comproban').files[0]);
    }

    const newRow = document.createElement("tr");

    // Crea celdas con contenido dinámico (ajusta según tus necesidades)
    const cell1 = document.createElement("td");
    cell1.textContent = document.getElementById('det').value;
    newRow.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = document.getElementById('cant').value;
    newRow.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = document.getElementById('prec').value;
    newRow.appendChild(cell3);

    const cell4 = document.createElement("td");
    const icono = document.createElement("i");
    if (document.getElementById('comproban').value.length > 0) {
     
        console.log(document.getElementById('comproban').value.length);
        icono.setAttribute("class", "fas fa-paperclip");
     
    }else{
        console.log('no');
        icono.style.color = 'yellow'
        icono.setAttribute("class", "fa fa-warning");
    }
   cell4.appendChild(icono);
    newRow.appendChild(cell4);
  

    const cell5 = document.createElement("td");
    const borrador = document.createElement("i");
    borrador.setAttribute("class", "fas fa-window-close");
    borrador.style.color = 'red'
    borrador.addEventListener('click', function() {
        borrarFila(newRow,tipo)
      });
    cell5.appendChild(borrador);
    newRow.appendChild(cell5);



    // ... (agrega más celdas según sea necesario)

    const tbody = document.getElementById("tabla" + tipo +'Short');
    tbody.appendChild(newRow);
    document.getElementById('det').value = '';
    document.getElementById('cant').value = '';
    document.getElementById('prec').value = '';
    document.getElementById('comproban').value = [];
   
}
function borrarFila(fila,tipo){
    console.log(Equipamiento);

    if (tipo == 'Equipamientos') {
        for (let index = 0; index < 3; index++) {
            let palabra = fila.childNodes[index].textContent;
            let indice = Equipamiento[index].indexOf(palabra);
            Equipamiento[index].splice(indice, 1);
            console.log(Equipamiento);
        }
       
      
    }else if (tipo == 'Otros') {
        for (let index = 0; index < 3; index++) {
            let palabra = fila.childNodes[index].textContent;
            let indice = Otros[index].indexOf(palabra);
            Otros[index].splice(indice, 1);
            console.log(Otros);
        }
    }else{
        for (let index = 0; index < 3; index++) {
            let palabra = fila.childNodes[index].textContent;
            let indice = Insumos[index].indexOf(palabra);
            Insumos[index].splice(indice, 1);
            console.log(Insumos);
        }
    }
  
   
    fila.remove();

    // borrar la referencia 
}

document.getElementById('prueba').addEventListener('click',function(){
    console.log(Equipamiento);
    console.log(Insumos);
    console.log(Otros); 
})