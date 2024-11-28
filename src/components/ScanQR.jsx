// import React, { useState } from 'react';
// import axios from 'axios';
// import { QrReader } from 'react-qr-reader';

// const ScanQR = ({ resetAdminPage }) => {
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');
//   const [isScanning, setIsScanning] = useState(false); // Scanner state

//   const handleScan = async (data) => {
//     if (data) {
//       try {
//         console.log('Scanned QR Data:', data); // Debugging log
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_URL}/fetch-by-mobile/${data}`
//         );
//         setResult(response.data);
//         setError('');
//         setIsScanning(false); // Stop scanning after a successful scan
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('QR code is invalid or user not registered.');
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error('QR Reader Error:', err);
//     setError('Error scanning the QR code.');
//   };

//   const handleEnter = async (mobileNumber) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/entry`,
//         { mobileNumber }
//       );
//       alert('Entry recorded successfully!');
//       console.log('Visit Data:', response.data);

//       // Reload the page after a successful entry
//       window.location.reload();
//     } catch (err) {
//       alert('Error recording entry.');
//       console.error('Error:', err);
//     }
//   };

//   const toggleScanner = () => {
//     if (isScanning) {
//       // Reload the page when stopping scanning
//       window.location.reload();
//     } else {
//       // Start scanning
//       setIsScanning(true);
//       setResult(null);
//       setError('');
//     }
//   };

//   return (
//     <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-lg rounded-lg">
//       <h3 className="text-2xl font-extrabold text-center mb-6 text-indigo-700">
//         QR Code Scanner
//       </h3>
//       <button
//         onClick={toggleScanner}
//         className={`w-full px-6 py-3 font-bold text-white rounded-lg mb-6 shadow-md transition duration-300 ${
//           isScanning
//             ? 'bg-red-500 hover:bg-red-600'
//             : 'bg-blue-500 hover:bg-blue-600'
//         }`}
//       >
//         {isScanning ? 'Stop Scanning' : 'Start Scanning'}
//       </button>
//       {isScanning && (
//         <div className="scanner-container mb-6">
//           <QrReader
//             delay={300}
//             constraints={{
//               facingMode: 'environment', // Force rear camera on mobile
//             }}
//             onError={handleError}
//             onResult={(result, error) => {
//               if (result) handleScan(result?.text);
//               if (error) handleError(error);
//             }}
//             style={{ width: '100%' }}
//           />
//         </div>
//       )}
//       {error && (
//         <p className="text-red-500 font-semibold text-center mt-4 bg-red-50 p-3 rounded-lg shadow-sm">
//           {error}
//         </p>
//       )}
//       {result && (
//         <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
//           <h4 className="text-lg font-bold text-gray-700 mb-4">
//             User Information
//           </h4>
//           <p className="text-gray-800 mb-2">
//             <span className="font-semibold">Name:</span> {result.fullName}
//           </p>
//           <p className="text-green-600 font-semibold mb-4">
//             <span className="font-semibold">Status:</span> Registered
//           </p>
//           <button
//             onClick={() => handleEnter(result.mobileNumber)}
//             className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
//           >
//             Enter Venue
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScanQR;
// import React, { useEffect, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const ScanQR = () => {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       'qr-reader',
//       { fps: 10, qrbox: 250 },
//       false
//     );

//     scanner.render(
//       (decodedText) => setResult(decodedText),
//       (err) => console.error('Error scanning QR code:', err)
//     );

//     return () => scanner.clear();
//   }, []);

//   return (
//     <div>
//       <h3>QR Code Scanner</h3>
//       <div id="qr-reader" style={{ width: '100%' }} />
//       {result && <p>Scanned Result: {result}</p>}
//     </div>
//   );
// };

// export default ScanQR;
// import React, { useEffect, useState } from 'react';
// import { Html5QrcodeScanner } from 'html5-qrcode';

// const ScanQR = () => {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner(
//       'qr-reader',
//       {
//         fps: 10,
//         qrbox: { width: 250, height: 250 },
//         facingMode: "environment", // Rear camera for mobile
//         experimentalFeatures: {
//           useBarCodeDetectorIfSupported: true,
//         },
//       },
//       false
//     );

//     scanner.render(
//       (decodedText) => {
//         console.log("QR Code scanned:", decodedText);
//         setResult(decodedText);
//       },
//       (err) => {
//         console.error("Error scanning QR Code:", err);
//       }
//     );

//     return () => scanner.clear();
//   }, []);

//   return (
//     <div>
//       <h3>QR Code Scanner</h3>
//       <div id="qr-reader" style={{ width: '100%', margin: 'auto' }} />
//       {result && (
//         <div>
//           <h4>Scanned Result:</h4>
//           <p>{result}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ScanQR;
import React, { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import Webcam from 'react-webcam';

const ScanQR = () => {
  const [result, setResult] = useState(null);
  const [fetchMsg, setFetchMsg] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const handleScan = async (retry = false) => {
    setFetchMsg(null);
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;

      img.onload = async () => {
        try {
          const result = await codeReader.current.decodeFromImageElement(img);
          const scannedId = result.getText();
          setResult(scannedId); // Update result state with the scanned data
          setShowScanner(false); // Hide scanner after a successful scan
        } catch (err) {
          console.error('Error decoding QR Code:', err);
          if (!retry) {
            setTimeout(() => handleScan(true), 1000); // Retry after a short delay
          } else {
            setFetchMsg('Failed to scan QR code. Please try again.');
          }
        }
      };
    } else {
      console.error('No image captured from webcam.');
      setFetchMsg('Failed to capture image. Please try again.');
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    setFetchMsg(null);
  };

  const handleScanAgain = () => {
    setResult(null);
    toggleScanner();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">QR Code Scanner</h1>
      {fetchMsg && <p className="text-red-500">{fetchMsg}</p>}
      {showScanner && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4"
            width={500}
            height={500}
            videoConstraints={{
              facingMode: "environment", // Use back camera
            }}
          />
          <button
            onClick={() => handleScan(false)}
            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
          >
            Scan QR Code
          </button>
        </>
      )}
      {!showScanner && !result && (
        <button
          onClick={toggleScanner}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          {showScanner ? 'Hide Scanner' : 'Show Scanner'}
        </button>
      )}
      {result && (
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 bg-gray-100 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-bold text-gray-900">Scanned QR Code</h3>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1 bg-gray-50 p-4 rounded-md">
                <dt className="text-sm font-bold text-gray-500">Result</dt>
                <dd className="mt-1 text-sm text-gray-900">{result}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
      {result && (
        <div className="mt-6">
          <button
            onClick={handleScanAgain}
            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanQR;
