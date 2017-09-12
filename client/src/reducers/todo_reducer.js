

// exeuction componenets of the reducer
const todo = (state=0, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            // console.log("in ADD_TODO case, returning: ");

            // console.log(action.id + " " + action.text );
            return {
                id: action.id,
                text: action.text,
                completed: false 
            };
              // state is received here as a todo
        case 'TOGGLE_TODO':
            console.log("deep inside TOGGLE_TODO");
            console.log(state);
            if (state.id !== action.id) {
                return state;
            }
            
            return ({
                id: state.id,
                text: state.text,
                completed: !state.completed
            });
        default:
            return state;

    }       
}

// matching componenets of the reducer
// this is the todos reducer 
// this should be in another file 
// reducers DO NOT HAVE JSX IN THEM
export default function TodoReducer (state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            // console.log(todo(undefined,action));
            // console.log(state);
            return [
                ...state,
                todo(undefined,action)
            ];
        case 'TOGGLE_TODO':
            // console.log("toggling TODO");
            // console.log(state);
            // console.log(action);
            let returnVar = state.map(t => todo(t,action));
                
            //     {
            //     // console.log(t);
            //     // console.log(action);    
            //     return (
            //         todo(t,action)
            //     )
            // });
            // console.log("After the toggling:");
            // console.log(returnVar);
            return returnVar;
            
    default:
        return state;
    }
};