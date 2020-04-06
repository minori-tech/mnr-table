import React, { useState, useEffect } from 'react'
import { isArrayEmpty, isObjectEmpty } from './common'
import { DecoratorMetadata, getFromContainer, MetadataStorage } from 'mnr-decorator'
import { ColumnProps, TableState, TableProps } from './interface'
import { THead } from './thead'
import { TFooter } from './tfooter'
import moment, { isMoment } from 'moment'
import './styles/table.less'
import './styles/filter.less'

const buildColumnFormMetadata = (metadata: DecoratorMetadata[]) => {
    const columns: ColumnProps[] = []

    if (isArrayEmpty(metadata)) {
        console.error(
            "There no column specification from your app. Please read more at 'https://www.npmjs.com/package/mnr-table'"
        )
    } else {
        metadata?.map((meta) => {
            columns.push({
                key: meta.propertyName,
                text: meta.options?.label,
                isFilter: meta.options?.isFilter,
                lookup: meta.options.lookup,
            })
        })
    }
    return columns
}

// const onEnableFilterClick = (enableFilter: boolean, setState: any) => {
//     setState((s: TableState) => ({ ...s, enableFilter }))
// }

const onEditClick = (row: any, onEditRow: (id: string) => void) => {
    onEditRow(row.id)
}

const onDeleteClick = (row: any, onDeleteRow: (id: string) => Promise<any>, state: TableState, setState: any) => {
    onDeleteRow(row.id)
        .then(() => {
            const { dataSource } = state
            const index = dataSource.findIndex((item) => item.id === row.id)
            dataSource.splice(index, 1)
            setState((s: TableState) => ({ ...s, dataSource }))
        })
        .catch((err) => console.log('err', err))
}

const onPageChange = (page: number, size: number, setState: any) => {
    const pagination = { page, size }
    setState((s: TableState) => ({ ...s, pagination }))
}

const getDataRowsPerPage = (page: number, size: number, data: any[]) => {
    if (isArrayEmpty(data)) {
        return undefined
    }
    const startIndex = (page - 1) * size
    const output = []

    for (let index = 0; index < size; index++) {
        if (index + startIndex < data.length) {
            output.push(data[index + startIndex])
        } else {
            break
        }
    }
    return output
}

const getDataRowsByFilter = (filter: any, dataSource: any[]) => {
    if (!isObjectEmpty(filter)) {
        let dataFilter = dataSource
        for (const key in filter) {
            const filterByVal = filter[key]

            if (isMoment(filterByVal)) {
                dataFilter = dataFilter.filter((row) => filterByVal.isSame(moment(row[key])))
            }
            if (Array.isArray(filterByVal)) {
                dataFilter = dataFilter.filter((row) => (filterByVal as string[]).some((s) => s === row[key]))
            } else {
                dataFilter = dataFilter.filter((row) => row[key].toLowerCase().includes(filterByVal.toLowerCase()))
            }
        }
        return dataFilter
    } else {
        return dataSource
    }
}

const getValueByCase = (col: ColumnProps, item: any, formatDate?: string): JSX.Element => {
    if (col.key.toLowerCase().includes('date')) {
        return <>{moment(item[col.key]).format(formatDate || 'DD/MM/YYYY')}</>
    }
    if (col.lookup) {
        const itemValue = item[col.key]
        const lookupValue = col.lookup[itemValue]
        if (col.key.includes('percent')) {
            return <span className={`mnr-tag-${lookupValue.toLowerCase()}`}>{lookupValue}</span>
        } else {
            return <span className={`mnr-tag mnr-tag-${lookupValue.toLowerCase()}`}>{lookupValue}</span>
        }
    }
    return <>{item[col.key]}</>
}

export { TableProps }

export function Table(props: TableProps) {
    const initialState: TableState = {
        loading: true,
        columns: buildColumnFormMetadata(
            getFromContainer(MetadataStorage).getTargetDecoratorMetadatas(
                props.columnSpec._reactInternalFiber.type.name
            )
        ),
        pagination: { page: 1, size: 10 },
        filter: {},
    }
    const [state, setState] = useState(initialState)

    useEffect(() => {
        props
            .getDataSource()
            .then((dataSource) => {
                const cachedDataSource = JSON.stringify(dataSource)
                setState((s) => ({ ...s, dataSource, cachedDataSource }))
            })
            .catch((err) => console.log('err', err))
    }, [])

    const { dataSource, filter, pagination, columns } = state
    let dataRows: any[] = undefined
    let paginationRows: any[] = undefined
    if (!isArrayEmpty(columns)) {
        dataRows = getDataRowsByFilter(filter, dataSource)
        paginationRows = getDataRowsPerPage(pagination.page, pagination.size, dataRows)
    }
    console.log(columns)

    return (
        <div>
            {/* <button onClick={() => onEnableFilterClick(!state.enableFilter, setState)}>Filter</button> */}
            <div></div>
            <div className='table-mobile'>
                <table id='main-table'>
                    <THead state={state} setState={setState} options={props.options} />
                    <tbody>
                        {!isArrayEmpty(paginationRows) &&
                            paginationRows.map((item, index) => (
                                <tr key={index}>
                                    {state.columns.map((col, i) => (
                                        <td key={`${index}-${i}`}>{getValueByCase(col, item, props.formatDate)}</td>
                                    ))}
                                    {props.options && (
                                        <td>
                                            {props.options.onEditRow && (
                                                <button
                                                    className='mnr-button'
                                                    onClick={() => onEditClick(item, props.options.onEditRow)}>
                                                    Edit
                                                </button>
                                            )}
                                            {props.options.onDeleteRow && (
                                                <button
                                                    className='mnr-button'
                                                    onClick={() =>
                                                        onDeleteClick(item, props.options.onDeleteRow, state, setState)
                                                    }>
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {!isArrayEmpty(dataRows) && (
                <TFooter
                    total={dataRows.length}
                    defaultPageSize={10}
                    onChange={(page, size) => onPageChange(page, size, setState)}
                />
            )}
        </div>
    )
}
