import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
    InnerContainer, 
    StyledContainer, 
    BackgroundImage, 
    FullWidthContainer,
    PageLogo,
    SubTitle,
    StyledButton,
    ButtonText,
    Colors,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
    StyledFormArea,
    PageTitle
} from '../components/styles';

const { brand, darkLight, primary } = Colors;

const RegistrationLanding = ({ navigation }) => {
    return (
        <FullWidthContainer>
            <StatusBar style="light" />
            <BackgroundImage resizeMode="cover" source={require("../assets/diverse_staff.png")}/>   
            <PageLogo resizeMode="cover" source={require("../assets/shiftze-logo.png")} />  
            <StyledContainer>            
                <InnerContainer>                
                    <PageTitle>Getting started is easy!</PageTitle> 
                    <SubTitle>Looking to hire service industry professionals?</SubTitle>
                    <StyledFormArea>
                        <StyledButton>
                            <ButtonText onPress={() => navigation.navigate("BusinessSignup")}>Business Sign Up</ButtonText>
                        </StyledButton>
                        <Line />
                        <SubTitle>Looking for shift work in the service industry?</SubTitle>
                        <StyledButton>
                            <ButtonText onPress={() => navigation.navigate("EmployeeSignup")}>Service Professionals Sign Up</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink>
                                <TextLinkContent onPress={() => navigation.navigate("Login")}>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>                                     
                </InnerContainer>
            </StyledContainer>
        </FullWidthContainer>
    )
};

export default RegistrationLanding;