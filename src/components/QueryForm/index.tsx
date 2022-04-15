import React, { useState } from 'react'
import { Box, Button, Grid, Tooltip } from '@mui/material'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { useForm, FieldValues, DefaultValues, UseFormRegister } from 'react-hook-form'

import QueryFormItem, { QueryFormItemProps } from './QueryFormItem'

type FormFieldValues = Record<string, any>

export interface QueryFormProps<T extends DefaultValues<FieldValues>> {
  items: QueryFormItemProps[]
  formValue: T
}

interface FormButtonGroupProps {
  expand: Boolean
  handleQueryClick: () => void
  handleResetClick: () => void
  handleExpandClick: () => void
}

const FormButtonGroup: React.FC<FormButtonGroupProps> = ({
  expand,
  handleQueryClick,
  handleResetClick,
  handleExpandClick,
}) => {
  return (
    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flex: 1 }} />
      <Tooltip title="重置查询表单">
        <Button sx={{}} variant="contained" color="success" size="small" onClick={handleResetClick}>
          重置
        </Button>
      </Tooltip>
      <Tooltip title="查询数据">
        <Button sx={{ ml: 2 }} variant="contained" size="small" onClick={handleQueryClick}>
          查询
        </Button>
      </Tooltip>
      <Tooltip title={(expand ? '收起' : '展开') + '查询表单'}>
        <Button
          sx={{ ml: 2 }}
          size="small"
          endIcon={expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={handleExpandClick}
        >
          {expand ? '收起' : '展开'}
        </Button>
      </Tooltip>
    </Box>
  )
}

const QueryForm = <T extends DefaultValues<FieldValues>>(props: QueryFormProps<T>) => {
  const [expand, setExpand] = useState(true)

  const { items, formValue } = props
  const useFormReturn = useForm<DefaultValues<FieldValues>>({
    mode: 'all',
    defaultValues: formValue,
  })
  const { register, control, handleSubmit, reset, watch } = useFormReturn
  const onSubmit = handleSubmit((fdata) => {
    console.log(fdata)
  })

  const handleResetClick = () => {
    reset()
  }

  const handleQueryClick = () => {
    handleSubmit((fdata) => {
      console.log(fdata)
    })
  }

  const handleExpandClick = () => {
    setExpand(!expand)
  }

  return (
    // flexWrap: 'wrap',
    // width: '100%',
    // display: 'flex',
    // ml: 2,
    //     mr: 2,
    //     mt: 2,
    //     mb: 2,
    <Box
      sx={{
        ml: 2,
        mr: 2,
        mt: 2,
        mb: 2,
        '& .MuiTextField-root': { mt: 0 },
      }}
      autoComplete="off"
      component="form"
    >
      <Grid container spacing={2}>
        {items.map((item) => {
          let itemWidth = 1
          if (item.type === 'date-range' || item.type === 'datetime-range') {
            itemWidth = 2
          }
          // xs，sm，md，lg 和 xl
          return (
            <Grid
              item
              xs={itemWidth * 12}
              sm={itemWidth * 6}
              md={itemWidth * 2}
              lg={itemWidth * 2}
              xl={itemWidth * 2}
              key={item.id}
            >
              <QueryFormItem {...item} expand={expand} useFormReturn={useFormReturn} />
            </Grid>
          )
        })}
        <Grid item xs={2}>
          <FormButtonGroup
            expand={expand}
            handleQueryClick={handleQueryClick}
            handleResetClick={handleResetClick}
            handleExpandClick={handleExpandClick}
          />
        </Grid>
      </Grid>

      {/* <Box sx={{ flex: 1 }} /> */}
    </Box>
  )
}

export default QueryForm
