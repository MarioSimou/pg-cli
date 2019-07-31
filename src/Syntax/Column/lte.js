import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.LTE,
        constructor: function(...arg){
            return [ '<=' , arg ]
        }
    }
})()