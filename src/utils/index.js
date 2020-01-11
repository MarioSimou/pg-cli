export const generateQueues = ( c , v , p , m ) => {
  v.push( ...c._monitor.reduce( ( s , k ) => [ ...s , c._commands.get(k).shift() ] , []) )
  m.push( ...c._monitor.reduce( ( s , method ) => [ ...s , [ method , c._fullColName  ] ] , [])  )
  p.push( ...c._params )
  
  if( c._nestedColumn ) generateQueues( c._nestedColumn , v , p , m )
  c._flush()
  return [ v , p , m ]
}

export const setGetterProperty = function(fn){
  return function(name,key,...args){
    if(!key){
      key = name
    }

    Object.defineProperty(this,name, {get: fn.bind(this,key,...args)})
  }
}
export const setGetterDefaultProperty = setGetterProperty(function(key){
  return this['_' + key]
})