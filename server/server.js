const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'ffd0971592a943e59c99cb881680c7c4',
    clientSecret: '2fe86b0b9efd4fd997b3cc09216f96c3'
  })
  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
    .catch((error) => {
      console.log('error', error)
      res.sendStatus(400)
    })
})

app.listen(3001)