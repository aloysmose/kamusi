export const loadFromStorage=(name)=>{
  if(localStorage.getItem(name)===null){
    return undefined;
  }else{
    return JSON.parse(localStorage.getItem(name));
  }

}
export const saveToStorage=(name, state)=>{
  localStorage.setItem(name,JSON.stringify(state));
}
