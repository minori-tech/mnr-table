import Calendar from 'rc-calendar'
import React, { useEffect, useRef } from 'react'

export function DatePicker() {
    const calendarRef = useRef(null)
    useEffect(() => {}, [])

    return (
        <div>
            <Calendar />
        </div>
    )
}
