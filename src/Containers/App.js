import React, {Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';

import './App.css'

class App extends Component{
	constructor(){
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount(){
		//con este comando estamos haciendo una solicitud
		//y que el fetch lo reciba
		fetch('https://jsonplaceholder.typicode.com/users').then(
			response =>{
				return response.json();
			})
			.then(users =>{
				this.setState({robots:users})
			})
		
	}

	onSearchChange = (event) =>{
		this.setState({
			searchField:event.target.value
		})
	}

	render(){
		const{robots,searchField }=this.state 
		const filterRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(
				searchField.toLowerCase());
		})
		//en caso de que la carga de los robots dure mucho
		if(!robots.length){
			return <h1>Loading</h1>
		}else{
			return(
				<div className='tc'>
					<h1 className='f1'>RobotFriends</h1>
					<SearchBox searchChange = {this.onSearchChange}/>
					<Scroll>
						<CardList robots = {filterRobots}/>	
					</Scroll>
				</div>
			);
		}	
	}
}

export default App;