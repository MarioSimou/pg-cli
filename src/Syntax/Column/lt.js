import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.LT,
        constructor: function(...arg){
            return [ '<' , arg ]
        }
    }
})()