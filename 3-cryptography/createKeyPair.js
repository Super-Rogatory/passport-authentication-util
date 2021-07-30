const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateKeyPair() {
    // Generates an object where the keys are stored in properties 'privateKey' and 'publicKey'
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // standard bits for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Crypto Standards 1"
            format: 'pem' // Common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Crypto Standards 1"
            format: 'pem' // Common formatting choice
        }
    });
    fs.writeFileSync(path.join(__dirname, '/id_rsa_pub.pem'), publicKey);
    fs.writeFileSync(path.join(__dirname, '/id_rsa_priv.pem'), privateKey);
}
generateKeyPair();