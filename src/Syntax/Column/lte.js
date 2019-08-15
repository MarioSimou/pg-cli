import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.LTE,
        constructor: function(...arg){
            return [ '<=' , arg ]
        }
    }
})()