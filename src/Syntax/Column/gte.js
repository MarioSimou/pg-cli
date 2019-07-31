import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.GTE,
        constructor: function(...arg){
            return [ '>=' , arg ]
        }
    }
})()