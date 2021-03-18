import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { ColumnType } from 'antd/lib/table'
import React, { Key } from 'react'
import Highlighter from 'react-highlight-words'
import { doSearch } from '../controller/action'

type SearchProps = { dataIndex: string; defaultValue?: string; clientPerform?: boolean }

const _searchCached = new Map<string, string>()
export const getColumnSearchProps = (props: SearchProps): ColumnType<any> => {
    const { dataIndex, defaultValue, clientPerform } = props
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    id={`input-${dataIndex}`}
                    placeholder={`Search ${dataIndex}`}
                    defaultValue={defaultValue}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys, confirm)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size='small' style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
