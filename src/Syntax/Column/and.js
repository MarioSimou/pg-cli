import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
          if( this._fullColName !== column._fullColName ) this._nestedColumn = column

          return [ 'AND' ]
        }
    }
})()