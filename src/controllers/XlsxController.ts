import { Request, Response } from 'express';
import { unlink } from 'fs/promises';
import {XlsxService} from "../services/XlxsService";

export class XlsxController {
    constructor(private xlsxService: XlsxService) {}

    async uploadExcelFile(req: Request, res: Response): Promise<Response> {
        try {
            const filePath = req.file?.path;
            if (!filePath) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const data = await this.xlsxService.readExcelFile(filePath);

            // Eliminate the file after processing
            await unlink(filePath);
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while processing the file' });
        }
    }
}
