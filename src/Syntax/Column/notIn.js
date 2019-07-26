import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.NOT_IN,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._fullColName } NOT IN (${statement})`)
            this._params.push(...params)
        }
    }
})()