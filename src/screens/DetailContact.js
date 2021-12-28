import React, { useEffect, useState } from 'react';
import {Box, NativeBaseProvider, Text, Image, VStack, Input, HStack, Button, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetailContact = ({route}) => {
    const [result, setResult] = useState([]);
    const navigation = useNavigation();

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newAge, setNewAge] = useState('')

    const {itemID} = route.params;
    const {uri} = route.params;

    //get contact with Id
    const getContact =  async() =>{
        await fetch ('https://simple-contact-crud.herokuapp.com/contact/'+itemID,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
            // console.log(responseJson)
            setResult(responseJson.data);
            setNewFirstName(responseJson.data.firstName);
            setNewLastName(responseJson.data.lastName);
            setNewAge(responseJson.data.age.toString())
            // setUriImage(result.photo)
        }) 
        .catch (error=> {
            setErrorMessage('Something went wrong')
        })
    
    };

    const updateContact = async () =>{
        let data = {
            "firstName" : newFirstName,
            "lastName"  : newLastName,
            "age"       : parseInt(newAge)
        }
        await fetch ('https://simple-contact-crud.herokuapp.com/contact/'+itemID,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)})
        .then(response => {
            console.log(response.status)
        }) 
        .catch (error=> {
            setErrorMessage('Something went wrong')
        })
    }

    const deleteContact = async () =>{
        await fetch ('https://simple-contact-crud.herokuapp.com/contact/'+itemID,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.status)
        }) 
        .catch (error=> {
            setErrorMessage('Something went wrong')
        })
    
    };

    const checkVal = () => {
        console.log(newFirstName, newLastName)
        if (newAge > 200 || newAge == 0) {
            Alert.alert(
                "Failed input contact",
                "Age cannot be more than 200 or equal to 0",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
            )
        }
        else if(newFirstName === '' || newLastName === '' || newAge === ''){
            Alert.alert(
                "Failed input contact",
                "First name or last name or age cannot be Empty",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
            )
        }
        else{
            updateContact();
            Alert.alert(
                "Success update contact",
                "Contact successfully updated",
                [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => navigation.navigate('Home') }
                  ]
            )
            
        }
        
    }
    
    useEffect(()=> {
        getContact()
        // console.log(result)
    },[])
    
return(
    <NativeBaseProvider>
        <VStack alignItems={'center'} mb={4} ml={4} space={2} bgColor={'white'} height={'100%'}>
            {/* {console.log(result.photo)} */}
            <Box mt={20} borderWidth={5} borderColor={'muted.400'} rounded={'full'}>
                {uri != 'N/A'? 
                <Image 
                    source={{
                        uri:uri
                    }}
                    width={100}
                    height={100}
                    rounded={'full'}
                    alt='profileImage'
                /> : 
                <Image 
                    source={require('../../assets/userDef.jpg')}
                    width={100}
                    height={100}
                    rounded={'full'}
                    alt='profileImage'
                />
                }
            </Box>
            <Text fontWeight={'bold'} fontSize={24}>{newFirstName + ' '+ newLastName}</Text>
            <Text fontSize={20}>{newAge} years old</Text>
            <HStack space={4} mt={3}>    
                <Pressable bgColor={'muted.200'} width={50} height={50} alignItems={'center'} justifyContent={'center'} borderRadius={10}>
                    <Icon name="call-outline" size={30} color="#047857" />
                </Pressable>
                <Pressable bgColor={'muted.200'} width={50} height={50} alignItems={'center'} justifyContent={'center'} borderRadius={10}>
                    <Icon name="chatbox-outline" size={30} color="#1a91ff" />
                </Pressable>
                <Pressable bgColor={'muted.200'} width={50} height={50} alignItems={'center'} justifyContent={'center'} borderRadius={10}>
                    <Icon name="videocam-outline" size={30} color="#b91c1c" />
                </Pressable>
            </HStack>
            

            <Input mt={10}
                value={newFirstName}
                onChangeText={(text) => setNewFirstName(text)}
                placeholder='First name'
                size={'lg'}
                width={'80%'}
                // bgColor={'muted.200'}
                // borderRadius={15}
                variant="underlined"
            />
            <Input mt={2}
                value={newLastName}
                onChangeText={(text) => setNewLastName(text)}
                placeholder='Last name'
                size={'lg'}
                width={'80%'}
                // borderRadius={15}
                // bgColor={'muted.200'}
                variant="underlined"

            />
            <Input mt={2}
                value={newAge}
                onChangeText={(text) => setNewAge(text)}
                placeholder='age'
                size={'lg'}
                width={'80%'}
                // borderRadius={15}
                // bgColor={'muted.200'}
                variant="underlined"

            />
            <HStack space={2} mt={5}>
                <Button colorScheme='primary' borderRadius={10} onPress={() => checkVal()}>Update</Button>
                <Button colorScheme='danger' borderRadius={10} onPress={()=> deleteContact()}>Delete</Button>
            </HStack>
        </VStack>
    </NativeBaseProvider>
)
}

export default DetailContact;