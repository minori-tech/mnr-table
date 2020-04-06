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
class Demo extends PureComponent {
    @ColumnSpec({ label: 'Tracker', lookup: Object.freeze({ 1: 'Task', 2: 'Bug' }) })
    tracker: string
    @ColumnSpec({ label: 'Status', lookup: statusLookup })
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
    @ColumnSpec({ label: '% Done' })
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
