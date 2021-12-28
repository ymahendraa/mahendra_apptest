import React, {useState, useEffect} from 'react';
import {Box, HStack, Image, NativeBaseProvider, Text, AddIcon, Pressable,Input, SearchIcon} from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../components/SearchBar';

//Home screen for showing contact list
const HomeScreen = () => {
    const [results, setResults] = useState([]);
    // const [filteredResult, setFilteredResult] = useState([]);
    // const [search, setSearch] = useState('')
    const navigation = useNavigation();

    const searchAPI = async () =>{
            // const response = await axios.get('https://simple-contact-crud.herokuapp.com/contact');
            await fetch ('https://simple-contact-crud.herokuapp.com/contact',{
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(responseJson => {
                setResults(responseJson.data);
                // setFilteredResult(responseJson.data)
            }) 
            .catch (error=> {
                setErrorMessage('Something went wrong')
            })
        
    };

    // const searchFilter = (text) => {
    //     if (text) {
    //         const newResult = results.filter((result) => {
    //             const resultData = result.firstName ?
    //                 result.firstName.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return resultData.indexOf(textData) > -1;
    //         });
    //         setFilteredResult(newResult);
    //         setSearch(text)
    //     }else{
    //         setFilteredResult(results);
    //         setSearch(text)
    //     }
    // }

    const RenderComponent = ({contact}) => {
        return (
            <Box>
              <TouchableOpacity onPress={() => {navigation.navigate('DetailContact', {itemID : contact.id, uri: contact.photo})}}>
                <HStack alignItems={'center'} mb={4} ml={4}  space={2} mt={3}>
                    <Box>
                        {contact.photo != 'N/A'? 
                        <Image 
                            source={{
                                uri:contact.photo
                            }}
                            width={50}
                            height={50}
                            rounded={'full'}
                            alt='profileImage'
                        /> : 
                        <Image 
                            source={require('../../assets/userDef.jpg')}
                            width={50}
                            height={50}
                            rounded={'full'}
                            alt='profileImage'
                        />
                    }
                    </Box>
                    <Text fontWeight={'bold'}>{contact.firstName} {contact.lastName}</Text>
                </HStack>
                </TouchableOpacity>
                <Box height={0.5} width={350}bgColor={'muted.200'} alignSelf={'center'}/>  
            </Box>
            

        )
        
    }

    useEffect(()=> {
        searchAPI()
    },[searchAPI])
    return(
        <NativeBaseProvider>
            <Box bgColor={'white'} height={'100%'}>
                <HStack alignItems={'center'} mt={5}>
                    <Text fontWeight={'bold'} fontSize={30} mt={2} ml={5}>My Contact</Text>
                    <Pressable marginLeft={160} mt={2} onPress={() => {navigation.navigate('AddContactScreen')}}>
                        <AddIcon size={6} color='#171717' ml={2} />
                    </Pressable>
                </HStack>
                
                {/* <Input
                    w={{
                    base: "75%",
                    md: "25%",
                    }}
                    fontSize={15}
                    InputLeftElement={
                        <SearchIcon size={5} color={'muted.500'} ml={2}/>
                    }
                    placeholder="Search Contact"
                    alignSelf={'center'}
                    mt={5}
                    borderRadius={20}
                    borderWidth={2}
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                /> */}
                <Text mt={2} left={300} mb={2}>{results.length} contacts</Text>
                
                <Box mb={40}>
                    <FlatList 
                    data={results}
                    keyExtractor={(result) => result.id}
                    renderItem={({item}) => {
                        return <RenderComponent contact={item} />
                    }}
                />
                </Box>
            </Box>
            
            
            
            
        </NativeBaseProvider>
    )
}

export default HomeScreen;