import { Pagination, PaginationProps } from 'antd'
import React from 'react'

interface TFooterProps extends PaginationProps {
    disabled?: boolean
}
export const TFooter = (props: TFooterProps) => <Pagination {...props} />
