import _as from './Column/as'
import _equal from './Column/equal'
import _unequal from './Column/unequal'
import _gt from './Column/gt'
import _gte from './Column/gte'
import _lt from './Column/lt'
import _lte from './Column/lte'
import _and from './Column/and'
import _or from './Column/or'
import _in from './Column/in'
import _any from './Column/any'
import _all from './Column/all'
import _match from './Column/match'
import _matchi from './Column/matchi'
import _is from './Column/is'
import _not from './Column/not'
import _null from './Column/null'
import _asc from './Column/asc'
import _desc from './Column/desc'
import _sum from './Column/sum'
import _max from './Column/max'
import _min from './Column/min'
import _avg from './Column/avg'
import _count from './Column/count'
import _cast from './Column/cast'
import _between from './Column/between'
import * as utils from '../utils'

const getColName = function(){ return this }

const Column = function({ colName , table, schema}){
    this._colName = colName
    this._fullColName = `${schema}."${table}"."${colName}"`   
    this._commands = new Map()
    this._params = []
    this._monitor = []
    this._nestedColumn = null

    // getters
    utils.setGetterProperty(getColName).call(this,colName)
}

// class method that populates the prototype with methods
Column.set = function(arg){
    this.prototype[arg.name] = function(...args){
        const [ command , params  ] = arg.constructor.call( this , ...args)
        
        // sets an initial array for a prototype method if it does not exist
        if(!this._commands.get(arg.name)) this._commands.set(arg.name , [] )

        if( command ) this._commands.get( arg.name ).push( command )
        if( params ) this._params.push(...params)
        
        this._monitor.push( arg.name )
        
        return this
    }
}

Column.prototype._flush = function(){
  this._commands = new Map()
  this._nestedColumn = null
  this._params = []
  this._monitor = []
}

// Prototype methods for Column Class
Column.set(_as)
Column.set(_equal)
Column.set(_unequal)
Column.set(_gt)
Column.set(_gte)
Column.set(_lt)
Column.set(_lte)
Column.set(_and)
Column.set(_or)
Column.set(_in)
Column.set(_any)
Column.set(_all)
Column.set(_match)
Column.set(_matchi)
Column.set(_is)
Column.set(_not)
Column.set(_null)
Column.set(_desc)
Column.set(_asc)
Column.set(_sum)
Column.set(_min)
Column.set(_max)
Column.set(_count)
Column.set(_avg)
Column.set(_cast)
Column.set(_between)

export default Column