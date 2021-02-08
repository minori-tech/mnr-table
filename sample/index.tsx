import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Table } from '../src'
import { Column, Filter, Render, Responsive, TableProps } from '../src/index'

function renderId(record: Sample): JSX.Element {
    return <>{record.id}</>
}

class Sample {
    @Column({ key: 'id', title: () => 'ID', className: 'xxx', width: 100, sort: true })
    @Render({ render: renderId })
    // @Align({ align: 'center' })
    id?: string

    @Column({ key: 'title', title: 'Title', sort: true })
    @Filter({ filterType: 'date' })
    // @Align({ align: 'right' })
    title?: number

    @Column({ key: 'body', title: 'Body', className: 'xxx' })
    @Responsive({ responsive: ['mobile', 'tablet'] })
    // @Align({ align: 'right' })
    body?: number

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
    const props = new TableProps(Sample, 'https://jsonplaceholder.typicode.com/posts')
    return (
        <BrowserRouter>
            <Table {...props} />
        </BrowserRouter>
    )
}

ReactDOM.render(<Demo />, document.getElementById('container'))
