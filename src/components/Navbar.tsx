import styled from "styled-components"

const StyledNav = styled.div`
  height: 100vh;
  width: 20%;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function Navbar() {
  return (
    <StyledNav>
      <a href="/"><h1>Netzon</h1></a>
      <a href="/privacypolicy">Privacy Policy</a>
      <a href="/tos">Terms of Services</a>
    </StyledNav>
  );
}

export default Navbar;
