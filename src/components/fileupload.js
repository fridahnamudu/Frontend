import React from 'react'
import { pdfjs } from 'react-pdf';
import { useEffect,useState } from 'react';
import axios from 'axios';
import PdfComp from '../PdfComp';



import "./fileupload.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;





function Fileupload() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [name, setName] = useState("");
    const [regno, setRegno] = useState("");
    const [file, setFile] = useState("");
    const [allImage, setAllImage] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);


  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };


    const submitImage=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title);
        formData.append("year",year);
        formData.append("name",name);
        formData.append("regno",regno);
        formData.append("file",file);
           
        console.log(file);  
        try{
          const result=await axios.post("http://localhost:5000/upload-files",formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(result);
        if (result.status === 200) {
          alert("File uploaded successfully !!!");
        }
      } catch (error) {
        console.log("Error uploading file", error);
        getPdf();
      }
        };
    
       const showPdf = (pdf) => {const url ="http://localhost:5000/files/" + pdf;
          setSelectedPdf(url);
          console.log(pdf);
       } 
       

    return (
    <div className='fileupload'>
        <form className='formStyle' onSubmit={submitImage}> 
        <h4>Upload Project</h4><br/>
        <input type="text" className='form-control' placeholder='Project Title' required 
        onChange={(e) => setTitle(e.target.value)} />
        <br/>
        <input type="text" className='form-control' placeholder='Project Year' 
        required
        onChange={(e) => setYear(e.target.value)} />
        <br/>
        <input type="text" className='form-control' placeholder='Students Name' 
        onChange={(e) => setName(e.target.value)} required />
        
        <br/>
        <input type="text" className='form-control' placeholder='Students REGNO'
        onChange={(e) => setRegno(e.target.value)}
         required 
        />
        <br/>
        <input type="file" className='form-control' accept='.pdf' 
        onChange={(e) => setFile(e.target.files[0])}
        required />
        <br/>
        <button className='btn btn-primary'>Submit</button>

        </form>
      <div className="uploaded">
        <h4>Uploaded Files</h4>
        <div className="output-div">
          {allImage && allImage.map((data) => {
            return (
              <div className="inner-div">
                <h6>Title: {data.title}</h6>
                <button className='btn btn-primary' onClick={() => showPdf(data.pdf)}>Show Pdf</button>
              </div>
            );
          })}
         
        </div>
      </div>


          <PdfComp pdfUrl={selectedPdf} />

    </div>
  )
}

export default Fileupload