import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ColumnSpec } from 'mnr-decorator'
import { Table } from '../src/index'

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

class Demo extends PureComponent {
    @ColumnSpec({ label: 'Tracker', lookup: Object.freeze({ 1: 'Task', 2: 'Bug' }) })
    tracker: string
    @ColumnSpec({ label: 'Status', lookup: statusLookup, isFilter: 'single' })
    status: string
    @ColumnSpec({ label: 'Subject' })
    subject: string
    // @ColumnSpec({ label: 'Author' })
    // author: string
    // @ColumnSpec({ label: 'Assignee' })
    // assignee: any
    @ColumnSpec({ label: 'Start Date' })
    startDate: Date
    @ColumnSpec({ label: 'Due Date' })
    dueDate: Date
    @ColumnSpec({ label: '% Done', lookup: percentLookup })
    percentDone: any

    getDataSource = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(require('./data.json'))
            }, 1000) // indicating pending time for API requesting
        })
    }
    render() {
        return <Table getDataSource={this.getDataSource} columnSpec={this} />
    }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
