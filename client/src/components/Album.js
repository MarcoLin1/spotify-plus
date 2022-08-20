import React from "react"
import '../scss/Album.scss'

export default function Avatar ({ playingTrack }) {
  return (
    <div className="album-wrapper">
      {playingTrack &&
        <div>
          <img className="album-avatar" alt="" src={playingTrack.playingAlbumUrl}></img>
          <div className="album-text album-title">{playingTrack.title}</div>
          <div className="album-text album-artist">{playingTrack.artist}</div>
        </div> 
      }
    </div>
  )
}