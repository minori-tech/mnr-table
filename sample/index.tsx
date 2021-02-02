import React from 'react'
import ReactDOM from 'react-dom'
import 'reflect-metadata'
import { Align, Column, Filter, Render, Responsive, Sort, Table, TableProps } from '../src/index'

const statusLookup = Object.freeze({
    1: 'New',
    2: 'Started',
    3: 'Finished',
    4: 'Closed',
    5: 'Canceled',
    6: 'Reopened',
})

const percentLookup = Object.freeze({
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
})

class Sample {
    @Column({ key: 'id', title: () => 'ID', className: 'xxx' })
    @Render({ render: (record: Sample) => <>{record.id}</> })
    @Align({ align: 'center' })
    id?: string

    @Column({ key: 'number', title: 'Number', className: 'xxx' })
    @Filter({ type: 'text' })
    @Align({ align: 'right' })
    number?: number

    @Column({ key: 'parentIssue', title: 'Parent Issue', className: 'xxx' })
    @Responsive({ responsive: ['lg', 'xl'] })
    @Align({ align: 'right' })
    @Sort({ sort: true })
    parentIssue?: number

    tracker?: number
    status?: number
    subject?: string
    percentDone?: number
    startDate?: Date
    dueDate?: Date
    createDate?: number
    updateDate?: number
}

function Demo() {
    const props = new TableProps(Sample, '/')
    return <Table {...props} />
}

ReactDOM.render(<Demo />, document.getElementById('container'))
