import { STATEMENTS } from '../../utils/constants'  

const getColumnName = ({_col:col}) => col.to === col.from ? `"${col.to}"` : `"${col.to}" as "${col.from}"`

export default (function(){
    return {
        name: STATEMENTS.RETURNING,
        constructor: function(columns){
            const statement = columns.map(getColumnName).join(',')
            if(statement) return [ `RETURNING ` + statement ]
            else return [ 'RETURNING' ]

        }
    }
})()