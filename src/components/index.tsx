import RcTable from 'rc-table'
import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TableOptions, TableStore } from '../@types'
import { getMetadataColumns } from '../metadata'
import '../styles/table.css'
import { doFetchData } from './controller/action'
import { tableReducer } from './controller/reducer'

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

const data = []
for (let i = 0; i < 10; i += 1) {
    data.push({
        key: i,
        a: `a${i}`,
        b: `b${i}`,
        c: `c${i}`
    })
}

export function Table<T extends object = any>(props: TableProps<T>) {
    const { baseURL, metadata } = props
    const initialStore: TableStore = useMemo<TableStore>(() => {
        return { baseURL, isLoading: true, columns: getMetadataColumns(metadata.name) }
    }, [baseURL])
    const [state, dispatch] = useReducer(tableReducer, initialStore)

    useEffect(() => {
        doFetchData(baseURL, dispatch)
    }, [])

    // const menu = <div>Filter</div>
    // const columns = [
    //     {
    //         title: (
    //             <div>
    //                 title1
    //                 <Dropdown trigger={['click']} overlay={menu}>
    //                     <a href='#'>filter</a>
    //                 </Dropdown>
    //             </div>
    //         ),
    //         key: 'a',
    //         dataIndex: 'a',
    //         width: 100
    //     },
    //     { title: 'title2', key: 'b', dataIndex: 'b', width: 100 },
    //     { title: 'title3', key: 'c', dataIndex: 'c', width: 200 }
    // ]

    return (
        <TableContext.Provider value={{ ...state, dispatch }}>
            <div className='table-container'>
                <RcTable
                    rowKey={() => uuidv4()}
                    prefixCls='mnr-table'
                    className='table'
                    columns={state.columns}
                    data={state.dataSource}
                />
                {/* <table id='main-table' className='table is-responsive is-bordered'>
                    <THead columns={state.columns} />
                    <tbody>
                        {state.dataSource?.map((record: Record<string, unknown>, index) => (
                            <tr key={index}>{renderCell(state.columns, record, index)}</tr>
                        ))}
                    </tbody>
                </table> */}
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

// function renderCell(columns: ColumnOptions[], record: Record<string, unknown>, index?: number) {
//     return columns.map((col) => {
//         return (
//             // <td key={col.key} className={getClasses(col)}>
//             <td key={col.key}>{col.render ? col.render(record, index) : record[col.key]}</td>
//         )
//     })
// }
