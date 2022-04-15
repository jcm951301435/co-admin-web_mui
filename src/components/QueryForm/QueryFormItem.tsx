import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  TextField,
  useTheme,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material'
import DataRangePick from '@/components/DateRangePick'
import { Controller, UseFormReturn } from 'react-hook-form'

type QueryFormItemType = 'text' | 'number' | 'date' | 'datetime' | 'date-range' | 'datetime-range'

type LabelType = string | string[]

export interface QueryFormItemProps {
  id: string
  name: string
  type: QueryFormItemType
  label?: LabelType
  important?: boolean
  autoFocus?: boolean
}

interface QueryFormItemUseProps extends QueryFormItemProps {
  expand: boolean
  useFormReturn: UseFormReturn
}

interface QueryFormItemComProps extends QueryFormItemUseProps {
  itemDisplay: string
}

const QueryFormItem: React.FC<QueryFormItemUseProps> = (props) => {
  const { type, important, expand, useFormReturn } = props
  const { register, control, handleSubmit, reset, watch } = useFormReturn
  let ItemCom = null

  const itemDisplay = important !== true && !expand ? 'none' : 'inline-flex'
  switch (type) {
    case 'text':
      ItemCom = <QueryFormItemText itemDisplay={itemDisplay} {...props} />
      break
    case 'number':
      break
    case 'date':
      break
    case 'datetime':
      break
    case 'date-range':
      ItemCom = <QueryFormItemDateRange itemDisplay={itemDisplay} {...props} />
      break
    case 'datetime-range':
      break
    default:
      break
  }
  return ItemCom
}

const QueryFormItemText: React.FC<QueryFormItemComProps> = (props) => {
  const { name, label, autoFocus, useFormReturn, itemDisplay } = props
  const { register, control, handleSubmit, reset, watch } = useFormReturn
  let textLabel = '请输入内容'
  if (typeof label === 'string') {
    textLabel = label
  }
  return (
    <TextField
      autoFocus={autoFocus}
      label={textLabel}
      margin="normal"
      size="small"
      fullWidth
      sx={{ mr: 2, flexWrap: 'nowrap', display: itemDisplay }}
      {...register(name)}
    />
  )
}

const QueryFormItemDateRange: React.FC<QueryFormItemComProps> = (props) => {
  const { name, label, autoFocus, useFormReturn } = props
  const { register, control, handleSubmit, reset, watch } = useFormReturn
  let startLabel = '开始时间'
  let endLabel = '结束时间'
  if (Array.isArray(label)) {
    startLabel = label[0]
    endLabel = label[1]
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <DataRangePick
            value={field.value}
            onChange={(value) => {
              field.onChange(value)
            }}
            startText={startLabel}
            endText={endLabel}
          />
        )
      }}
    />
  )
}

export default QueryFormItem
