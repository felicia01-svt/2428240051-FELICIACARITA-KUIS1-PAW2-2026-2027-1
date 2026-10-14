import express from 'express'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import AlatMusikController from "../controllers/alatMusik.controller.js";

const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

router.post("/alatMusik", AlatMusikController.store);
router.get("/alatMusik", AlatMusikController.index); 
router.get("/alatMusik/:id", AlatMusikController.show);
router.put("/alatMusik/:id", AlatMusikController.update);
router.delete("/alatMusik/:id", AlatMusikController.delete);

export default router