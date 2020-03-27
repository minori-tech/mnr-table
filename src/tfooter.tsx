import React from 'react'
import Pagination, { PaginationProps } from 'rc-pagination'
import localeInfo from 'rc-pagination/es/locale/en_US'
import './styles/tfooter.less'

interface TFooterProps extends PaginationProps {
    disabled?: boolean
}
export const TFooter = (props: TFooterProps) => <Pagination {...props} locale={localeInfo} />
