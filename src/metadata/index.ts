import { AlignOptions, BaseOptions, ColumnOptions, FilterOptions, RenderOptions, ResponsiveOptions } from '../@types'
import { getColumnFilterProps, getColumnSearchProps } from '../components/thead'

type ColumnDecorator = (object: any, propertyName: string) => void

export function Column(options: BaseOptions = {}): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Render(options: RenderOptions = {}): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Responsive(options: ResponsiveOptions = {}): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Align(options: AlignOptions = {}): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Filter(options: FilterOptions = {}): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

const _container = new Map<string, unknown>()
const _metaColumns = new Map<string, unknown>()

export function addMetadata(target: Object, key: string, value: object) {
    const metaKey = `${target.constructor.name}-${key}`
    _container.set(target.constructor.name, target)
    _metaColumns.set(metaKey, Object.assign(value, _metaColumns.get(metaKey)))
}

export function getMetadataColumns(key: string, initialValues: URLSearchParams, clientPerform: boolean): BaseOptions[] {
    const regex = new RegExp('\\b' + key + '\\b')
    const columns: object[] = []
    _metaColumns.forEach((col: unknown) => {
        const value = col as ColumnOptions
        const defaultValue = initialValues.get(value.key)!
        if (regex.test(key)) {
            if (!value.render) {
                Object.assign(value, { dataIndex: value['key'] })
            }
            switch (value.filterType) {
                case 'date':
                    break
                case 'multi':
                    Object.assign(
                        value,
                        getColumnFilterProps({
                            dataIndex: value.key,
                            defaultValue,
                            clientPerform,
                            multi: value.multi,
                            dataSource: value.dataSource
                        })
                    )
                    break
                case 'search':
                    Object.assign(value, getColumnSearchProps({ dataIndex: value.key, defaultValue, clientPerform }))
                    break
                default:
                    break
            }
            columns.push(value)
        }
    })
    return columns as BaseOptions[]
}
