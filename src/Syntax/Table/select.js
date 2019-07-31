import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(columns){
            const statements = []
            
            for(let column of columns){
                if(column._values.length){
                  const value = column._values.pop()
                  
                  // check for cast operator
                  if(value.slice(0,2) === '::') statements.push( column._fullColName + value )
                  else statements.push(value)

                } else {
                  statements.push(column._fullColName)
                }
            }

            return [ `SELECT ${statements.join(',') || '*' }` ]
        }
    }
})()