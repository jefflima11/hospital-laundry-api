import { Router } from "express";
import { getInfos, getStatusLaundry, getEmployee } from "../controllers/infoController.js";
import path from "path";
import { authorize } from "../middlewares/authorize.js"

const router = Router();

router.get("/", getInfos);

router.get("/image", (req, res) => {
  const imgPath = path.join(process.cwd(), "src/img/logo.png");
  res.sendFile(imgPath, (err) => {
    if (err) {
      res.status(404).send("Imagem não encontrada");
    }
  });
});

router.get("/status-laundry", authorize(["A"]), getStatusLaundry);

router.get("/employee", authorize(["A","L"]), getEmployee)

export default router;