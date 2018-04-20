global.l = console.log


import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
/*import AppActions from '../flux/actions/AppActions.js'
import AppStore from '../flux/stores/AppStore.js'*/

import GameOfLife from './GameOfLife.jsx'





class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {}

	}

	componentDidMount(){
	}	

	render(){
		return (
			<div className="app_container" ref={elem => {this.elem = elem}}> 
				<GameOfLife />
			</div>
		)
	}
}

export default App