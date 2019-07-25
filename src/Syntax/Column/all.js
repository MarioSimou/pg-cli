import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._colName } ALL (${statement})`)
            this._params.push(...params)
        }
    }
})()