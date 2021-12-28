import React,{useState} from 'react';
import {NativeBaseProvider, VStack, Box, Image, Text, HStack, Input, Button} from 'native-base';

const Contact = ({result, uri, newContact}) => {
    // const [oldFirstName, setOldFirstName] = useState(result.firstName)
    // const [oldLastName, setOldLastName] = useState(result.lastName)
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')

    const addContact = async () =>{
        let data = {
            "firstName" : newFirstName,
            "lastName"  : newLastName
        }
        return await fetch('https://simple-contact-crud.herokuapp.com/contact/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)})
            .then(response => {
                if(response.status==201){
                    console.log('Success add data')
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
return(
    <NativeBaseProvider>
        {!newContact? 
        <VStack alignItems={'center'} mb={4} ml={4}  space={2}>
            <Box mt={10}>
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
            <Input mt={10}
                value={result.firstName}
                size={'lg'}
                width={'80%'}
                placeholder='First name'

            />
            <Input mt={2}
                value={result.lastName}
                size={'lg'}
                width={'80%'}
                placeholder='Last name'

            />
            <HStack space={2} mt={5}>
                <Button colorScheme='warning' borderRadius={10}>Update</Button>
                <Button colorScheme='danger' borderRadius={10}>Delete</Button>
            </HStack>
        </VStack> :

        <VStack alignItems={'center'} mb={4} ml={4} space={2}>
            <Box mt={10}>
                <Image 
                    source={require('../../assets/userDef.jpg')}
                    width={100}
                    height={100}
                    rounded={'full'}
                    alt='profileImage'
                />
            </Box>
            <Input mt={10}
                onChangeText={(text) => setNewFirstName(text)}
                placeholder='First name'
                size={'lg'}
                width={'80%'}
            />
            <Input mt={2}
                onChangeText={(text) => setNewLastName(text)}
                placeholder='Last name'
                size={'lg'}
                width={'80%'}
            />
            <HStack space={2} mt={5}>
                <Button colorScheme='success' borderRadius={10} onPress={() => addContact()}>Save</Button>
            </HStack>
        </VStack>
        }
    </NativeBaseProvider>
)
}

export default Contact;