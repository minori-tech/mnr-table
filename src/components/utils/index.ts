import { ColumnOptions } from '../../@types'

const HIDDEN_CLASS = {
    mobile: 'is-hidden-mobile',
    tablet: 'is-hidden-tablet-only',
    desktop: 'is-hidden-desktop-only'
}

const ALIGN_CLASS = {
    left: 'has-text-left',
    center: 'has-text-centered',
    right: 'has-text-right'
}

export const getClasses = (options: ColumnOptions) => {
    const { align, className, responsive } = options
    const classes = []
    classes.push(...responsive?.map((r) => HIDDEN_CLASS[r]))
    if (className) classes.push(className)
    if (align) classes.push(ALIGN_CLASS[align])
    return classes.join(' ')
}
