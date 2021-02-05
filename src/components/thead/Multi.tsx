import Menu, { MenuItem } from 'rc-menu'
import 'rc-menu/assets/index.css'
import React from 'react'

export function Multi({ dataSource }: { dataSource: { key: string; value: string }[] }) {
    return (
        <Menu multiple>
            {dataSource?.map((d) => (
                <MenuItem key={d.key} value={d.key}>
                    {d.value}
                </MenuItem>
            ))}
        </Menu>
    )
}
