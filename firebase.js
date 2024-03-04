
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";


export async function subirArchivo(file, carpeta, nombreArchivo) {
    readJson();
    try {
        const storageRef = ref(storage, carpeta);

        // Generar un nombre único para el archivo

        // Codificar el nombre del archivo
        const nombreArchivoCodificado = encodeURIComponent(nombreArchivo);

        // Obtener la referencia del archivo en Firebase Storage
        const archivoRef = ref(storageRef, nombreArchivoCodificado);

        // Subir el archivo a Firebase Storage
        const snapshot = await uploadBytes(archivoRef, file);

        console.log("Archivo subido con éxito:", snapshot);


        const url = await getDownloadURL(archivoRef);



        return url.toString(); // Devolver la URL de descarga del archivo
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw error; // Relanzar el error para manejarlo externamente si es necesario
    }
}
var app;
var storage;
readJson();
async function readJson() {
    const xhr = new XMLHttpRequest();

    // Abre la solicitud
    xhr.open('GET', '/cod.json');

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

    const firebaseConfig = {
        apiKey: data["apis"]["firebase"]["apiKey"],
        authDomain: data["apis"]["firebase"]["authDomain"],
        projectId: data["apis"]["firebase"]["projectId"],
        storageBucket: data["apis"]["firebase"]["storageBucket"],
        messagingSenderId: data["apis"]["firebase"]["messagingSenderId"],
        appId: data["apis"]["firebase"]["appId"]
    };
    app = initializeApp(firebaseConfig);

    storage = getStorage();
}