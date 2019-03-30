import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Vibration, ListView, ActivityIndicator, Alert} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as firebase from 'firebase';

const PatternV = [1000];

/*	
	Taken:
	
	1. Fix een DBS connectie
	2. zorg ervoor nadat er is ingelogd een andere pagina displayed met je gebruikersnamen etc.
*/

let isLoggedIn = false;


class LoginScreen extends React.Component 
{

	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: isLoggedIn
		};
	}

	componentDidFocus(){
		this.setState({
			isLoggedIn: isLoggedIn,
		});
	}

	componentDidMount = async() => {
		
		this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 

		const firebaseConfig = {
			apiKey: "AIzaSyCKB_NfCwthOwJl_mKkGN49hfbqoqV_71M",
			authDomain: "school-project-mad.firebaseapp.com",
			databaseURL: "https://school-project-mad.firebaseio.com",
			storageBucket: "school-project-mad.appspot.com"
		};

	firebase.initializeApp(firebaseConfig);
	}

	onLoginPress = () => {
		//Login functie
		
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
		.then(() => {
			isLoggedIn = true;
			// Vibrates the Phone when logged in
			Vibration.vibrate(PatternV);
			this.props.navigation.navigate('Data'); 
			alert("Welcome!");
		}).catch((error) => {
			alert(`Something went wrong!! ${error}`);
		});

	}	

	onLogoutPress = () => {
		firebase.auth().signOut().then(() => {
			isLoggedIn = false;
			this.props.navigation.navigate('Home');
			Vibration.vibrate(1000);
		});
		

	}

	render(){
		if(this.state.isLoggedIn){
			return(
				<View style={styles.containerStyle}>
					<Text style={{fontSize: 30}}>Welcome {this.state.email}</Text>
					<Text style={{fontSize: 30}}>If you want a little more information about the App navigate your way to the About page!</Text>
					<Button title="Logout" onPress={this.onLogoutPress} style={styles.buttonStyle} />
				</View>
			);
		}
		else {
			return(
				<View style={styles.containerStyle}>				
					<Text style={{fontSize: 30}}>Welcome to </Text>
					<Text style={{fontSize: 22, color: 'cornflowerblue'}}>Shelson's Password Manager</Text>
					<Text style={{fontSize: 22}}>Please make sure to Login</Text>
					
					<TextInput onChangeText={(text) => this.setState({email: text})} style={styles.inputStyleTop}  underlineColorAndroid= "transparent" placeholder="Name" placeholderTextColor="darkgray" autoCapitalize="none" />
					<TextInput secureTextEntry={true} onChangeText={(text) => this.setState({pass: text})} style={styles.inputStyleBot} underlineColorAndroid= "transparent" placeholder="Password" placeholderTextColor="darkgray" autoCapitalize="none" />
					<Button onPress={this.onLoginPress} style={styles.buttonStyle} title="Login" />
				</View>
			);
		}
		
	}
}

class InfoScreen extends React.Component 
{
	render(){
		return(
			<View style={styles.containerStyle}>	
				<Text style={{fontSize: 40, margin:20}}>About</Text>
				<Text>
					Simple Application for mobile to your details.
				</Text>
				<Text>
						Make sure you have an account before usage.						
				</Text>
				<Text>
					This application has been made by Shelson.
				</Text>
				<Text style={{color: 'blue'}}>
					Click here to make an Account
				</Text>
			</View>
		);
	}
}

class DataScreen extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: isLoggedIn
		}
	}
	
	componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 
    }

	componentDidFocus(){
		this.setState({
			isLoggedIn: isLoggedIn
		});
	}

	render(){
		if(this.state.isLoggedIn){
			return(
				<View style={styles.containerStyle}>
					<Text>Hij werkt joepie</Text>
				</View>
			);
		}
		else{
			return(
				<View style={styles.containerStyle}>
					<Text>Log in first!</Text>
				</View>
			);
		}
	}
}

const bottomNav = createMaterialBottomTabNavigator({
	Home: { screen: LoginScreen },
	Info: { screen: InfoScreen },
	Data: {screen: DataScreen}
},
{
	initialRouteName: 'Home', 
	activeColor: 'white',
	inactiveColor: '#333',
	fontStyle: 'bold', 
	justifyContent: 'center',
	barStyle: { backgroundColor: 'cornflowerblue'}
});

export default createAppContainer(bottomNav);


const styles = StyleSheet.create({
	inputStyleTop: {
		borderColor: 'black', 
		margin: 15,
		borderWidth: 2, 
		height: 40,
		width: 400,
		padding: 10,
		marginTop: 50
	},
	
	inputStyleBot: {
		borderColor: 'black', 
		margin: 15,
		borderWidth: 2, 
		height: 40,
		width: 400,
		padding: 10,
	},

	infoHeader: {
		fontSize: 30,
		margin: 20,
		fontFamily: 'Verdana'
	},
	
	infoText: {
		
	},
	
	containerStyle: {
		alignItems: 'center', 
		justifyContent: 'center', 
		flex: 1,
		backgroundColor: 'white',
		fontFamily: 'Roboto'
	},
	buttonStyle: {
		backgroundColor: 'cornflowerblue', 
		color: 'white',
		padding: 10,
		width: 400,
		height: 40,
		marginTop: 30
	}
})