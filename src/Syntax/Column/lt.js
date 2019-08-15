import { STATEMENTS } from '../../utils/constants'  

export default (function(){
    return {
        name: STATEMENTS.LT,
        constructor: function(...arg){
            return [ '<' , arg ]
        }
    }
})()