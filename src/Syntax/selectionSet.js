class SelectionSet {
    constructor(value = '*'){
        this._sql = [value]
    }
    get sql(){
        return this._sql.join(',')
    }

    // PUBLIC METHODS
    all(){
        this._sql.push('*')
        return this
    }
    add(value){
        this._sql.push(value)
        return this
    }
    rename(value){
        const colName = this._sql.pop()
        this._sql.push(`${ colName} as ${value}`)
        return this
    }
}

export default SelectionSet