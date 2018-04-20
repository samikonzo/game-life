//import Cell from './Cell.js'
const Cell = require('./Cell.js')

class Grid{
	constructor(size, randomize = false){
		this.size = size

		this.init(randomize)

		this.init =  this.init.bind(this)
		this.countNeighbors =  this.countNeighbors.bind(this)
		this.isCellAlive =  this.isCellAlive.bind(this)
		this.compute =  this.compute.bind(this)
		this.render =  this.render.bind(this)
	}

	init(randomize){
		this.cells = new Array(this.size)

		for( let row = 0; row < this.size; row++ ){
			this.cells[row] = new Array( this.size )

			for( let col = 0; col < this.size; col++ ){
				if(randomize){
					let isAlive = Math.random() > .8;

					this.cells[row][col] = new Cell(row, col, isAlive)
				} else {
					this.cells[row][col] = new Cell(row, col)
				}
			}
		}
	}

	countNeighbors(cell){
		let count = 0
		let { _row:row , _col:col } = cell

		var i = 0
		var j = 0

		for ( let r = row - 1; r <= row + 1; r++){

			for( let c = col - 1; c <= col + 1; c++ ){
				if( r != row || c != col){

					let normalizedR = r < 0 ? this.size + r : 
						r > this.size - 1 ? r % this.size : r

					let normalizedC = c < 0 ? this.size + c : 
						c > this.size - 1 ? c % this.size : c	

					if( this.isCellAlive(normalizedR, normalizedC) ) count++
				}

				j++
			}

			i++
		}

		return count
	}

	isCellAlive(row, col){
		return this.cells[row][col].isAlive
	}

	

	compute(){
		let nextGrid = new Grid(this.size)

		for ( let row = 0; row < nextGrid.size; row++ ){
			for ( let cell = 0; cell < nextGrid.size; cell++ ){
				let thisCell = this.cells[row][cell]
				let nextCell = nextGrid.cells[row][cell]
				let numNeighbors = this.countNeighbors(thisCell)

				if ( thisCell.isAlive ){
					if ( numNeighbors < 2 || numNeighbors > 3 ){ // thisCell will die
						nextCell.die()
					} else if ( numNeighbors === 2 || numNeighbors === 3 ){ // thisCell will live
						nextCell.live()
					} 

				} else {
					if ( numNeighbors === 3 ){ // thisCell will alive
						nextCell.live()
					}

				}
			}
		}

		this.cells = nextGrid.cells

		return this
	}

	render(){
		//let output = ''	
		return this.cells
	}
}

//export default Grid
module.exports = Grid