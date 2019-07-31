import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AS,
        constructor: function(...args){
            return [ `as ${args[0]}` ]
        }
    }
})()