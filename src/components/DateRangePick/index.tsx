import React, { useState } from 'react'
import { Box, TextField, useTheme } from '@mui/material'
import DateRangePicker, { DateRangePickerProps, DateRange } from '@mui/lab/DateRangePicker'
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes'
import DateAdapterDayjs from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { useAppLocales } from '@/locales'

export type DataRangePickProps = Omit<DateRangePickerProps<Date>, 'renderInput'>

const DataRangePick: React.FC<DataRangePickProps> = (props) => {
  const theme = useTheme()
  const { dayjsLocacle } = useAppLocales()

  const { value, ...rest } = props

  let startDefaultValue = null
  let endDefaultValue = null
  if (Array.isArray(value)) {
    if (value.length !== 2) {
      console.warn(`date range values must has two. the give value is ${value}`)
      startDefaultValue = null
      endDefaultValue = null
    } else {
      const startValueObj = value[0]
      const endValueObj = value[1]
      startDefaultValue = startValueObj
      endDefaultValue = endValueObj
    }
  }

  const defaultValues: RangeInput<Date> = [startDefaultValue, endDefaultValue]

  const mask = '____-__-__'

  return (
    <LocalizationProvider dateAdapter={DateAdapterDayjs} locale={dayjsLocacle}>
      <DateRangePicker
        value={defaultValues}
        {...rest}
        mask={mask}
        renderInput={(startProps, endProps) => (
          <>
            <TextField fullWidth size="small" {...startProps} />
            {/* sx={{ mr: 0 }} */}
            <Box sx={{ width: theme.spacing(4), display: 'flex', justifyContent: 'center' }}>-</Box>
            <TextField fullWidth size="small" {...endProps} />
            {/* sx={{ mr: 2 }} */}
          </>
        )}
      />
    </LocalizationProvider>
  )
}

export default DataRangePick
