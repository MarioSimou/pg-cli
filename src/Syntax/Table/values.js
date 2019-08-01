import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.VALUES,
        constructor: function(records){
            const statements = [] , params = [] , columns = new Set()

            for(let record of records){
                // assumes that all inputs will have the same size, and generates a parametrized array 
                const statement = `(${new Array( record.length ).fill('$').join(',')})`          
                statements.push( statement )

                // iterate over the columns, gathering all the necessary parameters
                record.forEach( column => {  
                  if( !columns.has( column._colName )) columns.add( column._colName )
                  params.push( ...column._params ); 
                  column._flush()
                } )
            }

            return [ `(${Array.from(columns).join(',')}) VALUES ${statements.join(',')}` , params ]
            
        }
    }
})()