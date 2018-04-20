import React from 'react'
import Game from '../components/Game.js'

const speed = 3 // timeout => 1000 / speed
const randomize = true


class GameOfLife extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			isPlaying : false,
			timer: undefined,
		}

		this._playGame = this._playGame.bind(this)
		this._pauseGame = this._pauseGame.bind(this)
		this._setNewGrid = this._setNewGrid.bind(this)
		this._bindGameField = this._bindGameField.bind(this)
	}

	componentWillMount(){
		var game = new Game(randomize)

		this.setState({
			game : game,
			grid : game.grid.cells,
		})
	}

	componentDidMount(){
		this._bindGameField()
	}

	_playGame(){
		if(this.state.isPlaying) return

		var that = this
		var play = this.state.game.play

		//play()
		this.setState({
			isPlaying: true,
			timer: setTimeout(function f(){
				
				
				that._setNewGrid( play() )

				that.setState({
					timer: setTimeout(f, 1000 / speed)
				})
			}, 0)
		})
	}

	_pauseGame(){
		if(!this.state.isPlaying) return

		clearTimeout(this.state.timer)

		this.setState({
			isPlaying: false,
			timer: undefined
		})
	}

	_setNewGrid(grid){
		this.setState({
			grid: grid
		})
	}

	_bindGameField(){
		fieldMouseDown = fieldMouseDown.bind(this)
		fieldMouseMove = fieldMouseMove.bind(this)
		fieldMouseUp = fieldMouseUp.bind(this)
		getCell = getCell.bind(this)
		changeCellStatus = changeCellStatus.bind(this)


		var field = this.field

		field.addEventListener('mousedown', fieldMouseDown)
		field.addEventListener('contextmenu', function(e){
			e.preventDefault()
			return false
		})
		field.addEventListener('mousemove', fieldMouseMove)
		document.addEventListener('mouseup', fieldMouseUp)

		function fieldMouseDown(e){
			l(e.which)			
			if(e.which == 1){
				field.mouseAction = 'live'
			} else if(e.which == 3){
				field.mouseAction = 'die'
			}
			changeCellStatus(getCell(e))

			field.mousedown = true
		}

		function fieldMouseMove(e){
			if(!field.mousedown)return
			if(!e.target) return
			if(e.target.tagName != 'TD') return
			

			changeCellStatus(getCell(e))
		}

		function fieldMouseUp(e){
			field.mousedown = false
			delete field.mouseAction
		}

		function getCell(e){
			var td = e.target
			var col = td.cellIndex
			var row = td.parentElement.sectionRowIndex

			if(col == undefined || row == undefined) return false

			var cell = this.state.game.grid.cells[row][col]
			return cell
		}

		function changeCellStatus(cell){
			if(!cell) return

			if(field.mouseAction == 'live'){
				cell.live()
			} else if( field.mouseAction == 'die'){
				cell.die()
			}

			this.setState({
				grid : this.state.game.grid.cells
			})
		}
	}

	render(){
		var field = (
					<table style={{userSelect: 'none'}}>
						<tbody>
							{this.state.game && this.state.grid.map( (row, i) => {
								return (
									<tr key={i}>
										{ 	
											row.map( (col, j) => {
												var isAlive = row[j].isAlive
												var className = 'GameOfLife_cell '
 
												if(isAlive) className += 'GameOfLife_cell--live '
												else className += 'GameOfLife_cell--die '

												if(!this.state.isPlaying) className += 'GameOfLife_cell--pause'

												return (
													<td key={j} className={className}>{/* isAlive ? 'o' : '_' */}</td>
												)
											}) 			
										}
									</tr>
								)
							})}		
						</tbody>
					</table>
		)

		var playBtnClass = 'GameOfLife_playBtn '
		var pauseBtnClass = 'GameOfLife_pauseBtn '
		if(this.state.isPlaying){
			playBtnClass += 'GameOfLife_playBtn--active '
		} else {
			pauseBtnClass += 'GameOfLife_pauseBtn--active '
		}

		return(
			<div className="GameOfLife_wrapper">

				<div className="GameOfLife_field" ref={elem => this.field = elem}>
					{field}
				</div>

				<div className="GameOfLife_stats">
				</div>

				<div className="GameOfLife_control"> 
					<button className={playBtnClass} onClick={this._playGame}> play </button>
					<button className={pauseBtnClass} onClick={this._pauseGame}> pause </button>
				</div>
			</div>
		)
	}
}

export default GameOfLife