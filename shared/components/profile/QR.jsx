'use client';
import React from 'react';
import {useSelector} from 'react-redux';
import {Stack, Card} from 'react-bootstrap';
import {getCurrentUser} from '@/shared/redux/slices/user';
import QRCode from 'qrcode.react';

const QR = () => {
  const currentUser = useSelector(getCurrentUser);

  const downloadQR = () => {
    const canvas = document.getElementById('userIdentifierQRCode');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'userIdentifierQRCode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Card className="overflow-hidden">
      <Stack className="m-5 number-font">
        Share QR code with your tippers for easy tipping process
      </Stack>
      <Card.Body className="pt-0">
        <Stack className="d-flex flex-column justify-content-center align-items-center">
          <QRCode
            id="userIdentifierQRCode"
            value={`${window.location.origin}/t/${currentUser.userPublicIdentifier}`}
            size={200}
            level={'H'}
            includeMargin={true}
          />
          <a
            onClick={downloadQR}
            className="fw-bold"
            style={{cursor: 'pointer'}}
          >
            Download QR
          </a>
        </Stack>
      </Card.Body>
    </Card>
  );
};
export default QR;
