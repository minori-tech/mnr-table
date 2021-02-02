import React, { createContext, useEffect, useReducer } from 'react'
import { ColumnOptions, TableOptions, TableStore } from '../@types'
import { getMetadataColumns } from '../metadata'
import '../styles/filter.less'
import '../styles/table.less'
import { doFetchData } from './controller/action'
import { tableReducer } from './controller/reducer'
import { THead } from './thead'

type Constructor<T> = new (...args: any[]) => T
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
    const initialStore: TableStore = { baseURL, isLoading: true, ...getMetadataColumns(metadata.name) }
    const [state, dispatch] = useReducer(tableReducer, initialStore)

    console.log('initialStore', initialStore)
    useEffect(() => {
        doFetchData(baseURL, dispatch)
    }, [])

    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            {/* <button onClick={() => onEnableFilterClick(!state.enableFilter, setState)}>Filter</button> */}
            <div className='table-mobile'>
                <table id='main-table'>
                    <THead columns={state.columns} />
                    <tbody>
                        {state.dataSource?.map((record: Record<string, unknown>, index) => (
                            <tr key={index}>{renderCell(state.columns, record, index)}</tr>
                        ))}
                    </tbody>
                </table>
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

const DEFAULT_ALIGN = 'mnr-align-center'
function renderCell(columns: ColumnOptions[], record: Record<string, unknown>, index?: number) {
    return columns.map((col) => {
        const className = col.align ? `mnr-align-${col.align}` : DEFAULT_ALIGN
        return (
            <td key={col.key} className={className}>
                {col.render ? col.render(record, index) : record[col.key]}
            </td>
        )
    })
}
