import { TableAction, TableStore } from '../../@types'
import { TABLE_INITIAL_DATA } from './types'

export function tableReducer(state: TableStore, action: TableAction): TableStore {
    switch (action.type) {
        case TABLE_INITIAL_DATA:
            return { ...state, dataSource: action.payload }
        default:
            return state
    }
}