import 'reflect-metadata'
import { AlignOptions, BaseOptions, FilterOptions, RenderOptions, ResponsiveOptions, SortOptions } from '../@types'

type ColumnDecorator = (object: any, propertyName: string) => void

export function Column(options?: BaseOptions): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Render(options?: RenderOptions): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Responsive(options?: ResponsiveOptions): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Align(options?: AlignOptions): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Sort(options?: SortOptions): ColumnDecorator {
    return function (object: any, propertyName: string) {
        addMetadata(object, propertyName, options)
    }
}

export function Filter(options?: FilterOptions): ColumnDecorator {
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

export function getMetadataColumns(key: string): Record<string, unknown> {
    const regex = new RegExp('\\b' + key + '\\b')
    const columns: unknown[] = []
    const columnKeys: string[] = []
    _metaColumns.forEach((value, key) => {
        if (regex.test(key)) {
            columns.push(value)
            columnKeys.push(value['key'])
        }
    })
    return { columns, columnKeys }
}
