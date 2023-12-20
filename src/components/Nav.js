import React from 'react'
import styled from 'styled-components'
import "@fontsource/akaya-telivigala"
import  logo from '../styles/logo.png';


const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 8vh;
    background-color: #282c34;
    color: white;
    border-bottom: 10px solid rgba(150, 50, 250, 1) ;
    font-family: 'Akaya Telivigala', cursive;
    font-size: 60px;
    text-align: center;
    max-width: 1200px;
    align-self: center;
    align-items: center;
    margin: 0 auto;
    top: 0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 40px rgba(250, 250, 250, 0.8);
    @media (max-width: 768px) {
        padding: 15px;
    }
    @media (max-width: 360px) {
        padding: 15px;
    }
`

const Link = styled.a`
    color: white;
    text-decoration: none;
    font-size: 30px;
    font-family: 'Akaya Telivigala', cursive;
    &:hover {
        color: purple;
    }
`
const Nav = () => {
  return (
    <div>
        <NavContainer>
            <Link href="/">Home</Link>
            <img src={logo} alt="logo" width="100" height="100" />
            <Link href="/nft">NFT</Link>
         
        </NavContainer>
        
    </div>

  )
}

export default Nav