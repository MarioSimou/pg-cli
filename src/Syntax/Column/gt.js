import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.GT,
        constructor: function(...arg){
            return [ '>' , arg ]
        }
    }
})()