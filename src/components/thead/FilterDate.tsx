import { Moment } from 'moment'
import Calendar from 'rc-calendar'
import React, { useCallback } from 'react'

const DEFAULT_FORMAT = 'DD/MM/YYYY'

type Props = { format?: string; onChange?: (date: string) => void }
export function FilterDate(props: Props) {
    const { format = DEFAULT_FORMAT, onChange = () => {} } = props

    const onDateChange = useCallback((date: Moment | null) => {
        onChange(date.format(format))
    }, [])

    return (
        <div>
            <Calendar format={format} onChange={onDateChange} onClear={() => onChange(null)} />
        </div>
    )
}
