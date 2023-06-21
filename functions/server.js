const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()
const cors = require('cors')
const PORT = 8000

// app.use(cors())
// express.static.mime.types['css'] = 'text/css';
// app.use(express.static('styles'));

const rappers = {
    '21 savage': {
        'age': 29,
        'birthName': 'Shéyaa Bin Abraham-Joseph',
        'birthLocation': 'London, England',
    },
    'chance the rapper': {
        'age': 28,
        'birthName': 'Chancelor Jonathan Bennett',
        'birthLocation': 'Chicago, Illinois',
    },
    'dylan': {
        'age': 28,
        'birthName': 'Dylan',
        'birthLocation': 'Dylan',
    }

}

router.get('/index', (request, response) => {
    response.sendFile( __dirname +'/../dist/index.html') //falta corregir en netlify
})

router.get('/api/:rapperName', (request, response) => {
    const rappersName = request.params.rapperName.toLowerCase()
    if (rappers[rappersName]) {
        response.json(rappers[rappersName])
    } else {
        response.json(rappers["dylan"])
    }
})

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`The server is running on port ${PORT}! You better go catch it!`)
// })

app.use('/.netlify/functions/server', router);
module.exports.handler = serverless(app)