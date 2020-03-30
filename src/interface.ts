import { FilterType } from 'mnr-decorator'

export interface ColumnProps {
    key: string
    text: string | undefined
    isFilter?: FilterType
}

export interface TableOptions {
    onEditRow?: (id: string) => void
    onDeleteRow?: (id: string) => Promise<any>
}

export interface TableState {
    loading: boolean
    columns: ColumnProps[]
    dataSource?: any[]
    cachedDataSource?: string
    enableFilter?: boolean
    filter?: any
    pagination?: { page?: number; size?: number }
}

export interface TableProps {
    columnSpec?: any
    getDataSource(): Promise<any>
    formatDate?: string
    options?: TableOptions
}
