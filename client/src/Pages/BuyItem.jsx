import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContractABI from "../abis/abi.json";
import Navbaar from "../Components/UI/Navbaar";
import { Reclaim } from '@reclaimprotocol/js-sdk'
import QRCode from "react-qr-code";

const contractABI = MyContractABI;
const contractAddress = "0x3e8bfE7377dd7df1b98DeF3e8Ae68Bcf41d6465D";

const BuyItem = () => {

  const [url, setUrl] = useState('')
  
  const APP_ID = "0x895eB26Be424Ee73603aBE2dd2A178a5D7a3787B" //TODO: replace with your applicationId
  const reclaimClient = new Reclaim.ProofRequest(APP_ID)
 
  async function generateVerificationRequest() {
    try {
      const providerId = '1d270ba2-8680-415b-b7e2-2cebd47f6f02'; // Replace with actual providerId
  
      reclaimClient.addContext(
        ('user\'s address'), // Replace with actual user address
        ('for acmecorp.com on 1st january')
      );
  
      await reclaimClient.buildProofRequest(providerId);
  
      const signature = await reclaimClient.generateSignature(
        '0x2c3b6e25c1fd61396ddd973d029dcb8a559a8ecb22fc32e89e9539ee4bca64a4'
      );
      reclaimClient.setSignature(signature);
  
      const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();
  
      setUrl(requestUrl);
  
      await reclaimClient.startSession({
        onSuccessCallback: proofs => {
          console.log('Verification success', proofs);
          // Your business logic here
        },
        onFailureCallback: error => {
          console.error('Verification failed', error);
          // Your business logic here to handle the error
        }
      });
    } catch (error) {
      console.error('Error in generateVerificationRequest:', error);
    }
  }
  async function handleQRCode() {
    try {
      console.log('URL before fetch:', url); // Check if `url` is a string
  
      const response = await fetch('http://localhost:5001/callback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestUrl: url }), // Ensure url is a string
      });
  
      const result = await response.json();
      if (result.success) {
        console.log('Verification success', result.data);
      } else {
        console.error('Verification failed', result.error);
      }
    } catch (error) {
      console.error('Error handling QR code request', error);
    }
  }
  
      
  return (
    <div>
      <Navbaar />

      <div  style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      {!url && (
        <button className="text-white" onClick={generateVerificationRequest}>
          Create Claim QrCode
        </button>
      )}
      {url && (
        <QRCode value={url} />
      )}
    </div>
    <button onClick={handleQRCode} className="text-white flex justify-center items-center w-full">verify</button>
    </div>
  );
};

export default BuyItem;
