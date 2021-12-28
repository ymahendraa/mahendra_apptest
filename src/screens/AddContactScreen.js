import React, {useState} from 'react';
import {NativeBaseProvider, Text, VStack, Image, Box,  Input, HStack, Button} from 'native-base';
import { Alert } from 'react-native';

const AddContact = () => {
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newAge, setNewAge] = useState('')

    const addContact = async () =>{
        let data = {
            "firstName" : newFirstName,
            "lastName"  : newLastName,
            "age"       : parseInt(newAge)
        }
        console.log(data)
        return await fetch('https://simple-contact-crud.herokuapp.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)})
            .then(response => {
                if(response.status==201){
                    console.log('Success add data')
                }else{
                    console.log(response.status)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
            addContact();
            Alert.alert(
                "Success input contact",
                "Contact successfully saved",
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
        
    }
return(
    <NativeBaseProvider>
         <VStack alignItems={'center'} mb={4} ml={4} space={2} bgColor={'white'} height={'100%'} >
            <Box mt={10} borderWidth={5} borderColor={'muted.400'} rounded={'full'}>
                <Image 
                    source={require('../../assets/userDef.jpg')}
                    width={100}
                    height={100}
                    rounded={'full'}
                    alt='profileImage'
                />
            </Box>
            {newFirstName != '' || newLastName != '' || newAge != '' ? 
                <Box alignItems={'center'}>
                    <Text fontWeight={'bold'} fontSize={24}>{newFirstName + ' ' + newLastName}</Text>
                    <Text fontSize={20}>{newAge} years old</Text>
                </Box>
                 : null
            }
            
            <Input mt={10}
                onChangeText={(text) => setNewFirstName(text)}
                placeholder='First name'
                size={'lg'}
                width={'80%'}
                borderRadius={15}
            />
            <Input mt={2}
                onChangeText={(text) => setNewLastName(text)}
                placeholder='Last name'
                size={'lg'}
                borderRadius={15}
                width={'80%'}
            />
            <Input mt={2}
                onChangeText={(text) => setNewAge(text)}
                placeholder='Age'
                size={'lg'}
                borderRadius={15}
                width={'80%'}
            />
            <HStack space={2} mt={5}>
                <Button colorScheme='success' borderRadius={10} onPress={() => {checkVal()}}>Save</Button>
            </HStack>
        </VStack>
    </NativeBaseProvider>
)
}

export default AddContact;