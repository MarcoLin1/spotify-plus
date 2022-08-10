import React from "react"
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  margin: 16px;
  align-items: center;
  cursor: pointer;
`

const AlbumImage = styled.img`
  height: 64px;
  width: 64px;
`

const SongTextContainer = styled.div`
  margin-left: 16px;
`

const Title = styled.div`
  font-weight: bold;
`

const Artist = styled.div`
  color: grey
`

export default function TrackSearchResult ({ track, chooseTrack }) {
  function handlePlay () {
    chooseTrack(track)
  }
  return (
    <Container onClick={handlePlay}>
      <AlbumImage src={track.albumUrl}/>
      <SongTextContainer>
        <Title>{track.title}</Title>
        <Artist>{track.artist}</Artist>
      </SongTextContainer>
    </Container>
  )
}