import { FilterOutlined } from '@ant-design/icons'
import { Button, Checkbox, Menu, Radio } from 'antd'
import { ColumnType } from 'antd/lib/table'
import { FilterDropdownProps } from 'antd/lib/table/interface'
import React, { Key, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { doSearch } from '../controller/action'

type Source = { key: string; value: string }
type FilterProps = {
    dataIndex: string
    defaultValue?: string
    clientPerform?: boolean
    multi?: boolean
    dataSource?: (() => Promise<Source[]>) | Source[]
}

const _searchCached = new Map<string, string>()
export const getColumnFilterProps = (props: FilterProps): ColumnType<any> => {
    const { dataIndex, defaultValue, clientPerform, dataSource, multi } = props
    const handleSearch = (selectedKeys: Key[], confirm: () => void) => {
        if (selectedKeys.length === 0) return
        if (clientPerform) confirm()
        _searchCached.set(dataIndex, selectedKeys[0].toString())
        doSearch(dataIndex, selectedKeys[0].toString())
    }

    const handleReset = (clearFilters: () => void = () => {}) => {
        clearFilters()
        _searchCached.delete(dataIndex)
        doSearch(dataIndex, '')
    }
    return {
        filterDropdown: (filterProps: FilterDropdownProps) => {
            const args = { ...props, ...filterProps }
            return <FilterContent {...args} />
        },
        filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(`${value}`.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => document.getElementById(`input-${dataIndex}`)?.focus(), 100)
            }
        },
        render: (text) =>
            _searchCached.get(dataIndex) ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[_searchCached.get(dataIndex)!]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    }
}

type ContentProps = FilterProps & FilterDropdownProps
type FilterState = { filteredKeys: string[]; dataSource: Source[] }
function FilterContent(props: ContentProps) {
    const { dataIndex, defaultValue, setSelectedKeys, selectedKeys, confirm, clearFilters, dataSource, multi } = props
    const [state, setState] = useState<FilterState>({
        filteredKeys: [],
        dataSource: typeof dataSource === 'function' ? [] : (dataSource as Source[])
    })

    useEffect(() => {
        // console.log('FilterContent', FilterContent)
        if (typeof dataSource === 'function') {
            dataSource().then((value: Source[]) => setState((s) => ({ ...s, dataSource: value })))
        }
    }, [])

    const onSelectKeys = (info: any) => {
        const item = info as { key: string }
        if (multi) {
            const { filteredKeys } = state
            filteredKeys.push(item.key)
            setState((s) => ({ ...s, filteredKeys }))
        } else {
            setState((s) => ({ ...s, filteredKeys: [info.key] }))
        }
    }

    const onReset = () => {
        setState((s) => ({ ...s, filteredKeys: [] }))
    }

    const Component = multi ? Checkbox : Radio
    const MenuItem = state.dataSource.map((i) => (
        <Menu.Item key={i.key}>
            <Component checked={state.filteredKeys.includes(i.key)} />
            <span>{i.value}</span>
        </Menu.Item>
    ))
    return (
        <div style={{ padding: 8 }}>
            <>
                <Menu
                    // multiple={filterMultiple}
                    // prefixCls={`${dropdownPrefixCls}-menu`}
                    // className={dropdownMenuClass}
                    // onClick={onMenuClick}
                    onClick={onSelectKeys}
                    // onDeselect={onSelectKeys}
                    // selectedKeys={selectedKeys}
                    // getPopupContainer={getPopupContainer}
                    // openKeys={openKeys}
                    // onOpenChange={onOpenChange}
                >
                    {multi ? <Radio.Group>{MenuItem}</Radio.Group> : MenuItem}
                </Menu>
                <div className={`ant-table-filter-dropdown-btns`}>
                    <Button type='link' size='small' disabled={state.filteredKeys.length === 0} onClick={onReset}>
                        Reset
                    </Button>
                    <Button
                        type='primary'
                        size='small'
                        // onClick={onConfirm}
                    >
                        OK
                    </Button>
                </div>
            </>
        </div>
    )
}
