import {configureStore, createReducer} from "@reduxjs/toolkit";
import {addWork, editWork, removeWork} from "./actions";

export type AppState = {
    works: Work[]
}

export type Work = {
    id: number,
    name: string,
    cost: number
}

const rootReducer = createReducer({works: []} as AppState, (builder) => {
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
});

export const store = configureStore({reducer: rootReducer});