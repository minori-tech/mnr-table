import Pagination, { PaginationProps } from 'rc-pagination'
import React from 'react'
import '../styles/tfooter.less'

interface TFooterProps extends PaginationProps {
    disabled?: boolean
}
export const TFooter = (props: TFooterProps) => <Pagination {...props} />
