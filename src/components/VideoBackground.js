// src/components/VideoBackground.js
import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  overflow: hidden;
  z-index: -1;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default function VideoBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) { 
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  return (
    <VideoWrapper>
      <Video ref={videoRef} autoPlay muted loop playsInline>
        <source src="./videos/12716-241674181_small.mp4" type="video/mp4" />
        Dein Browser unterstützt das Video nicht.
      </Video>
    </VideoWrapper>
  )
}
