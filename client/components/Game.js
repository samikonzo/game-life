global.l = console.log

//import Grid from './Grid.js'
const Grid = require('./Grid.js')

class Game  {
	constructor(randomize = false, gridSize = 30){
		this.grid = new Grid(gridSize, randomize)

		this.play = this.play.bind(this)
	}

	play(){
		return this.grid.compute().render()
	}
}

export default Game
//module.exports = Game