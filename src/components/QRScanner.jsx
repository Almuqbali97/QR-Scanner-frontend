// import React, { useState } from 'react';
// import QrReader from 'react-qr-reader';

// const QRScanner = () => {
//     const [scanResult, setScanResult] = useState('');

//     const handleScan = (data) => {
//         if (data) setScanResult(data);
//     };

//     const handleError = (err) => {
//         console.error(err);
//     };

//     return (
//         <div>
//             <QrReader
//                 delay={300}
//                 onError={handleError}
//                 onScan={handleScan}
//                 style={{ width: '100%' }}
//             />
//             {scanResult && <p>Scan Result: {scanResult}</p>}
//         </div>
//     );
// };

// export default QRScanner;

