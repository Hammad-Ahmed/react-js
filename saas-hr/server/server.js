import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import leaveRoutes from "./controllers/leaveController.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/leave", leaveRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Leave API running on http://localhost:${PORT}`));
