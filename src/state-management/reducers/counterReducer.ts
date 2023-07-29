
interface Action {
    type: 'INCREMENT' | 'DECREMENT'

}

const counterReducer = (state:number , action:Action):number=>{

    if(action.type === 'INCREMENT') return state+1;
    if(action.type=== 'DECREMENT') return state-1 ;
   return state
}

export default counterReducer 