import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.GTE,
        constructor: function(...arg){
            return [ '>=' , arg ]
        }
    }
})()