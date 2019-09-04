import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
          // if the column already exists, it starts creating a chain of columns
          if( this._fullColName !== column._fullColName ) this._nestedColumn = column

          return [ 'AND' ]
        }
    }
})()