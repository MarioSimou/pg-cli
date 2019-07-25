import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AS,
        constructor: function(...args){
            const [ newColName ] = args
            this._values.push(`${this._colName} as ${newColName}`)
        }
    }
})()