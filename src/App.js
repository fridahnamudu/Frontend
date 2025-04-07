import React from 'react';
import FileUpload from './components/fileupload';
// import PdfComp from './PdfComp';
import { BrowserRouter, Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      < FileUpload />
      {/* < PdfComp /> */}
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
