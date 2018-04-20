class Cell{
	constructor(row, col, isAlive = false){
		this._row = row
		this._col = col
		this._isAlive = isAlive
	}

	get row(){
		return this._row
	}

	get col(){
		return this._col
	}

	get isAlive(){
		return this._isAlive
	}

	die(){
		this._isAlive = false
	}

	live(){
		this._isAlive = true
	}

	invertLiveStatus(){
		if(this.isAlive) this._isAlive = false
		else this._isAlive = true	
	}

}

//export default Cell
module.exports = Cell