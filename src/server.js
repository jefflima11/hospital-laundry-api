
import app from "./app.js"
import { initDB, closeDB } from "./config/db.js";

const PORT = process.env.PORT || 3005;

app.listen(PORT, async () => {
    await initDB();
    console.log(`Servidor rodando!`);
});


process.on("SIGINT", async () => {
    await closeDB();
    process.exit(0);
});