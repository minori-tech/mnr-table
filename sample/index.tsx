import React, { PureComponent, Fragment } from 'react'
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
    @ColumnSpec({ label: 'button action', isFilter: 'multi' })
    buttonAction: string
    @ColumnSpec({ label: 'check box', isFilter: 'multi' })
    checkBox: string
    @ColumnSpec({ label: 'radio button', isFilter: 'multi' })
    radioButton: string | boolean
    @ColumnSpec({ label: 'Switch button', isFilter: 'multi' })
    switchButton: string | boolean

    getDataSource = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        type: 1,
                        subject: 'Subject 1',
                        createDate: new Date().getTime(),
                        buttonAction: <button className='mrn-btn-status boder-none active'>active</button>,
                        checkBox: (
                            <Fragment>
                                <input id='c1' type='checkbox' />
                                <label></label>
                            </Fragment>
                        ),
                        radioButton: (
                            <Fragment>
                                <input id='c1' type='radio' name='radio' value='1' />
                                <label></label>
                            </Fragment>
                        ),
                        switchButton: (
                            <Fragment>
                                <input id='s1' type='checkbox' className='switch' />
                                <label></label>
                            </Fragment>
                        ),
                    },
                    {
                        type: 2,
                        subject: 'Subject 2',
                        createDate: new Date().getTime(),
                        buttonAction: <button className='mrn-btn-status boder-none nolmal'>nolmal</button>,
                        checkBox: (
                            <Fragment>
                                <input id='c1' type='checkbox' />
                                <label></label>
                            </Fragment>
                        ),
                        radioButton: (
                            <Fragment>
                                <input id='c2' type='radio' name='radio' value='2' />
                                <label></label>
                            </Fragment>
                        ),
                        switchButton: (
                            <Fragment>
                                <input id='s1' type='checkbox' className='switch' />
                                <label></label>
                            </Fragment>
                        ),
                    },
                    {
                        type: 3,
                        subject: 'Subject 3',
                        createDate: new Date().getTime(),
                        buttonAction: <button className='mrn-btn-status boder-none inactive'>inactive</button>,
                        checkBox: (
                            <Fragment>
                                <input id='c1' type='checkbox' />
                                <label></label>
                            </Fragment>
                        ),
                        radioButton: (
                            <Fragment>
                                <input id='c3' type='radio' name='radio' />
                                <label></label>
                            </Fragment>
                        ),
                        switchButton: (
                            <Fragment>
                                <input id='s1' type='checkbox' className='switch' />
                                <label></label>
                            </Fragment>
                        ),
                    },
                    {
                        type: 4,
                        subject: 'Subject 4',
                        createDate: new Date().getTime(),
                        buttonAction: <button className='mrn-btn-status boder-none nolmal'>nolmal</button>,
                        checkBox: (
                            <Fragment>
                                <input id='c1' type='checkbox' />
                                <label></label>
                            </Fragment>
                        ),
                        radioButton: (
                            <Fragment>
                                <input id='c4' type='radio' name='radio' />
                                <label></label>
                            </Fragment>
                        ),
                        switchButton: (
                            <Fragment>
                                <input id='s1' type='checkbox' className='switch' />
                                <label></label>
                            </Fragment>
                        ),
                    },
                    {
                        type: 5,
                        subject: 'Subject 5',
                        createDate: new Date().getTime(),
                        buttonAction: <button className='mrn-btn-status boder-none active'>active</button>,
                        checkBox: (
                            <Fragment>
                                <input id='c1' type='checkbox' />
                                <label></label>
                            </Fragment>
                        ),
                        radioButton: (
                            <Fragment>
                                <input id='c5' type='radio' name='radio' />
                                <label></label>
                            </Fragment>
                        ),
                        switchButton: (
                            <Fragment>
                                <input id='s1' type='checkbox' className='switch' />
                                <label></label>
                            </Fragment>
                        ),
                    },
                ])
            }, 1000) // indicating pending time for API requesting
        })
    }
    render() {
        return <Table getDataSource={this.getDataSource} columnSpec={this} />
    }
}

ReactDOM.render(<Demo />, document.getElementById('container'))
