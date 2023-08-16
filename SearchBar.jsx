import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ handleSearch, handleDateSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        handleSearch(text);
    };

    const handleStartDateChange = (text) => {
        setStartDate(text);
        handleDateSearch(startDate, endDate);
    };

    const handleEndDateChange = (text) => {
        setEndDate(text);
        handleDateSearch(startDate, endDate);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="search" size={20} color="green" />
                <Text style={{ marginLeft: 10, color: 'green' }}>Search by keyword...</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    placeholder="Start Date"
                    value={startDate}
                    onChangeText={handleStartDateChange}
                    style={{ marginRight: 10, color: 'green' }}
                />
                <Text>-</Text>
                <TextInput
                    placeholder="End Date"
                    value={endDate}
                    onChangeText={handleEndDateChange}
                    style={{ marginLeft: 10, color: 'green' }}
                />
                <Icon name="calendar" size={20} color="green" style={{ marginLeft: 10 }} />
            </View>
        </View>
    );
};

export default SearchBar;
