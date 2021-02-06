import { faFilter, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RcDropdown from 'rc-dropdown'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnOptions } from '../../@types'
import { doSort } from '../controller/action'
import { FilterDate } from './FilterDate'
import { FilterSelect } from './FilterSelect'

type Props = { col: ColumnOptions }

enum SORT_CLASS {
    NONE = 'sorting-none',
    ASC = 'sorting-asc',
    DESC = 'sorting-desc'
}
const SORT_TYPE = {
    [SORT_CLASS.ASC]: 'ACS',
    [SORT_CLASS.DESC]: 'DESC'
}
const SORT_ATTRIBUTE = 'data-sort'

function updateClass(currentTarget: HTMLSpanElement) {
    const currentSort = currentTarget.getAttribute(SORT_ATTRIBUTE)
    switch (currentSort) {
        case SORT_CLASS.ASC:
            currentTarget.classList.remove(SORT_CLASS.ASC)
            currentTarget.classList.add(SORT_CLASS.DESC)
            currentTarget.setAttribute(SORT_ATTRIBUTE, SORT_CLASS.DESC)
            break
        case SORT_CLASS.DESC:
            currentTarget.classList.remove(SORT_CLASS.DESC)
            currentTarget.classList.add(SORT_CLASS.NONE)
            currentTarget.removeAttribute(SORT_ATTRIBUTE)
            break
        case SORT_CLASS.NONE:
        case null:
            currentTarget.classList.remove(SORT_CLASS.NONE)
            currentTarget.classList.add(SORT_CLASS.ASC)
            currentTarget.setAttribute(SORT_ATTRIBUTE, SORT_CLASS.ASC)
            break
        default:
            break
    }
}

export function renderTHCell({ col }: Props): ReactNode {
    const onSortClick = ({ currentTarget }: React.MouseEvent<HTMLDivElement>) => {
        const target = currentTarget.querySelector('.th-sort') as HTMLSpanElement
        if (target === null) return
        const targetKey = target.getAttribute('data-key')
        updateClass(target)
        currentTarget.parentNode.parentNode.parentNode.childNodes.forEach((node: HTMLTableHeaderCellElement) => {
            const elem = node.querySelector('.th-sort')
            if (elem && elem.getAttribute('data-key') !== targetKey) {
                elem.classList.remove(SORT_CLASS.ASC)
                elem.classList.remove(SORT_CLASS.DESC)
                elem.removeAttribute(SORT_ATTRIBUTE)
            }
        })
        doSort(col.key, SORT_TYPE[target.getAttribute(SORT_ATTRIBUTE)])
    }

    return (
        <div>
            <div className='th-title' onClick={col.sort && onSortClick}>
                <span>{typeof col.title === 'function' ? col.title(col.key) : col.title}</span>
                {col.sort && (
                    <span className='th-sort sorting-none' data-key={col.key}>
                        <span>
                            <FontAwesomeIcon icon={faSortUp} />
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faSortDown} />
                        </span>
                    </span>
                )}
            </div>
            {col.filterType && <FilterCell {...col} />}
        </div>
    )
}

function FilterCell(props: ColumnOptions) {
    const [visible, setVisible] = useState(false)

    return (
        <div className='th-filter'>
            <RcDropdown
                trigger={['click']}
                placement='bottomRight'
                onVisibleChange={(value) => setVisible(value)}
                visible={visible}
                overlay={
                    <div>
                        <FilterByType {...props} />
                    </div>
                }>
                <button>
                    <FilterIcon />
                </button>
            </RcDropdown>
        </div>
    )
}

const FilterIcon = () => (
    <span className='icon'>
        <FontAwesomeIcon icon={faFilter} />
    </span>
)

const FilterByType = (props: ColumnOptions) => {
    const { filterType: type, dataSource } = props
    const [state, setState] = useState<{ key: string; value: string }[]>()

    useEffect(() => {
        if (typeof dataSource === 'function') {
            dataSource().then((value) => setState(value))
        }
    }, [])

    switch (type) {
        case 'date':
            return <FilterDate />
        case 'multi':
            return <FilterSelect dataSource={state} />
        default:
            return <></>
    }
}
