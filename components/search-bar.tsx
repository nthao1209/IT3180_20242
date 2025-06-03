// components/search-bar.tsx
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
// Giả sử Server Action của bạn tên là handleSearchBarSearch và nằm trong actions/actions.ts
import { handleSearchBarSearch } from '@/actions/actions'; 

function SearchBar() {
  return (
    <form action={handleSearchBarSearch}>
      <div className='flex flex-col w-full space-y-2 sm:space-y-0
          sm:flex-row lg:max-w-lg sm:items-center sm:space-x-2
      '>
        <p className='text-slate-500 text-sm min-w-[70px]'>Search by</p>
        <Select name='search_by' defaultValue='all'> {/* Đặt giá trị mặc định là 'all' */}
          <SelectTrigger className='w-full lg:w-[480px]'>
            {/* Placeholder có thể là "All" hoặc "Keyword" */}
            <SelectValue placeholder="All Fields" /> 
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Fields</SelectItem> {/* Tiêu chí tìm kiếm chung */}
            <SelectItem value='name'>Title/Name</SelectItem>
            <SelectItem value='author'>Author</SelectItem>
            <SelectItem value='description'>Description</SelectItem>
            {/* Bỏ <SelectItem value='category'>Category</SelectItem> nếu không dùng nữa */}
          </SelectContent>
        </Select>
        <Input type='search' placeholder='Search...' name='search' required />
        <Button type='submit'>Search</Button>
      </div>
    </form>
  )
}

export default SearchBar;
