import { View, Text, StyleSheet, Image, Slider, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { songs } from '../MusicData';
import TrackPlayer,{Capability} from 'react-native-track-player'

const { width, height } = Dimensions.get('window');

const Music = () => {
  const route = useRoute();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 100);
  }, []);

  useEffect(()=>{
    setupPlayer()
  },[])

  const setupPlayer =async() =>{
   try{
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({

      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
    ],

    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [Capability.Play, Capability.Pause],

    // Icons for the notification on Android (if you don't like the default ones)
});
await TrackPlayer.add(songs)
   }
   catch(e){

   }
  }



  return (
    <View style={styles.container}>
      <View>
        <FlatList
          horizontal
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bannerView}>
                <Image source={item.image} style={styles.banner} />
              </View>
            );
          }}
        />
      </View>
      <Text style={styles.name}>{route.params.data.title}</Text>
      <Text style={styles.name}>{route.params.data.singer}</Text>
      <View style={styles.sliderView}>
        <Slider />
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity
          onPress={() => {
            if (currentSong > 0) {
              setCurrentSong(currentSong - 1);
              flatListRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentSong) - 1,
              });
            }
          }}>
          <Image source={require('../images/previous.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
         onPress={async() => {
       await    TrackPlayer.skip(1)
       await TrackPlayer.play()
         }}
        >
          <Image source={require('../images/Pause.png')} style={[styles.icon, { width: 50, height: 50 }]} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (songs.length - 1 > currentSong) {
              setCurrentSong(currentSong + 1);
              flatListRef.current.scrollToIndex({
                animated: true,
                index: parseInt(currentSong) + 1,
              });
            }
          }}>
          <Image source={require('../images/forward.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity>
          <Image source={require('../images/repeat.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../images/shuffle.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {
    width: width,
    height: (height / 2) - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'grey',
    marginLeft: 20,
    marginTop: 10,
  },
  sliderView: {
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
  },
  btnArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 50,
    alignItems: 'center',
  },
  icon: {
    height: 35,
    width: 35,
  },
});
