import { createSlice } from '@reduxjs/toolkit'

const rtkSlice = createSlice({
    name: 'rtkSlice',
    initialState: {
        card:[],
        allCards:[],
        user:{},
        points:[],
        coordinates:[],
        costs:[],
        disableDates:[]
        
    },
    reducers: {
        getAllCard(state,action){
            state.card = action.payload
            state.allCards = action.payload

        },

        getFilterCard(state,action){
        state.card = action.payload
        },

        getUser(state,action){
            state.user = action.payload
            console.log('action.payload user',action.payload); //!
            
        },

        getPoints(state,action) {
            state.points = action.payload
            console.log('action.payload points',action.payload);
        },

        getCoordinates(state,action) {
            state.coordinates = action.payload
            console.log('action.payload coordinates',action.payload);
        },

        getCost(state,action) {
            state.costs = action.payload
            console.log('action.payload costs',action.payload);
        },

        getDisableDates(state,action){
            state.disableDates = action.payload
            console.log('action.payload disableDates',action.payload);
        }
    }
})

export default rtkSlice.reducer
export const {getAllCard,getFilterCard, getUser, getPoints, getCoordinates, getCost, getDisableDates} = rtkSlice.actions