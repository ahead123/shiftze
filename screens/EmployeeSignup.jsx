import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setDoc, doc } from "firebase/firestore/lite"; 
import { db, auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CredentialsContext } from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Alert } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { 
    InnerContainer, 
    StyledContainer, 
    FullWidthContainer,
    StyledFormArea,
    SubTitle,
    LeftIcon,
    StyledInputLabel,
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
    TextLinkContent,
    HeaderLogo
} from '../components/styles';

const { brand, darkLight, primary } = Colors;
const USER_TYPE = "employee";

const EmployeeSignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Please enter you first and last name!')
      .max(50, 'Please enter you first and last name!')
      .required('Required'),    
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
      .min(12, 'Phone number format: xxx-xxx-xxxx')
      .max(12, 'Phone number format: xxx-xxx-xxxx')
      .required('Required'),
    zipCode: Yup.string()
        .min(5, 'Zip code must be 5 characters!')
        .max(5, 'Zip code cannot be greather than 5 characters!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters!')
        .max(50, 'Password must be at less than 50 characters!!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        .required('Required'),
  });

const EmployeeSignup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const createUserRecord = async (uid, values) => {
       try {
        const userRef = await setDoc(doc(db, "users", uid),{
            full_name: values.fullName,
            email: values.email,
            phone_number: values.phoneNumber,
            zip_code: values.zipCode,            
            user_type: USER_TYPE,
            user_id: uid
        });
        return userRef;
           
       } catch (error) {
           return error
       }
    };

    const handleSignUp = async (values, setSubmitting) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            console.log('************ user_uid *************', userCredential.user.uid);
            const userRef = await createUserRecord(userCredential.user.uid, values);
            console.log('user created successfully', userRef);
            setTimeout(() => {      
                Alert.alert("Account Created Successfully!", `account email: ${userCredential.user.email}!`);
                persistLogin(userCredential.user);                           
                setSubmitting(false);
            },1000);
        } catch (error) {
            setSubmitting(false);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
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
            <KeyboardAvoidingWrapper>
                <StyledContainer style={{ marginTop: -20}}>   
                    <HeaderLogo resizeMode="cover" source={require("../assets/shiftze-logo.png")} style={{ width: 50, height: 50, borderRadius: 25}} />
                    <InnerContainer style={{marginTop: 15}}>                              
                        <SubTitle>Service Professionals Signup</SubTitle>                   
                        <Formik
                            initialValues={{ fullName: '', email: '', phoneNumber: '', zipCode: '', password: '', confirmPassword: '' }}
                            validationSchema={EmployeeSignupSchema}
                            onSubmit={(values, { setSubmitting }) => { 
                                    console.log(values);
                                    setSubmitting(true);
                                    handleSignUp(values, setSubmitting);
                                }
                            }                        
                        >
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, values}) => (
                                <StyledFormArea>
                                    {errors.fullName && touched.fullName && <MsgBox>{errors.fullName}</MsgBox>}
                                    <MyTextInput 
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Cool Kat"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('fullName')} 
                                        onBlur={handleBlur('fullName')} 
                                        value={values.fullName}
                                    />
                                    {errors.email && touched.email && <MsgBox>{errors.email}</MsgBox>}
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
                                    {errors.phoneNumber && touched.phoneNumber && <MsgBox>{errors.phoneNumber}</MsgBox>}
                                    <MyTextInput 
                                        label="Phone Number"
                                        icon="device-mobile"
                                        placeholder="310-555-5555"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('phoneNumber')} 
                                        onBlur={handleBlur('phoneNumber')} 
                                        value={values.phoneNumber}
                                        keyboardType="phone-pad"
                                    />
                                    {errors.zipCode && touched.zipCode && <MsgBox>{errors.zipCode}</MsgBox>}
                                    <MyTextInput 
                                        label="Zip Code"
                                        icon="home"
                                        placeholder="90210"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('zipCode')} 
                                        onBlur={handleBlur('zipCode')} 
                                        value={values.zipCode}
                                        keyboardType="phone-pad"
                                    />
                                    {errors.password && touched.password && <MsgBox>{errors.password}</MsgBox>}
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
                                    {errors.confirmPassword && touched.confirmPassword && <MsgBox>{errors.confirmPassword}</MsgBox>}
                                    <MyTextInput 
                                        label="Confirm Password"
                                        icon="lock"
                                        placeholder="* * * * * * * *"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('confirmPassword')} 
                                        onBlur={handleBlur('confirmPassword')} 
                                        value={values.confirmPassword}
                                        secureTextEntry={hidePassword}
                                        isPassword={true}
                                        hidePassword={hidePassword}
                                        setHidePassword={setHidePassword}
                                    />                                   
                                    {!isSubmitting && (
                                        <StyledButton onPress={handleSubmit}>
                                            <ButtonText>Register</ButtonText>
                                        </StyledButton>
                                    )}
                                    {
                                        isSubmitting && (
                                            <StyledButton disabled={true}>
                                               <ActivityIndicator size="large" color={primary} />
                                            </StyledButton>
                                        )
                                    }
                                    <Line />                             
                                    <ExtraView>
                                        <ExtraText>Already have an account? </ExtraText>
                                        <TextLink>
                                            <TextLinkContent onPress={() => navigation.navigate('Login')}>Login</TextLinkContent>
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
}

export default EmployeeSignup;