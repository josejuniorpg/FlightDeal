import * as XLSX from 'xlsx';
import { promises as fs } from 'fs';

export class XlsxService {

    async readExcelFile(filePath: string): Promise<any> {
        const fileBuffer = await fs.readFile(filePath);
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        // Convert the sheet to JSON
        const data = XLSX.utils.sheet_to_json(sheet);
        return data;
    }
}
