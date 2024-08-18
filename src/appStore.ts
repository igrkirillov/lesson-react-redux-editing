import {createStore, UnknownAction} from 'redux'
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

function reducer(state = {works: [], filter: ""} as AppState, action: UnknownAction) {
    switch (action.type) {
        case addWork: {
            const payload = action["payload"] as Work;
            return {...state, works: [...state.works, payload]};
        }
        case editWork: {
            const payload = action["payload"] as Work;
            const elementIndex = state.works.findIndex(w => w.id === payload.id);
            if (elementIndex >= 0) {
                const newArray = [...state.works];
                newArray[elementIndex] = payload;
                return {...state, works: [...newArray]};
            } else {
                return state;
            }
        }
        case removeWork: {
            const payload = action["payload"] as Work;
            const elementIndex = state.works.findIndex(w => w.id === payload.id);
            if (elementIndex >= 0) {
                const newArray = [...state.works];
                newArray.splice(elementIndex, 1);
                return {...state, works: [...newArray]};
            } else {
                return state;
            }
        }
        case setFilter: {
            const payload = action["payload"] as string;
            return {...state, filter: payload};
        }
        default:
            return state
    }
}

export const store = createStore(reducer)