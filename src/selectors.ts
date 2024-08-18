import {createSelector} from "reselect";

import {AppState} from "./appStore"

const appStateSelector = createSelector.withTypes<AppState>();

export const worksSelector = appStateSelector(state => state.works, works => [...works]);
export const worksFilteredSelector = appStateSelector(
    [state => state.works, state => state.filter],
        (works, filter) => works.filter(w => w.name.toLowerCase().includes(filter.toLowerCase())));