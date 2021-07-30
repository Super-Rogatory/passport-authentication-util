const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '/id_rsa_pub.pem'), 'utf8');

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'Secret message');

console.log(encryptedMessage.toString());

// Cracking the code with the private key

const privateKey = fs.readFileSync(path.join(__dirname, '/id_rsa_priv.pem'), 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());