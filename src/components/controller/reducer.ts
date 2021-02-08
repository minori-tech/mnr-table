import { TableAction, TableStore } from '../../@types'
import { TABLE_DATA } from './types'

export function tableReducer(state: TableStore, action: TableAction): TableStore {
    switch (action.type) {
        case TABLE_DATA:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
