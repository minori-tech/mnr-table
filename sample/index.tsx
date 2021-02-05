import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '../src'
import { Column, Filter, Render, Responsive, TableProps } from '../src/index'

const statusLookup = Object.freeze({
    1: 'New',
    2: 'Started',
    3: 'Finished',
    4: 'Closed',
    5: 'Canceled',
    6: 'Reopened'
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
    100: '100'
})

function renderId(record: Sample): JSX.Element {
    return <>{record.id}</>
}

class Sample {
    @Column({ key: 'id', title: () => 'ID', className: 'xxx', sort: true })
    @Render({ render: (record: Sample) => <>{record.id}</> })
    // @Align({ align: 'center' })
    id?: string

    @Column({ key: 'number', title: 'Number', className: 'xxx', sort: true })
    @Filter({ filterType: 'date' })
    // @Align({ align: 'right' })
    number?: number

    @Column({ key: 'parentIssue', title: 'Parent Issue', className: 'xxx' })
    @Responsive({ responsive: ['mobile', 'tablet'] })
    // @Align({ align: 'right' })
    parentIssue?: number

    @Column({ key: 'tracker', title: 'Tracker', className: 'xxx' })
    @Filter({
        filterType: 'multi',
        dataSource: () =>
            Promise.resolve([
                { key: '1', value: 'Value 1' },
                { key: '2', value: 'Value 2' }
            ])
    })
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
