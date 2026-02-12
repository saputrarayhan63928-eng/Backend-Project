import app from "./app";
import { PORT } from "./utils/env";

app.listen(PORT, () => {
    console.log(`Server MVC + Service Perpustakaan API jalan di http://localhost:${PORT}`);
    
})