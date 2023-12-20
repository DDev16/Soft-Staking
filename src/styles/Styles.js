import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Akaya Telivigala', cursive;
  text-align: center;
  max-width: 1400px;
  align-self: center;
  align-items: center;
  margin: 0 auto;
top: 0;
  padding: 20px;
  background: rgba(250, 250, 250, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 40px rgba(250, 250, 250, 0.8);

  @media (max-width: 768px) {
    padding: 15px;
  }


    @media (max-width: 360px) {
    padding: 15px;
    }

`;

const Title = styled.h1`
  font-size: 46px;
    color: #333;
  color: linear-gradient(to bottom, purple, transparent);
  align-self: center;
    align-items: center;
    text-align: center;
    top: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Status = styled.p`
  font-size: 30px;
  color: ${(props) => (props.success ? '#4CAF50' : '#F44336')};
  margin: 15px 0;
`;

const Balance = styled.p`
  font-size: 40px;
  color: #333;
  margin: 15px 0;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, black, #0056b3);
  color: white;
  font-size: 20px;
  padding: 14px 28px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 30px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(to bottom, purple, #003a7e);
    transform: scale(1.05);
    border: 2px solid rgba(150, 50, 250, 1) ;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  }

 

 
  
`;


const StyledList = styled.ul`
  list-style-type: none; // Removes default list styling
  padding: 0;
  margin: 20px 0;
  font-size: 26px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 30px;

  &:before {
    content: '•'; // Adds a custom bullet point
    color: #007bff; // Sets the bullet point color
    font-weight: bold; // Makes the bullet point bold
    display: inline-block; 
    width: 1em; // Width of the bullet point
    margin-left: -1em; // Negative margin to align with the text
  }
`;


const SplineContainer = styled.div`
  width: 100%;
  left: 0px;
  position: relative;
      @media (min-width: 768px) {
        /* Adjust this breakpoint as needed for desktop view */
        max-width: 300px; /* Set a maximum width for the Spline frame on desktop */

        }
    @media (min-width: 360px) {
        /* Adjust this breakpoint as needed for desktop view */
        max-width: 600px; /* Set a maximum width for the Spline frame on desktop */
        right: 0px;

        }
`;



const ConnectedAccount = styled.p`
    font-size: 20px;
    color: #333;
    margin: 15px 0;
    text-align: center;
    margin-left: 20px;
`;  

export { Container, Title, Status, Balance, Button, StyledList, ListItem, SplineContainer, ConnectedAccount };
