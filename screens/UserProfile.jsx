import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { Alert } from 'react-native';
import { CredentialsContext } from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    InnerContainer, 
    StyledContainer, 
    BackgroundImage, 
    FullWidthContainer,
    PageLogo,
    Colors,
    PageTitle,
    SubTitle,
    Line,
    ExtraView,
    TextLink,
    TextLinkContent,
    StyledButton,
    ButtonText
} from '../components/styles';

const { brand, darkLight, primary } = Colors;


const UserProfile = () => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { email } = storedCredentials;
    console.log('storedCredentials', storedCredentials);
    return (
        <FullWidthContainer>
            <StatusBar style="light" />
            <BackgroundImage resizeMode="cover" source={require("../assets/restaurant_workers.png")}/>   
            <PageLogo resizeMode="cover" source={require("../assets/shiftze-logo.png")} />  
            <StyledContainer>            
                <InnerContainer>                
                    <PageTitle>User Profile</PageTitle> 
                    <SubTitle>{`${email}` || 'no user found'}</SubTitle>   
                    <Line />
                    <ExtraView>                       
                        <StyledButton onPress={() => 
                            {
                                signOut(auth);
                                setStoredCredentials(null);  
                                AsyncStorage.setItem("shiftzeCredentials", JSON.stringify(null));                              
                                Alert.alert("Logged Out", "You have been logged out");
                            }
                        }>
                           <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </ExtraView>       
                </InnerContainer>
            </StyledContainer>
        </FullWidthContainer>
    )
};

export default UserProfile;