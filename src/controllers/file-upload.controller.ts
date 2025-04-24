import { Request, Response } from "express";
import tesseract from 'tesseract.js';
import path from 'path';
import fs from 'fs';
import { extractTransactionData } from "../utils/extractTransaction";
import { AppDataSource } from "../config/data-source";
import { TransactionOld } from "../entity/transaction-old";
import { TranOldEnum } from "../common";

export const uploadTranImg = async (req: Request, res: Response) => {
    const tranOldRepo = AppDataSource.getRepository(TransactionOld);

    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }

    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, req.file.filename);

    try {
        const result = await tesseract.recognize(filePath, 'eng');
        const trxData = extractTransactionData(result.data.text)
        if(!trxData.apv || !trxData.purchase) {
            return res.status(404).json({ message: "Transaction not found." });
        }
        const tran = await tranOldRepo.findOne({
            where: [
                { apv: trxData.apv },
                { trxId: trxData.purchase }
            ]
        })
        
        console.log(trxData)
        if(!tran){
            res.status(404).json({ message: "Transaction not found."});
        }else {
            tran.status = TranOldEnum.COMPLETED
            await tranOldRepo.save(tran)

            res.status(200).json({ text: result.data.text });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    } finally {
        // Clean up: Delete file after processing
        fs.unlink(filePath, (err) => {
            if (err) console.error('Failed to delete file:', err);
        });
    }
};
