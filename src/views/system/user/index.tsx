import React, { useState } from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
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
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  AppRegistration as AppRegistrationIcon,
} from '@mui/icons-material'

import { useForm } from 'react-hook-form'
import DataRangePick from '@/components/DateRangePick'
import QueryForm, { QueryFormProps } from '@/components/QueryForm'
import { DateRange } from '@mui/lab/DateRangePicker'
import { useRootStore } from '@/store'

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
  { id: 4, col1: 'Hello', col2: 'World' },
  { id: 5, col1: 'XGrid', col2: 'is Awesome' },
  { id: 6, col1: 'Material-UI', col2: 'is Amazing' },
]

const maxRowNum = 100
for (let i = 0; i < maxRowNum; i++) {
  rows.push({ id: i * 5 + 1, col1: 'Hello', col2: 'World' })
  rows.push({ id: i * 5 + 2, col1: 'XGrid', col2: 'is Awesome' })
  rows.push({ id: i * 5 + 3, col1: 'Material-UI', col2: 'is Amazing' })
  rows.push({ id: i * 5 + 4, col1: 'Hello', col2: 'World' })
  rows.push({ id: i * 5 + 5, col1: 'XGrid', col2: 'is Awesome' })
  rows.push({ id: i * 5 + 6, col1: 'Material-UI', col2: 'is Amazing' })
}

const columns: GridColDef[] = [
  { field: 'id', hide: true },
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
]

interface QueryFormData {
  fuzzy: string
}

const defaultQueryFormData: QueryFormData = {
  fuzzy: '',
}

const User: React.FC = () => {
  // const { register, handleSubmit } = useForm<QueryFormData>({
  //   mode: 'all',
  //   defaultValues: defaultQueryFormData,
  // })
  // const onSubmit = handleSubmit((data: QueryFormData) => {
  //   console.log(data)
  // })

  const [pageSize, setPageSize] = React.useState<number>(10)

  const title = '用户列表'

  // const handleExpandClick = () => {
  //   setExpand(!expand)
  // }

  const [value, setValue] = React.useState<DateRange<Date>>([null, null])

  type DateRangeType = Date | null

  interface UserQueryForm {
    fuzzy: string
    createOnRange: DateRangeType[]
  }

  const QueryFormItems: QueryFormProps<UserQueryForm> = {
    items: [
      {
        id: 'text1',
        name: 'fuzzy',
        type: 'text',
        label: '请输入关键字',
        important: true,
        autoFocus: true,
      },
      {
        id: 'dateR1',
        name: 'createOnRange',
        type: 'date-range',
        label: ['开始日期', '结束日期'],
        important: true,
      },
    ],
    formValue: {
      fuzzy: '123',
      createOnRange: [new Date(), new Date()],
    },
  }

  for (let i = 0; i < 10; i++) {
    QueryFormItems.items.push({
      id: 'text1' + i,
      name: 'fuzzy',
      type: 'text',
      label: '请输入关键字',
      important: true,
      autoFocus: true,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Paper elevation={0}>
        <QueryForm {...QueryFormItems} />
      </Paper>

      <Box sx={{ flex: 1, mt: 2 }}>
        <Paper sx={{ p: 2 }} elevation={0}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AppRegistrationIcon />
              <Typography variant="h5" color="text.secondary" align="center">
                {title}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />
            <Tooltip title="刷新">
              <IconButton aria-label="refresh">
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="下载">
              <IconButton aria-label="download">
                <DownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="设置显示列">
              <IconButton aria-label="setting show header">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flex: 1, height: 650, mt: 2 }}>
            <DataGrid
              checkboxSelection
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 20, 50]}
              pagination
              rows={rows}
              columns={columns}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default User
