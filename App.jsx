import React, { useState } from 'react';
import RootStack from "./navigators/RootStack";
import AppLoading from "expo-app-loading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['AsyncStorage']);


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState(null);

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("shiftzeCredentials")
      .then((result) => {
        if(result !== null){
          setStoredCredentials(JSON.parse(result));
        }else{
          setStoredCredentials(null);
        }
      })
      .catch( error => console.log(error))
  };

  if(!appReady) {
    return (
      <AppLoading 
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={() => console.log("Error loading app")}
      />
    )
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials}}>
      <RootStack />  
    </CredentialsContext.Provider>
  )
}
