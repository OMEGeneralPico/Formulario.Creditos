var glob;
async function readJson() {
    const xhr = new XMLHttpRequest();
    var ruta = 
    // Abre la solicitud
    xhr.open('GET', 'cod.json');

    // Espera a que la solicitud se complete
    const response = await new Promise((resolve, reject) => {
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(new Error(`Error cargando JSON: ${xhr.statusText}`));
            }
        };

        xhr.onerror = reject;
        xhr.send();
    });

    // Parsea la respuesta JSON
    const data = JSON.parse(response);

    return data;
}

gapi.load('client', initClient);

async function initClient() {
    const data = await readJson();
    glob = data;
    gapi.client.init({
        apiKey: data["apis"]["gsheet"]["apiKey"],
        discoveryDocs: data["apis"]["gsheet"]["discoveryDocs"],
    }).then(function () {
        // Llama a tus funciones aquí
    });
}

// Función para obtener datos de la hoja de cálculo
function getData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: glob["apis"]["gsheet"]["spreadsheetId"],
        range: 'Entrevistados!A2:D',
    }).then(function (response) {
        var values = response.result.values;
        // Procesa y muestra los datos en tu sitio web

        var dni = document.getElementById("dni").value;
        for (let index = 0; index < values.length; index++) {
            if (values[index][0] == dni) {
                window.location.href = './pages/formulario.html';
            }

        }
    });
} 