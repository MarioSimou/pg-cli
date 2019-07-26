import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.ANY,
        constructor: function(arg){
            const [ statement , params ] = arg
            this._values.push(`${ this._fullColName } ANY (${statement})`)
            this._params.push(...params)
        }
    }
})()