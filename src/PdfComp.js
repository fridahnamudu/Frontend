import { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PdfComp({ pdfUrl }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Function to go to the next page
  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

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

          {/* Navigation buttons */}
          <div>
            <button onClick={prevPage} disabled={pageNumber <= 1}>
              Previous Page
            </button>
            <button onClick={nextPage} disabled={pageNumber >= numPages}>
              Next Page
            </button>
          </div>
        </>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
}

export default PdfComp;
