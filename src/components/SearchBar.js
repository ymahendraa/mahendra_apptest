import React from 'react';
import {Input, NativeBaseProvider, SearchIcon} from 'native-base';

// search bar component
const SearchBar = () => {
    
return(
    <NativeBaseProvider>
        <Input
            w={{
            base: "75%",
            md: "25%",
            }}
            InputLeftElement={
                <SearchIcon size={5} color={'muted.500'} ml={2}/>
              }
        placeholder="Search Contact"
        alignSelf={'center'}
        mt={5}
        borderRadius={20}
        borderWidth={2}
      />
    </NativeBaseProvider>
)
}

export default SearchBar;