const CryptoJS = require("crypto-js");
const sec = require('./secret')
const projectId = sec.projectId
const timestamp = Date.now().toString();
const fetch = require('node-fetch');
const secret= sec.secret
const fs = require('fs')
const path = require('path')
var process = require('process')
const jsdb = require('../jsdb');
const { JsonRpcProvider } = require("@ethersproject/providers");
const { STATUS_CODES } = require("http");



// Crete user will create a new user in the db and append address to it
async function createUser(uid){
  const signature = CryptoJS.HmacSHA256(`${projectId}:${timestamp}:`, secret);

//Create Header 
  const headers = {
    'Accept':'application/json',
    'X-PROJECT-ID' : projectId,
    'X-TIMESTAMP' : timestamp,
    'X-SIGNATURE' : signature.toString()
};
  const bb = await fetch('https://api-testnet.thundergene.com/api/v1/client/user',
        {
          method: 'POST',
        
          headers: headers
        })
        .then( function(res) {
            var a =res.json();  //{ address: '0x4Bb3ECD6eE0aaD2914FD5AfC6c7Ae3639fdB5AA3' }
            //console.log(a)
            return a 
        })
        .then (function(body){
            jsdb.addUser(uid,body['address'])
        })
}


async function mintToUser(collectionId,token_id,uid){
  if (jsdb.getUserAddress(uid)=="fail"){
    console.log('No Exisiting UID, Creating Address for ',uid,'....')
    await createUser(uid)
  }
  let inputBody = {
    "amount" :"1",
    "asset_id": collectionId,
    "to":jsdb.getUserAddress(uid).toString() ,
    "token_id": token_id.toString()
  };
  let sig = CryptoJS.HmacSHA256(`${projectId}:${timestamp}:${JSON.stringify(inputBody)}`, secret)
  let headers_mint = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'X-SIGNATURE':sig.toString(),
        'X-PROJECT-ID':projectId,
        'X-TIMESTAMP':timestamp
      };
    await fetch('https://api-testnet.thundergene.com/api/v1/client/nft/mint',
      {
        method: 'POST',
        body: JSON.stringify(inputBody),
        headers: headers_mint
      })
      .then(function(res) {  
        if (res["statusText"]=="Accepted"){
          console.log('Mint Success! Adding NFT ...');
          jsdb.addNFT(collectionId,token_id,uid)
        }
        return res.json();
      }).then(function(statusText){
        console.log(statusText)
      });
}

c_id = "ad8d348a-7d60-462d-9114-4b45bd281c19"  
playerA = "0x0f18B40aa554E04b6de8FA5F128DFF10B4ADc1e3"
playerB ="0x4Bb3ECD6eE0aaD2914FD5AfC6c7Ae3639fdB5AA3"


//createUser(0909)
//mintToUser (c_id,3,12345)
jsdb.getUser(666)

// Write whatever script you wanna do in below


