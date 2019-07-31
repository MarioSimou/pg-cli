import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.MATCHI,
        constructor: function(...arg){
            return [ this._fullColName + '~*' , arg ]
        }
    }
})()