import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(args){
            this._statement.push('*')
        }
    }
})()