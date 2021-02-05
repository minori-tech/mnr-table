import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RcDropdown from 'rc-dropdown'
import React, { ReactNode, useEffect, useState } from 'react'
import { ColumnOptions } from '../../@types'
import { DatePicker } from './DatePicker'
import { Multi } from './Multi'

type Props = { col: ColumnOptions; onSortClick?: (e: React.MouseEvent) => void }

export function renderTHCell({ col }: Props): ReactNode {
    return (
        <div>
            <div className='th-title'>{typeof col.title === 'function' ? col.title(col.key) : col.title}</div>
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
            Promise.resolve(dataSource()).then((value) => setState(value))
        }
    }, [])

    switch (type) {
        case 'date':
            return <DatePicker />
        case 'multi':
            return <Multi dataSource={state} />
        default:
            return <></>
    }
}
