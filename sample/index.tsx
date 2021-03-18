import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { TableView } from '../src'
import { Column, Filter, Render, TableProps } from '../src/index'

function renderId(record: Sample): JSX.Element {
    return <>{record.id}</>
}

class Sample {
    @Column({ key: 'id', title: () => 'ID', className: 'xxx', width: 100, sort: true })
    @Render({ render: renderId })
    // @Align({ align: 'center' })
    id?: string

    @Column({ key: 'title', title: 'Title', sort: true })
    @Filter({ filterType: 'search' })
    // @Align({ align: 'right' })
    title?: string

    @Column({ key: 'body', title: 'Body', className: 'xxx' })
    // @Responsive({ responsive: ['mobile', 'tablet'] })
    // @Align({ align: 'right' })
    @Filter({ filterType: 'search' })
    body?: string

    @Column({ key: 'tracker', title: 'Tracker', className: 'xxx' })
    @Filter({
        filterType: 'multi',
        multi: false,
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
    const props = new TableProps(Sample, 'https://jsonplaceholder.typicode.com/posts')
    return (
        <BrowserRouter>
            <TableView {...props} clientPerform />
        </BrowserRouter>
    )
}

ReactDOM.render(<Demo />, document.getElementById('container'))
