import styled from 'styled-components'

const HeroSection = styled.section`
  display: flex; align-items: center; justify-content: center;
  min-height: 80vh; background: url('/hero-bg.jpg') center/cover no-repeat;
`

export default function Hero() {
  return (
    <HeroSection>
      <h1>Hi, ich bin Dustin</h1>
    </HeroSection>
  )
}
