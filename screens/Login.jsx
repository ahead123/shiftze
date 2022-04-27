import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import { auth, provider } from '../auth/firebase';
import { CredentialsContext } from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { 
    InnerContainer, 
    StyledContainer, 
    BackgroundImage, 
    PageTitle, 
    FullWidthContainer,
    PageLogo,
    StyledFormArea,
    SubTitle,
    LeftIcon,
    StyledInputLabel,
    StyledInput,
    StyledButton,
    ButtonText,
    Colors,
    StyledTextInput,
    RightIcon,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const { brand, darkLight, primary } = Colors;

const Login = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [hidePassword, setHidePassword] = useState(true);
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

    const handleLogin = (email, password, setSubmitting) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                setTimeout(() => {      
                    Alert.alert("Login Successful", `Welcome back ${user.email}!`);
                    persistLogin(user);                           
                    setSubmitting(false);
                },1000);                                             
        })
        .catch(error => {
            if(error.message.indexOf("wrong-password")>-1){
                setTimeout(() => {
                    Alert.alert("Failed Login", "Incorrect password", [{text: "Try Again"}]);
                    setSubmitting(false);
                }, 1000);
            }else if(error.message.indexOf("user-not-found")>-1){
                setTimeout(() => {
                    Alert.alert("Failed Login", "No user found with that email", [{text: "Try Again"}]);
                    setSubmitting(false);
                }, 1000);
            }else{
                setTimeout(() => {
                    Alert.alert("Failed Login", error.message, [{text: "Try Again"}]);
                    setSubmitting(false);
                }, 1000);
            }
        })

    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log('user',user);
                setIsGoogleSubmitting(false);
                setIsGoogleSignIn(false);               
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log('errorMessage',errorMessage);
                setIsGoogleSubmitting(false);
                setIsGoogleSignIn(false);                
            });
    };

    const persistLogin = (credentials) => {
        AsyncStorage.setItem("shiftzeCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch(error => {
                Alert.alert("Error",error.message)
                console.log(error)
            });
    };

    return (
        <FullWidthContainer>
            <StatusBar style="light" />
            <BackgroundImage resizeMode="cover" source={require("../assets/restaurant_guys_chatting.png")}/>   
            <PageLogo resizeMode="cover" source={require("../assets/shiftze-logo.png")} />  
            <KeyboardAvoidingWrapper>
                <StyledContainer>            
                    <InnerContainer>                
                        <SubTitle>Account Login</SubTitle>                   
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);                            
                                if(values.email === '' || values.password === '') {
                                    Alert.alert('Error', 'Please fill in all fields.');
                                    setSubmitting(false);
                                }else{
                                    handleLogin(values.email, values.password, setSubmitting);
                                }                                
                             }}                        
                        >
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, values}) => (
                                <StyledFormArea>
                                    <MyTextInput 
                                        label="Email Address"
                                        icon="mail"
                                        placeholder="coolkat@shiftze.com"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('email')} 
                                        onBlur={handleBlur('email')} 
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    <MyTextInput 
                                        label="Password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('password')} 
                                        onBlur={handleBlur('password')} 
                                        value={values.password}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />
                                    <MsgBox>...</MsgBox>
                                    {   
                                        isSubmitting && (
                                            <StyledButton disabled={true}>
                                                <ActivityIndicator size="large" color={primary} />
                                            </StyledButton>
                                        )
                                    } 
                                    {
                                        !isSubmitting && ( 
                                            <StyledButton onPress={handleSubmit}>
                                                <ButtonText>Sign in</ButtonText>
                                            </StyledButton>
                                        )
                                    }                                  
                                    <Line />
                                    {
                                        isGoogleSubmitting && (
                                            <StyledButton google={true} disabled={true}>
                                                <ActivityIndicator size="large" color={primary} />
                                            </StyledButton>
                                        )
                                    }
                                   {
                                        !isGoogleSubmitting && (
                                            <StyledButton google={true} onPress={() => {
                                                setIsGoogleSignIn(true);
                                                setIsGoogleSubmitting(true);
                                                handleGoogleLogin();
                                            }}>
                                                <Fontisto name="google" size={25} color={primary} />
                                                <ButtonText google={true}>Sign in with Google</ButtonText>
                                            </StyledButton>
                                        )
                                   }
                                    <ExtraView>
                                        <ExtraText>Don't have an account? </ExtraText>
                                        <TextLink>
                                            <TextLinkContent onPress={() => navigation.navigate('RegistrationLanding')}>Sign up</TextLinkContent>
                                        </TextLink>
                                    </ExtraView>
                                </StyledFormArea>
                            )}
                        </Formik>
                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        </FullWidthContainer>
    )
};

const MyTextInput = ({label, icon, isPassword, setHidePassword, hidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
};



export default Login;