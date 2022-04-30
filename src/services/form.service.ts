import { PDFDocument, StandardFonts } from "pdf-lib";

//* OPTIONAL FEATURE
//* PDF Filler
//* 1. Put pdf filepath
//* 2. Put parameters to be put in pdf
//* 3. Draw text accordingly

export async function getFormService(dataForm: any) {
  const { name } = dataForm;
  const fs = require("fs/promises");
  const pdfData = await fs.readFile(__dirname + "/path/to/pdf.pdf");

  const pdfDoc = await PDFDocument.load(pdfData);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize(); // if using page ratio
  firstPage.drawText(name, {
    x: 220,
    y: 610,
    size: 9,
    font: helveticaFont,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
