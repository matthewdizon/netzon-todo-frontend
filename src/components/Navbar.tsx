import styled from "styled-components"

const StyledNav = styled.div`
  background: #0C377B;

  height: 100vh;
  width: 20%;

  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: white !important;
    margin: 4px 0;
  }
  
  div {
    margin-top: 48px;
  }
`

function Navbar() {
  return (
    <StyledNav>
      <a href="/"><h1>Netzon</h1></a>
      <a href="/privacypolicy">Privacy Policy</a>
      <a href="/tos">Terms of Services</a>
      <div>
        <a href="http://matthewdizon.com/" target="_blank">Matthew Dizon</a>
      </div>
    </StyledNav>
  );
}

export default Navbar;
