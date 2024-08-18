import {configureStore, createReducer} from "@reduxjs/toolkit";
import {addWork, editWork, removeWork, setFilter} from "./actions";

export type AppState = {
    works: Work[],
    filter: string
}

export type Work = {
    id: number,
    name: string,
    cost: number
}

const rootReducer = createReducer({works: [], filter: ""} as AppState, (builder) => {
    builder
        .addCase(addWork, (state, action) => {
            state.works.push(action.payload);
        })
        .addCase(editWork, (state, action) => {
            const elementIndex = state.works.findIndex(w => w.id === action.payload.id);
            if (elementIndex >= 0) {
                state.works[elementIndex] = action.payload;
            }
        })
        .addCase(removeWork, (state, action) => {
            const elementIndex = state.works.findIndex(w => w.id === action.payload.id);
            if (elementIndex >= 0) {
                state.works.splice(elementIndex, 1);
            }
        })
        .addCase(setFilter, (state, action) => {
            state.filter = action.payload;
        })
});

export const store = configureStore({reducer: rootReducer});