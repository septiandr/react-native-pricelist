import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import SearchBar from './SearchBar';

const data = [
  {
    "tanggal": "Senin, 5 November 2018",
    "pelanggan": "Bapak Alex",
    "meja": "2",
    "total": 44250,
    "jam": "10:21"
  },
  {
    "tanggal": "Senin, 5 November 2018",
    "driver": "Sukijo",
    "pemesan": "Ibu Anis",
    "total": 50000,
    "jam": "10:15"
  },
  {
    "tanggal": "Senin, 5 November 2018",
    "pelanggan": "Bapak Sony",
    "total": 150000,
    "jam": "10:10"
  },
  {
    "tanggal": "Minggu, 4 November 2018",
    "pelanggan": "Ibu Amel",
    "total": 150000,
    "jam": "10:15"
  }
];



const Item = ({ item }) => {
  const formattedTotal = item.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  return (
    <View style={{ backgroundColor: 'white', margin: 10, padding: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          {item.pelanggan && (
            <Text >Pelanggan: {item.pelanggan}</Text>
          )}
          {item.meja && (
            <Text>Meja: {item.meja}</Text>
          )}
          {item.driver && (
            <Text >Driver: {item.driver}</Text>
          )}
          {item.pemesan && (
            <Text >pemesan: {item.pemesan}</Text>
          )}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          {item.total && (
            <Text >{formattedTotal}</Text>
          )}
          <Text>{item.jam}</Text>
        </View>
      </View>
    </View>
  );
};

const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [groupedData, setGroupedData] = useState({}); // Initialize groupedData

  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(
      (item) =>
        item.pelanggan?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.driver?.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleDateSearch = (dateText) => {
    if (!dateText) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(
      (item) => item.tanggal.toLowerCase().includes(dateText.toLowerCase())
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    const updatedGroupedData = {};
    filteredData.forEach((item) => {
      const date = item.tanggal;
      if (!updatedGroupedData[date]) {
        updatedGroupedData[date] = [];
      }
      updatedGroupedData[date].push(item);
    });

    console.log("🚀 ~ App ~ updatedGroupedData:", updatedGroupedData);
    setGroupedData(updatedGroupedData); // Update groupedData
  }, [filteredData]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar handleSearch={handleSearch} handleDateSearch={handleDateSearch} />
      <FlatList
        data={Object.entries(groupedData)}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                backgroundColor: 'lightgray',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                flexDirection: 'row', justifyContent: 'space-between'
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{item[0]}</Text>
              <Text>Total: {item[1].reduce((total, curr) => total + curr.total, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</Text>
            </View>
            {item[1].map((subItem) => (
              <Item key={subItem.jam} item={subItem} />
            ))}
          </>
        )}
        keyExtractor={(item) => item[0]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <TouchableOpacity>
          <Text style={{ color: 'green' }}>Kembali</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, borderRadius: 5, marginRight: 10 }}>
            <Text style={{ color: 'white' }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'green', padding: 5, borderRadius: 5 }}>
            <Text style={{ color: 'white' }}>Cetak Ulang</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{ color: 'green' }}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
