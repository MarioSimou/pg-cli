import { Operators } from '../Types/constants'

class Where extends String {
    constructor(value){
        super()
        this._init = true
        this._sql = value || ''
    }
    // settes/getters - Encapsulation
    get sql(){
        return `WHERE ${this._sql}`
    }
    get and(){
        this._sql += this._sep(Operators.AND)
        console.log(this._sql)
        return this
    }
    get or(){
        this._sql += this._sep(Operators.OR)
        return this
    }
    // public methods
    equals( v , k = null ){
        this._appendSql(k,v,Operators.EQUAL)
        return this 
    }
    unequal( v , k = null ){
        this._appendSql(k,v,Operators.UNEQUAL)
        return this 
    }
    // private methods
    _sep(sep){
        return ` ${sep} `
    }
    _appendSql(...args){
        const [ k , v , operator ] = args
        switch(k){
            case null:
                const sql = this._sql
                this._sql = `${sql}${operator}'${v}'`
                break;
            default:
                this._sql += `${k}${operator}'${v}'`
                break;
        }

        this._init = false
        return this._sql
    }
}

export default Where