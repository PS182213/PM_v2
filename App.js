import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Vibration, ListView, ActivityIndicator, Alert} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';

/*	
	Taken:
	
	1. Registratie Login
	2. Signout ofc


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
			this.props.navigation.navigate('Data'); 
			alert("Welcome!");
			Vibration.vibrate(1000);
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
					<Text style={{fontSize: 25}}>Welcome <Text style={{fontColor: 'cornflowerblue'}}>{this.state.email}</Text></Text>
					<Text style={{marginTop: 45}}>Want to Log out? Press the button</Text>
					<Button title="Logout" onPress={this.onLogoutPress} style={styles.buttonStyle} />
				</View>
			);
		}
		else {
			return(
				<View style={styles.containerStyle}>				
					<Text style={{fontSize: 30}}>Welcome to </Text>
					<Text style={{fontSize: 22, color: 'cornflowerblue'}}>Shelson's Password Manager</Text>
					
					<TextInput onChangeText={(text) => this.setState({email: text})} style={styles.inputStyleTop}  underlineColorAndroid= "transparent" placeholder="Your Email adress" placeholderTextColor="darkgray" autoCapitalize="none" />
					<TextInput secureTextEntry={true} onChangeText={(text) => this.setState({pass: text})} style={styles.inputStyleBot} underlineColorAndroid= "transparent" placeholder="Password" placeholderTextColor="darkgray" autoCapitalize="none" />
					<Button onPress={this.onLoginPress} style={styles.buttonStyle} title="Login" />
				</View>
			);
		}
		
	}
}

class InfoScreen extends React.Component 
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

	render(){
		if(this.state.isLoggedIn){
			<View style={styles.containerStyle}>
				<Text style={{fontSize: 40, margin:20, color: 'cornflowerblue'}}>About</Text>
			
				<Text>A Simple application for you to save your Account Details!</Text>
				<Text>You'll find your account details  in the <Text style={{color: 'cornflowerblue'}}>Data tab</Text></Text>

				<Text style={{fontSize: 10, marginTop: 50, color: 'red'}}>Something went wrong?! Make sure to contact me!</Text>
			</View>
		}
		else {
			return(
				<View style={styles.containerStyle}>	
					<Text style={{fontSize: 40, margin:20, color: 'cornflowerblue'}}>About</Text>
					
					<Text>A Simple application for you to save your Account Details!</Text>
					<Text>Make sure you have an account before usage</Text>
					<Text style={{color: 'red', marginTop: 30}}>Make sure you're logged in first!</Text>
	
					<Text style={{color: 'blue', marginTop: 20, fontWeight: 'bold'}}>Click here to make an Account</Text>
				</View>
			);
		}
		
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
					<Text>Voeg gegevens toe</Text>
					
					<TextInput underlineColorAndroid="transparent" placeholder="Username" placeholderTextColor="darkgray" autoCapitalize="none"  />
					<TextInput underlineColorAndroid="transparent" placeholder="Password" placeholderTextColor="darkgray" autoCapitalize="none"  />

				</View>
			);
		}
		else{
			return(
				<View style={styles.containerStyle}>
					<Text style={{fontSize: 30, color: 'red'}}>Log in first!</Text>
				</View>
			);
		}
	}
}

const bottomNav = createMaterialBottomTabNavigator({
	Home: { screen: LoginScreen , navigationOptions: {
		tabBarLabel: 'Home',
		tabBarColor: '#333',
		tabBarIcon: (<Icon name="home" size={28} color={'#fff'} />) 
	} },
	Info: { screen: InfoScreen, navigationOptions: {
		tabBarLabel: 'Info',
		tabBarColor: '#cc00cc',
		tabBarIcon: (<Icon name="info" size={28} color={'#fff'} />)
	} },
	Data: {screen: DataScreen, navigationOptions: {
		tabBarLabel: 'Account Details',
		tabBarColor: '#cc0066',
		tabBarIcon: (<Icon name="user" size={28} color={'#fff'} />)
	}}
},
{
	initialRouteName: 'Home', 
	activeColor: '#fff',
	inactiveTintColor: '#333',
	shifting: true,

	
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
	
	inputData: {
		borderWidth: 1, 
		borderColor: '#333',
		
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