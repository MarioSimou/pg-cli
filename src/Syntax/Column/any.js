import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.ANY,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._colName } ANY (${statement})`)
            this._params.push(...params)
        }
    }
})()