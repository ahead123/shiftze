import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import { CredentialsContext } from '../components/CredentialsContext';
import { 
    InnerContainer, 
    StyledContainer,     
    FullWidthContainer,
    Colors,
    StyledMap,
    SubTitle,
    PageTitle
} from '../components/styles';

const { brand, darkLight, primary, dark } = Colors;
const StatusBarHeight = Constants.statusBarHeight;

const JobListings = () => {
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { email } = storedCredentials;
    const [pin, setPin] = useState({
        latitude: 33.822420,
        longitude: -118.291180,
    });
    const [region, setRegion] = useState({
        latitude: 33.822420,
        longitude: -118.291180,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [description, setDescription] = useState('');

    return (
        <FullWidthContainer>
            <StatusBar style="light" /> 
            <GooglePlacesAutocomplete
                    placeholder="Search"
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}
                    query={{
                        key: Constants.manifest.extra.GOOGLE_API_KEY,
                        language: 'en',
                        components: 'country:us',
                        radius: '8000',
                        location: `${region.latitude},${region.longitude}`,
                    }}
                    onPress={(data, details = null) => {
                        console.log('data', data);
                        console.log('details', details);
                        const { geometry: { location } } = details;
                        setRegion({
                            latitude: location.lat,
                            longitude: location.lng,
                        });
                        setDescription(data.description);
                    }}
                    onFail={(error) => console.error(error)} 
                    styles={{
                        container: { 
                            flex: 0, 
                            position: "absolute", 
                            width: "100%", 
                            zIndex: 1, 
                            paddingTop: 
                            StatusBarHeight + 20,
                            backgroundColor: dark
                        },
                        listView: { backgroundColor: primary },
                        textInputContainer: {
                            backgroundColor: dark,
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            
                        },
                    }}                                                   
                />
            <StyledMap                                
                initialRegion={{
                    latitude: 33.822420,
                    longitude: -118.291180,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}                         
            >
                <Marker 
                    coordinate={region}
                    pinColor={brand}   
                    title={description}                
                />
                <Marker 
                    coordinate={pin}
                    title={'Your Location'}
                    draggable={true}
                    onDragEnd={e => {                       
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        });
                    }}                    
                />                           
            </StyledMap>
            <StyledContainer>
                <InnerContainer>
                    <PageTitle>Job Listings</PageTitle>
                    <SubTitle>{`${email}` || 'no user found'}</SubTitle>
                </InnerContainer>
            </StyledContainer>
        </FullWidthContainer>
    )
};

export default JobListings;