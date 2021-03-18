import { Table } from 'antd'
import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Constructor, TableOptions, TableStore } from '../@types'
import { getMetadataColumns } from '../metadata'
import { doCancelRequest, doFetchData, doPaging } from './controller/action'
import { tableReducer } from './controller/reducer'
import { TFooter } from './tfooter'

const PAGE_SIZE = 10

export class TableProps<T extends object = any> {
    /** Base URL to fetch data. */
    baseURL: string
    /** Token to request authenticated URI. */
    bearerToken?: string
    metadata: Constructor<T>
    /** Handle action as paging, filter, search and etc. at client instead. */
    clientPerform?: boolean
    pageSize?: number
    options?: TableOptions
    constructor(metadata: Constructor<T>, baseURL: string, options?: TableOptions) {
        this.metadata = metadata
        this.baseURL = baseURL
        this.options = options
    }
}

export const TableContext = createContext<TableStore>({ baseURL: '', dispatch: () => null })

export function TableView<T extends object = any>(props: TableProps<T>) {
    const { baseURL, bearerToken, pageSize = PAGE_SIZE, clientPerform = false, metadata } = props

    const initialStore: TableStore = useMemo<TableStore>(() => {
        return { baseURL, isLoading: true }
    }, [baseURL])

    const initialValues = useMemo(() => {
        return new URLSearchParams(location.search)
    }, [baseURL])

    const currentPage = useMemo(() => {
        return initialValues.get('page') ? parseInt(initialValues.get('page')!) : 1
    }, [baseURL])

    const [state, dispatch] = useReducer(tableReducer, initialStore)
    const columns = useMemo(() => getMetadataColumns(metadata.name, initialValues, clientPerform), [baseURL])
    const history = useHistory()

    useEffect(() => {
        doFetchData({ baseAPI: baseURL, bearerToken, history, clientPerform: clientPerform, dispatch })
        return () => {
            doCancelRequest()
        }
    }, [])

    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            <div className='table-container'>
                <Table
                    rowKey={() => uuidv4()}
                    loading={state.isLoading}
                    columns={columns}
                    dataSource={state.data}
                    pagination={clientPerform ? undefined : false}
                />
            </div>
            {state.data && !clientPerform && (
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
