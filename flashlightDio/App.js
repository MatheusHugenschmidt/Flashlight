import React, {useState, useEffect} from "react";
import { View, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
import lightOff from './assets/icons/eco-light-off.png';
import lightOn from './assets/icons/eco-light.png';
import dioWhite from './assets/icons/logo-dio-white.png';
import dioColor from './assets/icons/logo-dio.png';



const App = ()=>{
  const [toggle, setToggle] = useState(true);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() =>{
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    //quando o celular for chacoalhado, mudaremos o toggle
    const subcription = RNShake.addListener(()=>{
      handleChangeToggle(oldToggle => !oldToggle);
    });
    return () => subcription.remove();
  },[]);
  
  return (
    <View style={toggle ? style.container : style.containerLight}>
      <StatusBar backgroundColor={toggle ? 'black' : 'white'} barStyle={toggle ? 'light-content' : 'dark-content'}/>
      <TouchableOpacity onPress={handleChangeToggle}>
          <Image style={toggle ? style.lightingOff : style.lightingOn} 
          source={toggle ? lightOff : lightOn}/>
          <Image style={style.dioLogo} 
          source={toggle ? dioWhite : dioColor}/>
      </TouchableOpacity>       
    </View>
  );
};


export default App;

const style = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    tintColor: 'white',
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
    marginTop: 40,
    
  },
})