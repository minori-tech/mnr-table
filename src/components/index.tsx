import RcTable from 'rc-table'
import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Constructor, TableOptions, TableStore } from '../@types'
import { getMetadataColumns } from '../metadata'
import '../styles/table.css'
import { doCancelRequest, doFetchData, doPaging } from './controller/action'
import { tableReducer } from './controller/reducer'
import { TFooter } from './tfooter'

const PAGE_SIZE = 10

export class TableProps<T extends object = any> {
    baseURL: string
    bearerToken?: string
    metadata: Constructor<T>
    pageSize?: number
    options?: TableOptions
    constructor(metadata: Constructor<T>, baseURL: string, options?: TableOptions) {
        this.metadata = metadata
        this.baseURL = baseURL
        this.options = options
    }
}

export const TableContext = createContext<TableStore>({ baseURL: '', dispatch: () => null })

export function Table<T extends object = any>(props: TableProps<T>) {
    const { baseURL, bearerToken, pageSize = PAGE_SIZE, metadata } = props

    const initialStore: TableStore = useMemo<TableStore>(() => {
        return { baseURL, isLoading: true }
    }, [baseURL])

    const initialValues = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [baseURL])

    const currentPage = useMemo(() => {
        return initialValues.get('page') ? parseInt(initialValues.get('page')) : 1
    }, [baseURL])

    const [state, dispatch] = useReducer(tableReducer, initialStore)
    const columns = useMemo(() => getMetadataColumns(metadata.name, initialValues), [baseURL])
    const history = useHistory()

    useEffect(() => {
        doFetchData({ baseAPI: baseURL, bearerToken, history, dispatch })
        return () => {
            doCancelRequest()
        }
    }, [])

    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            <div className='table-container'>
                <RcTable
                    rowKey={() => uuidv4()}
                    prefixCls='mnr-table'
                    className='table'
                    columns={columns}
                    data={state.data}
                />
            </div>
            {state.data && (
                <TFooter
                    defaultCurrent={currentPage}
                    total={state.total}
                    defaultPageSize={pageSize}
                    onChange={(page, size) => doPaging(page, size)}
                />
            )}
        </TableContext.Provider>
    )
}
