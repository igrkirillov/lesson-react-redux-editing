import {createSelector} from "reselect";

import {AppState} from "./App"

const appStateSelector = createSelector.withTypes<AppState>();

export const worksSelector = appStateSelector(state => state.works, works => works);