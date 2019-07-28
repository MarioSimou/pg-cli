import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.RETURNING,
        constructor: function(columns){
            const statement = []
            for(let column of columns){
                statement.push(column._colName)
            }

            this._statement.push( statement.length ? `RETURNING ${statement.join(',')}` : 'RETURNING')
        }
    }
})()