import React from 'react';
import {NativeBaseProvider, FlatList, Text} from 'native-base';

const ContactList = ({results}) => {
    return(
        <NativeBaseProvider>
            <Text>Contact</Text>
            <FlatList 
                data={results}
                keyExtractor={(result)=> result.id}
                renderItem={(item) => {
                    return <Text>{item.firstName}</Text> 
                }}
            />
        </NativeBaseProvider>
    )
}

export default ContactList;