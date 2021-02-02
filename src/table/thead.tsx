import React from 'react'
import { ColumnOptions } from '../@types'

// interface THeadProps {
//     state: TableState
//     setState: Function | any
//     options?: TableOptions
// }

// const onDisplayFilterInputClick = (event: MouseEvent<HTMLElement>, id: string) => {
//     event.preventDefault()
//     const element = document.getElementById(id)
//     if (isObjectEmpty(element)) {
//         return
//     }
//     element.className = element.className.includes('show')
//         ? element.className.replace('show', '').trimRight()
//         : element.className.concat(' show')
// }

// const onTextChange = (event: ChangeEvent<HTMLInputElement>, key: string, state: TableState, setState: any) => {
//     event.preventDefault()
//     const { filter } = state
//     if (isStrEmpty(event.target.value)) {
//         delete filter[key]
//     } else {
//         filter[key] = event.target.value
//     }
//     setState((s: TableState) => ({ ...s, filter }))
// }

// const onCheckboxChange = (event: MouseEvent<HTMLInputElement>, key: string, state: TableState, setState: any) => {
//     const target = event.target as HTMLInputElement
//     target.checked = !!target.checked
//     const { filter } = state
//     if (target.checked) {
//         filter[key] = isArrayEmpty(filter[key]) ? [target.value] : [target.value].concat(filter[key])
//     } else {
//         filter[key] = filter[key].filter((s: string) => s !== target.value)
//     }

//     if (isArrayEmpty(filter[key])) {
//         delete filter[key]
//     }
//     setState((s: TableState) => ({ ...s, filter }))
// }

// const onDateChange = (value: Moment, key: string, state: TableState, setState: any) => {
//     const { filter } = state
//     if (!isMoment(value) && !isMoment(filter[key])) {
//         return
//     }
//     if (!isMoment(value)) {
//         delete filter[key]
//     } else {
//         filter[key] = value
//     }
//     setState((s: TableState) => ({ ...s, filter }))
// }

// const renderFilterMulti = (key: string, state: TableState, setState: any) => {
//     const { dataSource } = state
//     if (isArrayEmpty(dataSource)) {
//         return null
//     }
//     const checkListSource: string[] = []
//     dataSource.map((data) => {
//         if (!checkListSource.some((val) => val === data[key])) {
//             checkListSource.push(data[key])
//         }
//     })
//     return (
//         <ul id={`checked-list-box-${key}`} className='checked-list-box'>
//             {checkListSource.map((val) => (
//                 <li key={val} className='checked-list-item'>
//                     <div style={{ color: 'black' }}>
//                         <input
//                             type='checkbox'
//                             value={val}
//                             onClick={(e) => {
//                                 onCheckboxChange(e, key, state, setState)
//                             }}
//                         />
//                         {val}
//                     </div>
//                 </li>
//             ))}
//             <li>
//                 <button
//                     onClick={(e) => {
//                         e.preventDefault()
//                         const ulElement = document.getElementById(`checked-list-box-${key}`) as HTMLUListElement
//                         if (isObjectEmpty(ulElement)) {
//                             return false
//                         }
//                         ulElement.childNodes.forEach((node: HTMLLIElement) => {
//                             const divElement = node.children.item(0) as HTMLDivElement
//                             const checkboxElement = divElement.children.item(0) as HTMLInputElement
//                             if (checkboxElement) {
//                                 checkboxElement.checked = false
//                             }
//                         })
//                         const { filter } = state
//                         delete filter[key]
//                         setState((s: TableState) => ({ ...s, filter }))
//                     }}>
//                     Clear
//                 </button>
//             </li>
//         </ul>
//     )
// }

// const renderFilter = (col: ColumnProps, state: TableState, setState: Function | any) => {
//     return (
//         <Fragment>
//             {col.text}
//             {/* <FilterIcon onClick={(event) => onDisplayFilterInputClick(event, `tbl-filter-input-${col.key}`)} /> */}
//             <div id={`tbl-filter-input-${col.key}`} className={`tbl-filter-input ${col.isFilter === 'date' && 'date'}`}>
//                 {col.isFilter === 'multi' && renderFilterMulti(col.key, state, setState)}
//                 {col.isFilter === 'single' && (
//                     <input placeholder={col.text} onChange={(event) => onTextChange(event, col.key, state, setState)} />
//                 )}
//                 {col.isFilter === 'date' && (
//                     <Calendar
//                         showToday={false}
//                         defaultValue={moment()}
//                         onChange={(val) => onDateChange(val, col.key, state, setState)}
//                         onClear={() => onDateChange(undefined, col.key, state, setState)}
//                     />
//                 )}
//             </div>
//         </Fragment>
//     )
// }

type THeadProps = { columns: ColumnOptions[] }
export const THead = React.memo(
    ({ columns }: THeadProps) => (
        <thead>
            <tr>
                {columns.map((col: ColumnOptions) => (
                    <th key={col.key}>{typeof col.title === 'function' ? col.title() : col.title}</th>
                ))}
                {/* {props.state.columns.map((col, i) => (
                <th key={i}>
                    <span className='mnr-headertext'>
                        {col.isFilter ? renderFilter(col, props.state, props.setState) : col.text}
                    </span>
                </th>
            ))}
            {!isObjectEmpty(props.options) && <th>Actions</th>} */}
            </tr>
        </thead>
    ),
    () => true
)
