
let nombre = process.env.NOMBRE || "Sin nombre"; //Las variables de entorno van en mayuscula por buenas prácticas
let web = process.env.WEB || "No tengo web";

console.log("Hola "+nombre);
console.log("Mi web es: "+web);