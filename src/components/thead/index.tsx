import { ColumnOptions } from '../../@types'

enum SORT_CLASS {
    NONE = 'sorting',
    ASC = 'sorting_asc',
    DESC = 'sorting_desc'
}
const SORT_ATTRIBUTE = 'data-sort'
const SORT_REGEX = new RegExp(/sorting_asc|sorting_desc/, 'i')

type THeadProps = { columns: ColumnOptions[] }

function updateClassCell(currentTarget: EventTarget & HTMLTableHeaderCellElement) {
    const currentSort = currentTarget.getAttribute(SORT_ATTRIBUTE)
    switch (currentSort) {
        case SORT_CLASS.ASC:
            currentTarget.classList.remove(SORT_CLASS.ASC)
            currentTarget.classList.add(SORT_CLASS.DESC)
            currentTarget.setAttribute(SORT_ATTRIBUTE, SORT_CLASS.DESC)
            break
        case SORT_CLASS.DESC:
            currentTarget.classList.remove(SORT_CLASS.DESC)
            currentTarget.classList.add(SORT_CLASS.NONE)
            currentTarget.removeAttribute(SORT_ATTRIBUTE)
            break
        case SORT_CLASS.NONE:
        case null:
            currentTarget.classList.remove(SORT_CLASS.NONE)
            currentTarget.classList.add(SORT_CLASS.ASC)
            currentTarget.setAttribute(SORT_ATTRIBUTE, SORT_CLASS.ASC)
            break
        default:
            break
    }
}

export { renderTHCell } from './THeadCell'
