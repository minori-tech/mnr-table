import React, { CSSProperties, MouseEvent } from 'react'
import FilterSVG from '../assets/icons/filter.svg'

interface IconsProps {
    style?: CSSProperties
    onClick?(e: MouseEvent<HTMLElement>): void
    children?: any
}

const renderIcon = (svgIcon: any, props: IconsProps) => (
    <div className='tbl-filter' {...props}>
        {svgIcon}
    </div>
)

export const FilterIcon: React.FunctionComponent<IconsProps> = (props: IconsProps) => renderIcon(<FilterSVG />, props)
