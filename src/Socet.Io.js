import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';

const App = () => {
  // let socket;
  // useEffect(() => {
  //   socket = io('http://192.168.29.44:3000');
  // }, []);

  const [chatInput, setchatInput] = useState('');
  const [messages, setmessages] = useState([]);
  let socket = io('http://192.168.29.44:3000');

  // const checkServerMessage = () => {
  //   console.log('function called');

  socket.on('serverMessage', serverMessage => {
    console.log('message from server is', serverMessage);
    setmessages([...messages, serverMessage]);
  });
  // };

  const handleSendMessage = () => {
    // let socket = io('http://192.168.29.44:3000');

    socket.emit('message', chatInput);
    setchatInput('');
    // checkServerMessage();
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <View style={styles.parent}>
      <View style={styles.inputParent}>
        <View style={styles.chaytInput}>
          <TextInput
            placeholder="Type anything here..."
            value={chatInput}
            onChangeText={text => {
              setchatInput(text);
            }}
            onSubmitEditing={handleSendMessage}
          />
        </View>
        {chatInput && (
          <TouchableOpacity style={styles.sendIcon} onPress={handleSendMessage}>
            <Image
              source={{
                uri: 'https://icon2.cleanpng.com/20180423/vgw/kisspng-computer-icons-blog-thepix-5add9cd7695034.8930483315244730474314.jpg',
              }}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        )}
        {chatInput && (
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={() => {
              setchatInput('');
            }}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZLMTnHF-9Zj7dAJcEz3x81Xghlw8rcIIcg&usqp=CAU',
              }}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.messageDisplay}>
        <FlatList
          data={messages}
          // nestedScrollEnabled={true}
          renderItem={item => {
            // console.log(item);
            return (
              <TouchableOpacity style={styles.messageDisplayInsideFlatList}>
                <Text>
                  {item.index + 1}) {item?.item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'white',
    flex: 1,
  },
  chaytInput: {
    backgroundColor: 'black',
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 15,
    elevation: 5,
  },
  inputParent: {},
  sendIcon: {
    position: 'absolute',
    right: 25,
    top: 15,
  },
  clearIcon: {
    position: 'absolute',
    right: 55,
    top: 15,
  },
  messageDisplay: {
    marginHorizontal: 10,
    marginTop: 15,
    height: 350,
  },
  messageDisplayInsideFlatList: {
    backgroundColor: 'red',
    marginVertical: 3,
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
});
