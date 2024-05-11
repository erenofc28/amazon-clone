/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ExpansionPanelActions } from "@material-ui/core";

export const initialState = {
    basket:[],
    user:[{}],
    address:[],


    

}



const reducer = (state: { basket: Array<any>; },action: { type: unknown; item: unknown; id: unknown; address: unknown; name: unknown; email: unknown; }) =>{
    console.log("state",state)

    switch(action.type){
        case 'ADD_TO_BASKET':

           return {
            ...state,
            basket:[...state.basket,action.item],
           };

        case 'remove_from_basket':

            // eslint-disable-next-line no-case-declarations
            const index = state.basket.findIndex(
                (baskets)=> baskets.id == action.id
                );
           console.log("index",index)
            // eslint-disable-next-line no-case-declarations
            const newBasket = [...state.basket];
          

            if(state.basket.length>=0)
            {
                newBasket.splice(index,1)
            }
            
            console.log("newbasket",newBasket)
            console.log("basket",state.basket)
            return{
                ...state,
                basket:newBasket
             
            };


        case 'add_address':
            console.log("address",action.address)
            return{
                ...state,
                address:action.address
            };
        
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }
        case 'User':
            return{
                ...state,
                user:[{
                    name:action.name,
                    email:action.email
                }],

            }
            
            
        default:
            return state;

        }
       
}



export default reducer;

