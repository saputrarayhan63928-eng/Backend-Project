import "dotenv/config";
import app from "./app.js";
import { PORT } from "./utils/env.js";

app.listen(PORT, () => {
    console.log(`Server MVC + Service Perpustakaan API jalan di http://localhost:${PORT}`);
    
})