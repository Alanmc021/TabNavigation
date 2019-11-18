import { createSwitchNavigator, createAppContainer } from "react-navigation"
import React from 'react'
import { Platform, StyleSheet, Text, View, FlatList, TouchableHighlight, ImageBackground } from 'react-native';
import firebase from '../Firebase';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RenderFlatList from './RenderFlatList'

class FirstRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            loading: true
        }
    }

    componentWillMount() {

        firebase.database().ref('esportsWebhouse/001/posts').on('value', (snapshot) => {
            let state = this.state;
            state.lista = [];

            snapshot.forEach((childItem) => {

                state.lista.push({

                    key: childItem.key,

                    title: childItem.val().title,
                    main_image: childItem.val().thread.main_image,
                    author: childItem.val().author,
                    text: childItem.val().text,
                    content: childItem.val().content,
                    url: childItem.val().url,
                    published: childItem.val().published,

                });
            });

            this.setState(state);
            this.setState({ loading: false })
        })
    }


    funEsportes = (title, main_image, description, author, content, url, published, numberAdmob, numberOfTab02, ) => {

        this.props.navigation.navigate('Screen02',
    
          {
            title: title,
            main_image: main_image,
            description: description,
            author: author,
            content: content,
            url: url,
            published: published,
            numberOfTab02: numberOfTab02,
            numberAdmob:numberAdmob
          });
    
        
      }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.textUpAnimation}>Localizando notícias, aguarde...</Text>
                    <View style={styles.animation}>
                        <LottieView source={require('../Json/Nowloading.json')} autoPlay loop />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList data={this.state.lista}
                        renderItem={({ item }) => <RenderFlatList funEsportes={this.funEsportes} data={item} />} />
                </View>
            );
        }
    }
}






class SecondRoute extends React.Component {

    goToFirstRoute = _ => {
        this.props.navigation.navigate('Screen01')
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.goToFirstRoute}>
                    <Text style={{ fontSize: 25 }}>{this.props.navigation.state.params.title}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}


const AppNavigator = createSwitchNavigator({

    Screen01: FirstRoute,
    Screen02: SecondRoute

});

export default createAppContainer(AppNavigator);


////////////////////////////////////////q

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cc2229',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        backgroundColor: '#cc2229',
        width: wp('60%'),
        height: hp('60%'),
        marginBottom: 20

    },
    textUpAnimation: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 26,
        fontWeight: '400',
        marginTop: 30,
        fontFamily: 'Roboto',
        padding: 10,
    }
});