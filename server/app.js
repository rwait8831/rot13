const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { response } = require('express');
const { rootCertificates } = require('tls');
const { encode } = require('querystring');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function encodeText(s) {
    var alpha = 'abcdefghijklmnopqrstuvwxyz';
    var newAlpha = 'nopwrstuvwxyzabcdefghijklm';
    var cipherText = '';
    for(i = 0; i < s.length; i ++){
        var letterIndex = alpha.indexOf(s[i]);
        if(s[i] == " "){
            cipherText += " ";
        }
        cipherText += newAlpha[letterIndex];
    }
    return cipherText;
};

app.get('/', (req, res)  => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
})

app.get('/cipherText', (request, response) => {
    var plaintext = request.query.plaintext;
    var ciphertext = ""

    for (var i = 0; i < plaintext.length; i++){
        ciphertext += encodeText(plaintext[i].toLowerCase())
    }
    var result = ciphertext;
    console.log(result);
    response.status(200).send(result);
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});