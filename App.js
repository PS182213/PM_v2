import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Vibration, ListView, ActivityIndicator, Alert, TouchableOpacity, SectionList} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';

// V3 //

const overrideRenderItem = ({ item, index, section: { title, data } }) => <Text key={index}>Override{item}</Text>
/*	
	Nieuwste en recentste versie van de Applicatie!
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
			this.props.navigation.navigate('Info'); 
			alert(`Welcome ${this.state.email}`);
			Vibration.vibrate(500);
		}).catch((error) => {
			alert(`Something went wrong!! ${error}`);
		});

	}	

	onLogoutPress = () =>
	{
		firebase.auth().signOut().then(() => {
			isLoggedIn = false;
			this.props.navigation.navigate('Info');
			Vibration.vibrate(500);
			alert(`Goodbye ${this.state.email}`);
		});
		
	}

	render(){
		if(this.state.isLoggedIn){
			return(
				<View style={styles.containerStyle}>
					<Text style={{fontSize: 25, color: '#fff'}}>Welcome <Text style={{color: '#cc0066', fontWeight: 'bold'}}>{this.state.email}</Text></Text>
					<Text style={{marginTop: 70, color: 'lightgray'}}>Want to Log out? Press the button</Text>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.onLogoutPress}>
						<Text style={{color: '#fff'}}>Logout</Text>
					</TouchableOpacity>
				</View>
			);
		}
		else {
			return(
				<View style={styles.containerStyle}>				
					<Text style={{fontSize: 30, color: '#fff'}}>Welcome to </Text>
					<Text style={{fontSize: 22, color: '#cc0066'}}>Shelson's Password Manager</Text>

					<TextInput onChangeText={(text) => this.setState({email: text})} style={styles.inputStyleTop}  underlineColorAndroid= "transparent" placeholder="Your Email adress" placeholderTextColor="darkgray" autoCapitalize="none" />
					<TextInput secureTextEntry={true} onChangeText={(text) => this.setState({pass: text})} style={styles.inputStyleBot} underlineColorAndroid= "transparent" placeholder="Password" placeholderTextColor="darkgray" autoCapitalize="none" />
					<TouchableOpacity onPress={this.onLoginPress} style={styles.buttonStyle}>
						<Text style={{color: '#fff'}}>Login</Text>
					</TouchableOpacity>

					<Text style={{fontSize: 10, color: 'red', fontWeight:'bold', marginTop: 60}}>BETA</Text>
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

	componentDidMount(){
        this.subs = [
            this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
        ]; 
    }

	render(){
		if(this.state.isLoggedIn){
			return(
				<View style={styles.containerStyle}>
					<Text style={{fontSize: 40, margin:20, color: '#fff'}}>Information</Text>
					<Text style={{color: '#fff', fontSize: 20, marginTop: 15}}>Welcome! {this.state.email}</Text>
					<Text style={{color: '#fff', fontSize: 13}}>A Simple application for you to save your Account Details!</Text>
					<Text style={{color: '#fff', fontSize: 13}}>You'll find your account details  in the <Text style={{color: 'darkcyan'}}>Data tab</Text></Text>
				</View>
			);
		}

		else {
			return(
				<View style={styles.containerStyle}>	
					<Text style={{fontSize: 45, margin:20, color: '#fff'}}>About</Text>
					
					<Text style={{color: 'darkcyan', fontSize: 20, marginBottom: 20, fontWeight: 'bold'}}>Make sure you're logged in first!</Text>

					<Text style={{fontSize: 13, color: 'lightgray'}}>A Simple application for you to save your Account Details!</Text>
					<Text style={{fontSize: 13, color: 'lightgray'}}>Make sure you have an account before usage</Text>
					
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
			isLoggedIn: isLoggedIn,
			data: [
				{ 
					for: 'Ubisoft',
					name: 'losr12',
					pass: '1234'
				}, 
				{
					for: 'Steam',
					name: '21rsol',
					pass: '4321',
				}
			]
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

	checkNames = (item) => {
		alert(` \n Username: ${item.name} \n Password: ${item.pass}`);
	}

	addData = () => {
		this.setState({
			data: this.state.data.concat({
				for: this.state.voor,
				name: this.state.naam,
				pass: this.state.ww
			})
		})
	}

	render(){
		if(this.state.isLoggedIn){
			return(
				<Grid>
					<Row size={50}>
						<View style={styles.containerStyle}>
							
							<Text style={{marginTop: 30, color: '#fff', fontSize: 30}}>Enter your Data here:</Text>

							<TextInput onChangeText={(text) => this.setState({voor: text})}  underlineColorAndroid="transparent" placeholder="For:" placeholderTextColor="darkgray" style={styles.inputDataSpecial} />
							
							<TextInput onChangeText={(text) => this.setState({naam: text})}  underlineColorAndroid="transparent" placeholder="Username:" placeholderTextColor="darkgray" autoCapitalize="none"  style={styles.inputData} />
							
							<TextInput onChangeText={(text) => this.setState({ww: text})} secureTextEntry={true} underlineColorAndroid="transparent" placeholder="Password:" placeholderTextColor="darkgray" autoCapitalize="none"  style={styles.inputData} />	
							
							<TouchableOpacity onPress={this.addData} style={styles.buttonStyle}>
								<Text style={{color: '#fff'}}>Add</Text>
							</TouchableOpacity>
						
						</View>
					</Row>
					<Row size={50}>
						<View style={styles.containerSpecial}>
							{
								this.state.data.map((item, index) => (
								<TouchableOpacity style={styles.listItem} key={item.for} onPress={() => this.checkNames(item)}>
									<Text style={{fontSize: 20, color: '#fff'}}>
										{item.for}
									</Text>
								</TouchableOpacity>))
							}
						</View>
					</Row>
				</Grid>
			);
		}
		else{
			return(
				<View style={styles.containerStyle}>
					<Text style={{fontSize: 20, color: '#cc0066', fontWeight: 'bold'}}>Log in first!</Text>
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
		tabBarColor: 'darkcyan',
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
		borderColor: '#333', 
		color: '#fff',
		margin: 15,
		borderWidth: 2, 
		borderRadius: 20,  
		height: 40,
		width: 400,
		padding: 10,
		marginTop: 50
	},
	
	containerSpecial: {
		alignItems: 'center', 
		flex: 2,
		backgroundColor: 'rgb(111, 111, 111)',
		fontFamily: 'Roboto'
	},
	
	inputStyleBot: {
		borderColor: '#333', 
		color: '#fff', 
		borderRadius: 20,
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
	
	inputDataSpecial: {
		borderWidth: 2, 
		borderColor: '#333',
		color: '#cc0066',
		borderRadius: 30,
		marginTop: 25,
		width: 400,
		height: 40,
		padding: 10,
	},


	inputData: {
		borderWidth: 2, 
		borderColor: '#333',
		color: '#fff',
		borderRadius: 30,
		marginTop: 20,
		width: 400,
		height: 40,
		padding: 10,
	},
	
	containerStyle: {
		alignItems: 'center', 
		justifyContent: 'center', 
		flex: 1,
		backgroundColor: 'rgb(111, 111, 111)',
		fontFamily: 'Roboto'
	},

	buttonStyle: {
		backgroundColor: '#cc0066', 
		justifyContent: 'center',
		alignItems: 'center', 
		color: '#fff',
		borderRadius: 30,
		width: 200, 
		padding: 10,
		marginTop: 30
	},
	
	listItem: {
		backgroundColor: '#cc0066', 
		width: 350, 
		height: 40, 
		marginTop: 20,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	}
	
})