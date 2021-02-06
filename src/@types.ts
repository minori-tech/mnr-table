export type FilterType = 'multi' | 'date' | undefined

export type Lookup = Record<number | string, string>
export type Translate = (key?: string) => string
export declare type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen' | 'fullhd'

export interface BaseOptions {
    key: string
    title: string | Translate
    className?: string
    sort?: boolean
}

export interface RenderOptions {
    render?: (record: unknown, index?: number) => JSX.Element
}

export interface ResponsiveOptions {
    responsive?: Breakpoint[]
}

export interface AlignOptions {
    align?: 'left' | 'center' | 'right'
}

export interface FilterOptions {
    filterType?: FilterType
    dataSource?: () => Promise<{ key: string; value: string }[]>
}

export interface ColumnOptions extends RenderOptions, FilterOptions {
    key: string
    title: string | Translate | React.ReactNode
    className?: string
    filterType?: FilterType
    responsive?: string[]
    align?: string
    sort?: boolean
}

export interface TableOptions {
    onEditRow?: (id: string) => void
    onDeleteRow?: (id: string) => Promise<any>
}

export interface TableProps<T extends object = any> {
    getDataSource(): Promise<T>
    formatDate?: string
    options?: TableOptions
}

export interface TableState<T> {
    loading: boolean
    columns: ColumnOptions[]
    dataSource?: T[]
    cachedDataSource?: string
    enableFilter?: boolean
    filter?: any
    pagination?: { page?: number; size?: number }
}

export type TableAction<T extends object = any> = { type: string; payload?: any } & T
export type Constructor<T> = new (...args: any[]) => T

export interface TableStore<T extends object = any> {
    baseURL: string
    dataSource?: Array<T>
    isLoading?: boolean
    total?: number
    limit?: number
    currentPage?: number
    isShowFilter?: boolean
    isShowExportModal?: boolean
    // filter?: Record<string, any>
    dispatch?: React.Dispatch<TableAction<T>>
}
