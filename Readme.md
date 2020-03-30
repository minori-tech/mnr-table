# MNR Table

A common function to render table

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install mnr-table --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add mnr-table
```

## Ussage

```js
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { ColumnSpec } from 'mnr-decorator'
import { Table } from '../src/index'

class Demo extends PureComponent {
    @ColumnSpec({ label: 'Type', isFilter: 'multi' })
    type: string
    @ColumnSpec({ label: 'Subject', isFilter: 'single' })
    subject: string
    @ColumnSpec({ label: 'Create Date', isFilter: 'date' })
    createDate: number | string

    getDataSource = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        type: 1,
                        subject: 'Subject 1',
                        createDate: new Date().getTime()
                    },
                    {
                        type: 2,
                        subject: 'Subject 2',
                        createDate: new Date().getTime()
                    },
                    {
                        type: 3,
                        subject: 'Subject 3',
                        createDate: new Date().getTime()
                    },
                    {
                        type: 4,
                        subject: 'Subject 4',
                        createDate: new Date().getTime()
                    },
                    {
                        type: 5,
                        subject: 'Subject 5',
                        createDate: new Date().getTime()
                    }
                ])
            }, 1000) // indicating pending time for API requesting
        })
    }
    render() {
        return <Table getDataSource={this.getDataSource} columnSpec={this} />
    }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
```
