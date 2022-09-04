import React from 'react'
import Select from 'react-select';

const MySelect = ({value, setSortType, options}) => {
  const handleChange = (e) => {
    setSortType(e)
  }

  console.log(value)

  return (
    <Select
    className='select-container'
    classNamePrefix="custom-select"
    isSearchable={false}
    name="sort"
    value={value}
    onChange={handleChange}
    placeholder={''}
    options={options}
  />
  )
}

export default MySelect