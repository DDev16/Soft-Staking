import React, { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import contractABI from '../abi/stakingABI.json';
import  { Container, Title, Status, Balance, Button, ListItem, StyledList, SplineContainer, ConnectedAccount } from '../styles/Styles.js';
import Spline from '@splinetool/react-spline';
import Nav from './Nav.js';
import styled from 'styled-components';


const Paragraph = styled.p`
    font-size: 30px;
    color: #333;
    margin: 15px 0;
    text-align: center;
    margin-left: 20px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
`;  

 


const Staking = () => {
  const [ , setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [onboardedStatus, setOnboardedStatus] = useState(false);
  const [nftBalance, setNftBalance] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [userTier, setUserTier] = useState(0);  // State variable for the user's tier
  const [refreshFlag, setRefreshFlag] = useState(false); // Step 1: Refresh flag

  const contractAddress = '0x9E13c0DAE16a7dDFcE8E82DD83DEFcc0686898F5';

  // Initialize web3 and contract
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          const stakingContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(stakingContract);

          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error('Error initializing web3:', error);
        }
      } else {
        console.error('Ethereum provider not found');
      }
    };

    initWeb3();
  }, []);

  const fetchData = useCallback(async () => {
    if (contract && account) {
      try {
        const status = await contract.methods.getOnboardedStatus(account).call();
        const nftBal = await contract.methods.getNFTBalance(account).call();
        const pendingRew = await contract.methods.getPendingRewards(account).call();
        const tier = await contract.methods.determineTier(account).call();  // Fetch the user's tier

        console.log('Fetched Data:', { status, nftBal, pendingRew, tier });

        setOnboardedStatus(status);
        setNftBalance(nftBal.toString()); // Convert BigInt to String
        setPendingRewards(pendingRew.toString()); // Convert BigInt to String
        setUserTier(tier.toString()); // Set the user's tier
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }, [contract, account]);

   // Fetch onboarded status, NFT balance, and pending rewards when contract or account changes
   useEffect(() => {
    fetchData();
  }, [fetchData, refreshFlag]); // Step 3: Include refreshFlag in dependency array
  

  const handleRefresh = () => {
    setRefreshFlag(!refreshFlag); // Step 2: Toggle the refresh flag
  };
  // Function to format the Ethereum account address
  const formatAccountAddress = (address) => {
    if (address && address.length > 10) {
      const firstPart = address.substring(0, 6);
      const lastPart = address.substring(address.length - 4);
      return `${firstPart}...${lastPart}`;
    }
    return address;
  };

  // Fetch onboarded status, NFT balance, and pending rewards when contract or account changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const claimRewards = async () => {
    if (!contract || !account) return;

    try {
      await contract.methods.claimRewards().send({ from: account });
      await fetchData(); // Update data after claiming rewards
    } catch (error) {
      console.error('Error claiming rewards:', error);
    }
  };

  const onBoardUser = async () => {
    if (!contract || !account) return;

    try {
      await contract.methods.onBoardUser().send({ from: account });
      await fetchData(); // Update data after onboarding
    } catch (error) {
      console.error('Error onboarding user:', error);
    }
  };

 

  return (
    

 

    <Container>
    <Nav />
    <Title>Nirvanis Soft Staking</Title>
    {/* <SplineContainer>
        <Spline scene="https://prod.spline.design/9S5Dl86vXigDLCym/scene.splinecode" />
      </SplineContainer> */}
      <ConnectedAccount>
          Connected Wallet ({formatAccountAddress(account)})
        </ConnectedAccount>
      <Status success={onboardedStatus}>
        Onboarded Status: {onboardedStatus ? 'Yes' : 'No'}
      </Status>

      <Balance>NFT Balance: {nftBalance}</Balance>

      <Balance>Pending Rewards: {pendingRewards}</Balance>

      <Balance>User Tier: {userTier}</Balance>

      <Paragraph>
        <strong>Reward Multiplier:</strong> The reward multiplier determines how much bonus rewards you earn based on your user tier. Your user tier is determined by the number of non-fungible tokens (NFTs) you hold.
      </Paragraph>

      <Paragraph>
  Your user tier is currently at <strong>Tier {userTier}</strong>. Here's how it works:
  <StyledList>
    <ListItem>Tier 1: 1 NFT; Bronze Tier</ListItem>
    <ListItem>Tier 2: 6 NFTs; Silver Tier</ListItem>
    <ListItem>Tier 3: 11 NFTs; Gold Tier</ListItem>
    <ListItem>Tier 4: 16 NFTs; Platinum Tier</ListItem>
    <ListItem>Tier 5 and beyond: 21+ NFTs; Pyscho Tier</ListItem>
  </StyledList>
  The more NFTs you hold, the higher your tier, and the larger your reward multiplier will be.
</Paragraph>

      <Paragraph>
        To calculate your rewards, the system uses the following formula:
        <br />
        <strong>Rewards = Base Reward × Time Elapsed × NFT Balance × Reward Multiplier</strong>
        <br />
        - <strong>Base Reward:</strong> A fixed reward per second.
        <br />
        - <strong>Time Elapsed:</strong> The time that has passed since your last reward claim.
        <br />
        - <strong>NFT Balance:</strong> The number of NFTs you hold.
        <br />
        - <strong>Reward Multiplier:</strong> Your tier-based reward multiplier.
      </Paragraph>

      <Button onClick={claimRewards}>Claim Rewards</Button>

      <Button onClick={onBoardUser}>Onboard User</Button>

      <Button onClick={handleRefresh}>Refresh</Button> {/* Step 2: Add refresh button */}

      
    </Container>
 
   
  );
};

export default Staking;