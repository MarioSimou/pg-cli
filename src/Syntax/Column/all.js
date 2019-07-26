import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._fullColName } ALL (${statement})`)
            this._params.push(...params)
        }
    }
})()