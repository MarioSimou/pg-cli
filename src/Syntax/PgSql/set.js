import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SET,
        constructor: function(columns){
            const statement = [];

            for(let column of columns){
                statement.push(`${column._values.pop()}$${this._params.length+1}`)
                this._params.push(column._params.pop())
            }

            this._statement.push(`SET ${statement.join(',')}`)
        }
    }
})()