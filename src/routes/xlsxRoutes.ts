import express from "express";
import multer from "multer";
import {XlsxService} from "../services/XlxsService";
import {XlsxController} from "../controllers/XlsxController";
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const xlsxService = new XlsxService();
const xlsxController = new XlsxController(xlsxService);

router.post('/excel/upload', upload.single('file'), (req, res) => {
    xlsxController.uploadExcelFile(req, res);
});
export default router;
