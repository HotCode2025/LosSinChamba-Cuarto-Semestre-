import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: "localhost",
    user: "postgres",
    password: "agustinalvarez",
    database: "PERN"
});

pool.on("connect", () => {
    console.log("conectado a la base de datos");
});
