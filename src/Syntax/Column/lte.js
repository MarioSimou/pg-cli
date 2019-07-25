import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.LTE,
        constructor: function(arg){
            this._values.push(`${this._colName}<=`)
            this._params.push(arg)
        }
    }
})()