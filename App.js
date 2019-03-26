import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Col, Row, Grid} from 'react-native-easy-grid';

/*	
	Taken:
	
	1. Fix een DBS connectie
	2. zorg ervoor nadat er is ingelogd een andere pagina displayed met je gebruikersnamen etc.
*/


class LoginScreen extends React.Component 
{
	state = {
		email: '', 
		pass: ''
	}
	
	render(){
		return(
			<View style={styles.containerStyle}>
				<Text style={{fontSize: 23, color: 'cornflowerblue'}}>Password Manager</Text>
				 
				<TextInput style={styles.inputStyle} underlineColorAndroid= "transparent" placeholder="Name" placeholderTextColor="darkgray" autoCapitalize="none" />
				<TextInput style={styles.inputStyle} underlineColorAndroid= "transparent" placeholder="Password" placeholderTextColor="darkgray" autoCapitalize="none" />
				<Button style={styles.buttonStyle} title="Login" />
			</View>
		);
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
			</View>
		);
	}
}

const bottomNav = createMaterialBottomTabNavigator({
	Login: { screen: LoginScreen },
	Info: { screen: InfoScreen },
},
{
	initialRouteName: 'Login', 
	activeColor: 'white',
	inactiveColor: 'darkblue', 
	barStyle: { backgroundColor: 'cornflowerblue', justifyContent: 'center', fontSize: 60}
});

export default createAppContainer(bottomNav);


const styles = StyleSheet.create({
	inputStyle: {
		borderColor: 'black', 
		margin: 15,
		borderWidth: 2, 
		height: 40,
		width: 400,
		padding: 10
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
		height: 40
	}
})