import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const offset = this._params.length
            const n = columns.length
            const statements = [], params = []

            for(let i=0; i < n; i++){
                const column = columns[i]
                const statement = `${column._values[i]}$${i+offset+1}` 
                const param = column._params[i]
                statements.push(statement)
                params.push(param)
            }

            this._statement.push( `WHERE ${statements.join(',')}`)
            this._params.push(...params)
        }
    }
})()