import React, { useState, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import Webcam from 'react-webcam';
import axios from 'axios';

const ScanQR = () => {
  const [result, setResult] = useState(null);
  const [fetchMsg, setFetchMsg] = useState(null);
  const [attendantData, setAttendantData] = useState(null);
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
          const mobileNumber = result.getText();
          setResult(mobileNumber);
          fetchAttendantData(mobileNumber); // Fetch attendant data after a successful scan
          setShowScanner(false);
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

  const fetchAttendantData = async (mobileNumber) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-by-mobile/${mobileNumber}`);
      setAttendantData(response.data);
      setFetchMsg(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setFetchMsg('User not found with this mobile number.');
      setAttendantData(null);
    }
  };

  const handleEnter = async (mobileNumber) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/entry`, { mobileNumber });
      alert('Entry recorded successfully!');
      console.log('Visit Data:', response.data);

      // Reload the page after a successful entry
      window.location.reload();
    } catch (err) {
      alert('Error recording entry.');
      console.error(err);
    }
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
    setFetchMsg(null);
  };

  const handleScanAgain = () => {
    setResult(null);
    setAttendantData(null);
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
      {!showScanner && !attendantData && (
        <button
          onClick={toggleScanner}
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
        >
          {showScanner ? 'Hide Scanner' : 'Show Scanner'}
        </button>
      )}
      {attendantData && (
        <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 bg-gray-100 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-bold text-gray-900">Attendant Information</h3>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <p className="text-gray-800 mb-2">Name: {attendantData.fullName}</p>
            <p className="text-green-600 mb-2 font-bold">Status: Registered</p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleEnter(result)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Enter Venue
            </button>
          </div>
        </div>
      )}
      {attendantData && (
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
