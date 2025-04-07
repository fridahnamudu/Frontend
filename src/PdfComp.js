import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp({ pdfUrl }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {pdfUrl ? (
        <>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
}

export default PdfComp;
