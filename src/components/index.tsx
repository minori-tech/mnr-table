import RcTable from 'rc-table'
import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Constructor, TableOptions, TableStore } from '../@types'
import { getMetadataColumns } from '../metadata'
import '../styles/table.css'
import { doFetchData } from './controller/action'
import { tableReducer } from './controller/reducer'

export class TableProps<T extends object = any> {
    baseURL: string
    metadata: Constructor<T>
    options?: TableOptions
    constructor(metadata: Constructor<T>, baseURL: string, options?: TableOptions) {
        this.metadata = metadata
        this.baseURL = baseURL
        this.options = options
    }
}

export const TableContext = createContext<TableStore>({ baseURL: '', dispatch: () => null })

export function Table<T extends object = any>(props: TableProps<T>) {
    const { baseURL, metadata } = props
    const initialStore: TableStore = useMemo<TableStore>(() => {
        return { baseURL, isLoading: true }
    }, [baseURL])
    const [state, dispatch] = useReducer(tableReducer, initialStore)

    const columns = useMemo(() => getMetadataColumns(metadata.name), [baseURL])

    useEffect(() => {
        doFetchData(baseURL, dispatch)
    }, [])

    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            <div className='table-container'>
                <RcTable
                    rowKey={() => uuidv4()}
                    prefixCls='mnr-table'
                    className='table'
                    columns={columns}
                    data={state.dataSource}
                />
            </div>
            {/* {!isArrayEmpty(dataRows) && (
                <TFooter
                    total={dataRows.length}
                    defaultPageSize={10}
                    onChange={(page, size) => onPageChange(page, size, setState)}
                />
            )} */}
        </TableContext.Provider>
    )
}
