import { Table } from '@tanstack/react-table'
import React from 'react'
import { Input } from './ui/input'

interface DataTableInputFilterProps<TData> {
    column: string,
    table: Table<TData>
}

function DataTableFilterInput<TData>({
    column,
    table
}: DataTableInputFilterProps<TData>) {

  return (
    <Input 
        placeholder='Filter...'
        value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        onChange={(event) => 
            table.getColumn(column)?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
    />
  )
}

export default DataTableFilterInput