import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';

const RegistrationSuccessCard = ({ qrCodeData, onDownload, onGoBack }) => {
    const cardRef = useRef(null);

    const downloadCardAsImage = () => {
        if (cardRef.current) {
            toPng(cardRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'RegistrationDetails.png';
                    link.click();
                })
                .catch((error) => console.error('Failed to download image:', error));
        }
    };

    return (
        <div>
            <div ref={cardRef} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Registration Successful</h3>
                <p className="text-gray-700 mb-4">
                    Name: <span className="font-semibold">{qrCodeData.name}</span>
                </p>
                <p className="text-gray-700 mb-4">
                    Status: <span className="font-semibold text-green-600">{qrCodeData.status}</span>
                </p>
                <div className="flex justify-center mb-4">
                    <QRCode value={qrCodeData.qrValue} />
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={downloadCardAsImage}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Download Card
                </button>
                <button
                    onClick={onGoBack}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccessCard;
