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
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
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
    TextLinkContent,
    HeaderLogo
} from '../components/styles';

const { brand, darkLight, primary } = Colors;
const USER_TYPE = "business";

const BusinessSignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Please enter you first and last name!')
      .max(50, 'Please enter you first and last name!')
      .required('Required'),    
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
      .min(12, 'Phone number format: xxx-xxx-xxxx')
      .max(12, 'Phone number format: xxx-xxx-xxxx')
      .required('Required'),
    businessName: Yup.string()
        .min(2, 'Please enter a business name!')
        .max(50, 'Please enter a business name!')
        .required('Required'),
    businessAddress: Yup.string()
        .min(2, 'Please enter a business address!')
        .max(100, 'Please enter a business address!')
        .required('Required'),
    zipCode: Yup.string()
        .min(5, 'Zip code must be 5 characters!')
        .max(5, 'Zip code cannot be greather than 5 characters!')
        .required('Required'),
    city: Yup.string()
        .min(2, 'Please enter a city!')
        .max(30, 'Please enter a city!')
        .required('Required'),
    state: Yup.string()
        .min(2, 'Please select a state!')
        .max(2, 'Please select a state!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters!')
        .max(50, 'Password must be at less than 50 characters!!')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match!')
        .required('Required'),
  });

const BusinessSignup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const createUserRecord = async (uid, values) => {
        try {
         const userRef = await setDoc(doc(db, "users", uid),{
             full_name: values.fullName,
             email: values.email,
             phone_number: values.phoneNumber,
             business_name: values.businessName,    
             business_address: values.businessAddress,
             business_zip_code: values.zipCode,
             business_city: values.city,
             business_state: values.state,         
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
                        <SubTitle>Business Signup</SubTitle>                   
                        <Formik
                            initialValues={{ 
                                fullName: '', 
                                email: '', 
                                phoneNumber: '', 
                                businessName: '', 
                                businessAddress: '', 
                                zipCode: '', 
                                city: '',
                                state: '',
                                password: '', 
                                confirmPassword: '' 
                            }}
                            validationSchema={BusinessSignupSchema}
                            onSubmit={(values, { setSubmitting }) => { 
                                    console.log(values);
                                    setSubmitting(true);
                                    handleSignUp(values, setSubmitting);
                                }
                            }                        
                        >
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, values}) => (
                                <StyledFormArea>
                                    { errors && touched && <MsgBox>{errors.fullName}</MsgBox> }
                                    <MyTextInput 
                                        label="Full Name"
                                        icon="person"
                                        placeholder="Cool Kat"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('fullName')} 
                                        onBlur={handleBlur('fullName')} 
                                        value={values.fullName}
                                    />
                                    { errors && touched && <MsgBox>{errors.email}</MsgBox> }
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
                                    { errors && touched && <MsgBox>{errors.phoneNumber}</MsgBox> }
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
                                    { errors && touched && <MsgBox>{errors.businessName}</MsgBox> }
                                    <MyTextInput 
                                        label="Business Name"
                                        icon="home"
                                        placeholder="business name"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('businessName')} 
                                        onBlur={handleBlur('businessName')} 
                                        value={values.businessName}
                                    />
                                    { errors && touched && <MsgBox>{errors.businessAddress}</MsgBox> }
                                    <MyTextInput 
                                        label="Business Address"
                                        icon="home"
                                        placeholder="street address"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('businessAddress')} 
                                        onBlur={handleBlur('businessAddress')} 
                                        value={values.businessAddress}
                                    />                                   
                                    { errors && touched && <MsgBox>{errors.city}</MsgBox> }
                                    <MyTextInput 
                                        label="City"
                                        icon="home"
                                        placeholder="city"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('city')} 
                                        onBlur={handleBlur('city')} 
                                        value={values.city}
                                    />
                                    { errors && touched && <MsgBox>{errors.state}</MsgBox> }
                                    <MyTextInput 
                                        label="State"
                                        icon="home"
                                        placeholder="state"
                                        placeholderTextColer={darkLight} 
                                        onChangeText={handleChange('state')} 
                                        onBlur={handleBlur('state')} 
                                        value={values.state}                                        
                                    />
                                     { errors && touched && <MsgBox>{errors.zipCode}</MsgBox> }
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
                                    { errors && touched && <MsgBox>{errors.password}</MsgBox> }
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
                                    { errors && touched && <MsgBox>{errors.confirmPassword}</MsgBox> }
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
                                    <MsgBox>...</MsgBox>
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

export default BusinessSignup;