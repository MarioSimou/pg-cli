import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.RETURNING,
        constructor: function(columns){
            const statement = columns.map( column => column._colName ).join(',')
            if(statement) return [ `RETURNING ` + statement ]
            else return [ 'RETURNING' ]

        }
    }
})()