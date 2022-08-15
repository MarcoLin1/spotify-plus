import { Form } from 'react-bootstrap'
import { useState, useEffect } from "react"
import axios from 'axios'
import styled from '@emotion/styled'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from "./useAuth"
import TrackSearchResult from './TrackSearchResult'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
  clientId: 'ffd0971592a943e59c99cb881680c7c4',
})

const Container = styled.div`
  height: 100vh;
`

const Songs = styled.div`
  overflowY: auto;
`

const Lyrics = styled.div`
  text-align: center;
  white-space: pre;
`

export default function Dashboard ({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState('')

  function chooseTrack (track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics('')
  }

  useEffect(() => {
    if (!accessToken) {
      return
    }
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) {
      return setSearchResults([])
    }
    if (!accessToken) {
      return
    }
    let cancel = false
    spotifyApi.searchTracks(search)
      .then(res => {
        if (cancel) {
          return
        }
        setSearchResults(res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce((smallest,image) => {
            if (image.height < smallest.height) {
              return image
            }
            return smallest
          }, track.album.images[0])

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        }))
      })

      return () => cancel = true
  }, [search, accessToken])

  useEffect(() => {
    if (!playingTrack) {
      return
    }

    axios.get('http://localhost:3001/lyrics', {
      params: {
        title: playingTrack.title,
        artist: playingTrack.artist
      }
    })
      .then(res => {
        setLyrics(res.data.lyrics)
      })

  }, [playingTrack])

  return (
    <Container className='d-flex flex-column mt-3 mx-3'>
      <Form.Control 
        type='search' 
        placeholder='search song or artists' 
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      >
      </Form.Control>
      <Songs className='flex-grow-1 my-2'>
        {searchResults.map(track => (
          <TrackSearchResult 
            track={track} 
            key={track.uri} 
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <Lyrics>{lyrics}</Lyrics>
        )}
      </Songs>
      <Player 
        accessToken={accessToken} 
        trackUri={playingTrack?.uri}
      />
    </Container>
  )
}