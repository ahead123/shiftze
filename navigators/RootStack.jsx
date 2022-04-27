import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { CredentialsContext } from '../components/CredentialsContext';
import Login from '../screens/Login';
import RegistrationLanding from '../screens/RegistrationLanding';
import BusinessSignup from '../screens/BusinessSignup';
import EmployeeSignup from '../screens/EmployeeSignup';
import Home from '../screens/Home';
import JobListings from '../screens/JobListings';
import UserProfile from '../screens/UserProfile';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

import { Colors } from '../components/styles';

const { primary, dark, brand, darklight, secondary, teritary } = Colors;

const RootStack = () => {
    const { storedCredentials } = useContext(CredentialsContext);
    return (
        <NavigationContainer>            
                {storedCredentials === null ? (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="RegistrationLanding" component={RegistrationLanding} options={{ headerShown: false }} />
                        <Stack.Screen name="BusinessSignup" component={BusinessSignup} options={{ headerShown: false }} />
                        <Stack.Screen name="EmployeeSignup" component={EmployeeSignup} options={{ headerShown: false }} />
                 
                    </Stack.Navigator>
                ) : ( 
                    <BottomTab.Navigator 
                        initialRouteName="Home"
                        screenOptions={{
                            tabBarStyle: {
                                backgroundColor: dark,                                                                                                               
                            },
                            tabBarActiveTintColor: brand,
                            tabBarInactiveTintColor: darklight,
                        }}
                    >
                        <BottomTab.Screen name="Home" component={Home} options={{ 
                                headerShown: false,
                                tabBarIcon: () => <FontAwesome name="home" color={primary} size={25} />
                            }}     
                        />
                        <BottomTab.Screen name="Job Listings" component={JobListings} options={{ 
                                headerShown: false,
                                tabBarIcon: () => <FontAwesome name="briefcase" color={primary} size={25} />
                            }} 
                        />
                        <BottomTab.Screen name="Profile" component={UserProfile} options={{ 
                                headerShown: false,
                                tabBarIcon: () => <FontAwesome name="user" color={primary} size={25} />
                            }} 
                        />
                    </BottomTab.Navigator> 
                )}                    
            
        </NavigationContainer>
    );

}

export default RootStack;