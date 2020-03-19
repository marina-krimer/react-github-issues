/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react'

function Select(props) {
  const { data, showEmptySelect, selectClass, placeholder, label, value, name, onChange,
    emptySelectValue, valueName } = props
  if (!data || data.length <= 0) {
    return showEmptySelect ? (
      <select className={selectClass} defaultValue={placeholder} required>
        <option disabled hidden>
          {placeholder}
        </option>
      </select>
    ) : null
  }

  return (
    <label htmlFor={!label ? `label` : label}>
      {label}
      <select
        className={selectClass}
        name={name}
        onChange={onChange}
        value={value && value !== '' ? value : ''}
      >
        {emptySelectValue && emptySelectValue.length > 0 ? (
          <option key={0} value={emptySelectValue}>
            {emptySelectValue}
          </option>
        ) : null}

        {data.map((item, idx) => (
          <option
            key={idx + 1}
            value={valueName && valueName !== '' ? item[valueName] : item}
          >
            {valueName && valueName !== '' ? item[valueName] : item}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
