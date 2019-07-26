import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.IN,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._fullColName } IN (${statement})`)
            this._params.push(...params)
        }
    }
})()