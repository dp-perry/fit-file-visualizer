import { useState } from 'react'
import './App.css'

import FileUploader from './components/FileUploader';
import Dashboard from './components/Dashboard';
import {parseFitFile} from './libs/FitParser.ts';
import {FitMessages, FitParseResult} from "./types/fitfile.ts";
import Button from "./components/Interactive/Button.tsx";

function App() {
  const [canSelectFile, setCanSelectFile] = useState(true);
  const [fitData, setFitData] = useState<FitMessages | null>(null);

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
        console.error('Invalid file format');
        return;
      }

      const {messages, errors }: FitParseResult = parseFitFile(arrayBuffer);

      if (errors.length > 0) {
        console.error('Errors parsing FIT file:', errors);
        return;
      }

      // console.log('Parsed FIT messages:', messages);
      setFitData(messages);
      setCanSelectFile(false)
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='bg-blue-700 flex justify-between items-center'>
        <div className='p-4 font-semibold text-white flex gap-2'>
          <img src={'/images/logo/logo-white-128px.png'} alt={'Logo in white'} className='h-[24px] w-auto' /> Wingu Solutions
        </div>
      </div>
      <div className='p-2 md:p-8'>
        <h1 className="text-3xl font-bold mb-6 text-center">Fit File analyser</h1>
        <div className='flex flex-col gap-8'>
          {canSelectFile && <FileUploader onFileUpload={handleFileUpload} /> }
          {
            fitData &&
            <>
              <div className='flex justify-center'>
                <div>
                  <Button onClick={() => setCanSelectFile(true)}>
                    Choose another file
                  </Button>
                </div>
              </div>
              <Dashboard fitData={fitData} />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default App
