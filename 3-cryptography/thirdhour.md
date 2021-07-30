# Intro to Public Key Cryptography

- ## createKeyPair.js
- ## Most of the notes on elliptic curve cryptography and asymmetric crypto is in notebook
- ## Emulating elliptic curve math can be accomplished with crypto.generateKeyPairSync()
```
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
    fs.writeFileSync(path.join(__dirname, '/id_rsa_pub.pem'), publickey);
    fs.writeFileSync(path.join(__dirname, '/id_rsa_priv.pem'), privateKey);
}
generateKeyPair();
```

- ## Encryption in encrypt.js
```
const crypto = require('crypto');

function encryptWithPublicKey(publicKey, message) {
    const bufferMessage = Buffer.from(message, 'utf-8');

    return crypto.publicEncrypt(publicKey, bufferMessage);

}

module.exports.encryptWithPublicKey = encryptWithPublicKey;
```

- ## Main.js
```
const fs = require('fs');
const encrypt = require('./encrypt');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '/id_rsa_pub_pem'), 'utf8');

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'Secret message');

console.log(encryptedMessage.toString());
```

# Sample Output
```
�
�El�������Z?G��X�V�]�ѓ�7�F��U�U�i>a����������� :��(i��c�++{
                                                           ��f�N��.+�닙��y�p�I�RYgr�4{Ѕ���      ���ޥ⎰
|n��*����/bܦ����=kډ��e˟|ֿ_��4�gL�"��/BnI�3�����o!5��                                                  ���m6�6���y��E{�HEK(�k�(��}��O;�{�=��3zz4�J���/?-�8��
                                                   z�@7'�{�uA�I&O�O^��,R6��.��]�t�@ə
                                                                                        ��b�L�C��̴�L�a+�|�ɚ�7�uS�m?���);�z`����F�M~ص�v��_��4$Jhi-.a�ԛ��q'Τ�5tAH�\�J��*�Y�Uj=���hC&�[�&�2G���u����"�K��R..V����)����Jj\�by{�S���"z�(O��
```
- ## This is what we're going to transport over TLS on unprotected networks.
- ## We can decrypt it with our private key. THE PUBLIC DOES NOT HAVE THIS.

<hr />

- ## Decrypt Functionality
```
const crypto = require('crypto');

function decryptWithPrivateKey(privateKey, encryptedMessage) {

    return crypto.privateDecrypt(privateKey, encryptedMessage);

}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey;
```
<hr />

## Cracking the encrypted data with the private key in main.js
```
const privateKey = fs.readFileSync(path.join(__dirname, '/id_rsa_priv.pem'), 'utf8');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString());
```