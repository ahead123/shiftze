import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from '../components/CredentialsContext';
import { 
    InnerContainer, 
    StyledContainer, 
    BackgroundImage, 
    FullWidthContainer,
    PageLogo,
    Colors,
    PageTitle,
    SubTitle,
} from '../components/styles';

const { brand, darkLight, primary } = Colors;


const Home = () => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { email } = storedCredentials;
    return (
        <FullWidthContainer>
            <StatusBar style="light" />
            <BackgroundImage resizeMode="cover" source={require("../assets/chefs.png")}/>   
            <PageLogo resizeMode="cover" source={require("../assets/shiftze-logo.png")} />  
            <StyledContainer>            
                <InnerContainer>                
                    <PageTitle>Account Home</PageTitle> 
                    <SubTitle>{`${email}` || 'no user found'}</SubTitle>                                       
                </InnerContainer>
            </StyledContainer>
        </FullWidthContainer>
    )
};

export default Home;