import PouchDB from "pouchdb";
import pouchdbfind from 'pouchdb-find';
import type { Response, IToDoItem, FindResponse } from "../types";
import { Actions, DATABASE_LABEL, TODO_ITEM_TYPE } from "../constants";
import { dispatch } from '../shared/Store'
PouchDB.plugin(pouchdbfind);

export const getToDoItems = async (): Promise<void> => {
    const db = await initializeDB();
    const findResponse: FindResponse<IToDoItem> = await db.find({
        selector: {
            type: TODO_ITEM_TYPE
        }
    }) as FindResponse<IToDoItem>;
    const toDoItems = mapFindResponseToToDoItem(findResponse)
    dispatch({ type: Actions.Fetch, payload: toDoItems })
}

export const initializeDB = async (): Promise<PouchDB.Database> => {
    const database: PouchDB.Database = new PouchDB<IToDoItem>(DATABASE_LABEL);
    await database.createIndex({
        index: { fields: ['type'] }
    });
    return database;
}


export const addDBItem = async (toDoItem: Partial<IToDoItem>): Promise<void> => {
    try {
        const db = await initializeDB();
        await db.post({ type: TODO_ITEM_TYPE, ...toDoItem, })
        await getToDoItems()
    } catch (error) {
        console.log(error);
    }
}


export const setCompleted = async ({ _id, completed, _rev, title }: { _id: string, completed: boolean, _rev: string, title: string }) => {
    const db: PouchDB.Database = await initializeDB();

    console.log({ _id, completed: completed, title, _rev, type: TODO_ITEM_TYPE })
    const response: Response = await db.put({ _id, completed: completed, title, _rev, type: TODO_ITEM_TYPE })

    dispatch({ type: Actions.Update, payload: [{ _id: response.id, completed, _rev: response.rev, title }] })
}

const mapFindResponseToToDoItem = (response: FindResponse<IToDoItem>): IToDoItem[] => {
    const items: IToDoItem[] = response.docs.map((item: PouchDB.Core.ExistingDocument<IToDoItem>) => {
        const { _id, completed, title, _rev } = item;
        return {
            _id,
            completed,
            title,
            _rev
        } as IToDoItem
    })
    return items;
}

export const updateToDoItem = (id: string, updatedItem: IToDoItem, toDoItemList: IToDoItem[]) => {
    const updatedItems = toDoItemList.map((toDoItem) => {
        if (toDoItem._id === id) {
            return updatedItem;
        }
        return toDoItem
    })
    return updatedItems
}