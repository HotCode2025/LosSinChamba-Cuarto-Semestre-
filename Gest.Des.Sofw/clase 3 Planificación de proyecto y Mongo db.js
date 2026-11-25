// Actividad práctica - MongoDB Shell

// Crear la base de datos
use actividad

// Insertar datos
db.personas.insertOne({ nombre: "Juan", edad: 20 })
db.personas.insertOne({ nombre: "María", edad: 22 })
db.personas.insertOne({ nombre: "Lucas", edad: 19 })

// Consultar la base de datos
db.personas.find()
