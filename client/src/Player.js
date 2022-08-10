import {useState, useEffect} from "react"
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player ({ accessToken, trackUri }) {
  const [play, setPlay] = useState(false)

  useEffect(() => {
    setPlay(true)
  }, [trackUri])

  if (!accessToken) {
    return null
  }
  return (
    <SpotifyPlayer 
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) {
          setPlay(false) 
        }
      }}
      play={play}
      token={accessToken} 
      uris={trackUri ? [trackUri] : []}
    />
  )
} 