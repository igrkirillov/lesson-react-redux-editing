import {createAction} from "@reduxjs/toolkit";
import {Work} from "./appStore";

export const editWork = createAction<Work>("works/edit");
export const addWork = createAction<Work>("works/add");
export const removeWork = createAction<Work>("works/remove");