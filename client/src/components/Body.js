import { useState, useEffect } from "react"
import { Form } from 'react-bootstrap'
import styled from "@emotion/styled"
import axios from 'axios'
import useAuth from "../useAuth"
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from '../TrackSearchResult'
import Player from '../Player'
import Album from "./Album"
import '../scss/Body.scss'


const spotifyApi = new SpotifyWebApi({
  clientId: 'ffd0971592a943e59c99cb881680c7c4',
})

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
  width: 100%;
  height: 100vh;
  overflow-y: overlay;
  flex: 0.8;
  color: white;
  background: linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1));

  &::-webkit-scrollbar {
    display: none;
  }
`

const Songs = styled.div`
  overflowY: auto;
`

const Lyrics = styled.div`
  text-align: left;
  white-space: pre;
  margin: 16px 0 16px 16px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 600px;
`

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Body ({ code }) {
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
            albumUrl: smallestAlbumImage.url,
            playingAlbumUrl: track.album.images[1].url
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
    <BodyContainer className="body">
      <div className="body-form-wrapper">
        <Form.Control 
          className="body-form"
          type='search' 
          placeholder='search song or artists' 
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        >
        </Form.Control>
      </div>
      <Songs className='flex-grow-1 my-2'>
        {searchResults.map(track => (
          <TrackSearchResult 
            track={track} 
            key={track.uri} 
            chooseTrack={chooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="body-song-wrapper">
            <Lyrics className="body-lyrics">{lyrics}</Lyrics>
            <AlbumContainer>
              <Album playingTrack={playingTrack}/>
            </AlbumContainer>
          </div>
        )}
      </Songs>
      <Player
        accessToken={accessToken}
        trackUri={playingTrack?.uri}
      />
    </BodyContainer>
  )
}