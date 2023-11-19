const API= "https://www.thecocktaildb.com/"
export function get(path){
    return fetch(API+path,{
        
    })
}