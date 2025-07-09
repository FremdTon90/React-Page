import styled from 'styled-components'

const Title = styled.h2`
  font-size: 2rem;
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 4px;
    background: #f60;
    margin-top: 8px;
  }
`

export default function SectionTitle({ children }) {
  return <Title>{children}</Title>
}
