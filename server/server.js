const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SpotifyWebApi = require('spotify-web-api-node')
const lyricsFinder = require('lyrics-finder')

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

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: 'ffd0971592a943e59c99cb881680c7c4',
    clientSecret: '2fe86b0b9efd4fd997b3cc09216f96c3',
    refreshToken
  })

  spotifyApi.refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn
      })
    })
    .catch(error => {
      console.log('refresh error', error)
      res.sendStatus(400)
    })
  })

app.get('/lyrics', async (req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.title) || 'No Lyrics'
  res.json({ lyrics })
})

app.listen(3001)