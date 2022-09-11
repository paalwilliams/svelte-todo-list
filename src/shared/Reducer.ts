import type { IToDoItem, ReducerAction, ReducerFunction } from "../types";
import { Actions } from "../constants";
import { updateToDoItem } from "./utils";




export const reducer: ReducerFunction<IToDoItem[]> = (state: IToDoItem[], action: ReducerAction<IToDoItem[]>): IToDoItem[] => {
    switch (action.type) {
        case Actions.Fetch:
            if (action.payload) {
                return action.payload;
            }
            break;
        case Actions.Update:
            if (action.payload) {
                const updatedItem = action.payload[0];
                const updatedItems = updateToDoItem(updatedItem._id, updatedItem, state)
                return [...updatedItems];
            }
            break;
        default:
            return state;
    }
    return state;
}