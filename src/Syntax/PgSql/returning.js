import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.RETURNING,
        constructor: function(args){
            this._statement.push('RETURNING')
        }
    }
})()