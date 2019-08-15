import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.SET,
        constructor: function(columns){
            const statement = [] , params = []
            
            for(let column of columns){
                const param = column._params.pop()  
                const [ value ] = Array.from( column._commands.values() ) 

                params.push( param )
                statement.push( column._fullColName + value + `$`)
                column._flush()
            }

            return [ `SET ${statement.join(',')}` , params ] 
        }
    }
})()