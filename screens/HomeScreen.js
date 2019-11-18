import React from 'react'
import { View } from 'react-native'
import TabView from '../navigationTabViewApi/TabView'


class HomeScreen extends React.Component{
  render(){
    return <TabView/>
  }
}

export default HomeScreen 

HomeScreen.navigationOptions = {
  title: "Table",
  headerTitle: '<AdMob />',
  headerStyle: {
    backgroundColor: '#cc2229',
    height: 50,
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

