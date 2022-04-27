import styled from 'styled-components/native';
import { View, Image, Text, ImageBackground, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// colors 
export const Colors = {
    primary: "#ffffff",
    secondary: "#e5e7eb",
    teritary: "#1f2937",
    darklight: "#9ca3af",
    brand: "#E95E2D",
    green: "#10b981",
    red: "#ef4444",
    dark: "#000000"
}

const { primary, secondary, teritary, darklight, brand, green, red, dark } = Colors;

export const FullWidthContainer = styled.View `
    flex: 1;
    paddingTop: ${StatusBarHeight + 20}px;
    background-color: ${dark};
`;

export const StyledContainer = styled.View `
    flex: 1;
    background-color: ${dark};
    padding: ${StatusBarHeight + 10}px;
    padding-top: 70px;
`;

export const InnerContainer = styled.View `
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const WelcomeConatiner = styled(InnerContainer)
`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const BackgroundImage = styled.ImageBackground `
    width: 100%;
    height: 200px;
`;

export const PageLogo = styled.Image `
    width: 95px;
    height: 95px;
    position: absolute;
    left: ${windowWidth / 2 - 45}px;
    top: 190px;
    border-radius: 50px;
    z-index: 100000;    
`;

export const HeaderLogo = styled.Image `
    width: 50px;
    height: 50px;
    position: absolute;
    left: ${windowWidth / 2 - 25}px;
    top: 20px;
    border-radius: 25px;
    z-index: 100000;        
`;

export const PageTitle = styled.Text `
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: ${primary};
    padding: 10px;
`;

export const SubTitle = styled.Text `
    font-size: 18px;
    text-align: center;
    font-weight: bold;    
    color: ${primary};
    margin-bottom: 20px;
`;

export const StyledFormArea = styled.View `
    width: 90%;
`;

export const StyledTextInput = styled.TextInput `
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${teritary};
`;

export const StyledInputLabel = styled.Text `
    color: ${primary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View `
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 100000;
`;

export const RightIcon = styled.TouchableOpacity `
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 100000;
`;

export const StyledButton = styled.TouchableOpacity `
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;
    align-items: center;

    ${(props) => props.google === true && `
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text `
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google === true && `
        padding: 5px;

    `}
`;

export const MsgBox = styled.Text `
    text-align: center;
    font-size: 13px;
    color: ${red};
`;

export const Line = styled.View `
    height: 1px;
    width: 100%;
    background-color: ${darklight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View `
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text `
    justify-content: center;
    align-items: center;
    color: ${primary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

export const StyledMap = styled(MapView) `
    width: ${windowWidth}px;
    height: ${windowHeight / 3}px;
`;