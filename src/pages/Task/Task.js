import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton,
  Modal,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
} from '@mui/material'
import { FcHighPriority, FcMediumPriority, FcLowPriority } from 'react-icons/fc'
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { getTasks, deleteTask, addTask, getTask, updateTask, setErrorMessage } from 'redux/modules/task/actions'
import { taskListSelector, taskSelector, errorMessageSelector } from 'redux/modules/task/selectors'

const Task = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const tasks = useSelector(taskListSelector)
  const task = useSelector(taskSelector)
  const errorMessage = useSelector(errorMessageSelector)
  const [taskList, setTaskList] = useState([])
  const [currentTask, setCurrentTask] = useState({})
  const [open, setOpen] = useState(false)
  const [dueDate, setDueDate] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [priorityText, setPriorityText] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [editStatus, setEditStatus] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getTasks({ id }))
  }, [dispatch, id])

  useEffect(() => {
    setTaskList(tasks)
  }, [tasks])

  useEffect(() => {
    setCurrentTask(task)
  }, [task])

  useEffect(() => {
    setMessage(errorMessage)
  }, [errorMessage])

  const renderPriority = (priority) => {
    switch (priority) {
      case 'low':
        return <FcLowPriority style={{ fontSize: 20 }} />
      case 'medium':
        return <FcMediumPriority style={{ fontSize: 20 }} />
      case 'high':
        return <FcHighPriority style={{ fontSize: 20 }} />
      default:
        return ''
    }
  }

  const handleAdd = () => {
    setEditStatus(false)
    setOpen(true)
  }

  const handleChange = (task_id, id) => () => {
    dispatch(updateTask({
      id,
      task_id,
      body: {
        completed: true,
      },
    }))
  }

  const handleEdit = (task_id) => () => {
    setEditStatus(true)
    dispatch(getTask({
      task_id,
      success: (res) => {
        setDescriptionText(res.data?.description)
        setDueDate(res.data?.due_date)
        setPriorityText(res.data?.priority)
        setOpen(true)
      }
    }))
  }

  const handleDelete = (task_id) => () => {
    dispatch(deleteTask({ id, task_id }))
  }

  const handleSubmit = () => {
    editStatus ?
      dispatch(updateTask({
        id,
        task_id: currentTask.id,
        body: {
          description: descriptionText,
          due_date: dueDate,
          priority: priorityText,
        },
        success: () => {
          setOpen(false)
          setDescriptionText('')
          setPriorityText('')
          setDueDate('')
        }
      }))
      :
      dispatch(addTask({
        id,
        body: {
          description: descriptionText,
          due_date: dueDate,
          priority: priorityText,
        },
        success: () => {
          setOpen(false)
          setDescriptionText('')
          setPriorityText('')
          setDueDate('')
        }
      }))
  }

  useEffect(() => {
    setDisabled(descriptionText === '' || dueDate === '' || priorityText === '')
  }, [descriptionText, dueDate, priorityText])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Card sx={{ width: '40%' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              borderBottom: '1px solid',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h5" >Task List</Typography>
            <IconButton color="inherit" onClick={handleAdd}>
              <AiOutlinePlus />
            </IconButton>
          </Box>
          {taskList?.length > 0 ?
            taskList.map((item) => {
              const { description, due_date, priority, completed } = item

              return (
                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={completed} onChange={handleChange(item.id, id)} />
                      }
                      label={
                        <Typography sx={{ textDecoration: completed && 'line-through' }}>{description}</Typography>
                      }
                      sx={{ width: 250 }}
                    />
                    <Typography sx={{ textDecoration: completed && 'line-through', mr: 2 }}>{due_date}</Typography>
                    {renderPriority(priority)}
                  </Box>
                  <Box>
                    {!completed &&
                      <IconButton onClick={handleEdit(item.id)}>
                        <AiOutlineEdit />
                      </IconButton>
                    }
                    <IconButton onClick={handleDelete(item.id)}>
                      <AiOutlineDelete />
                    </IconButton>
                  </Box>
                </Box>
              )
            })
            :
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center' }}>No Tasks</Typography>
          }
        </CardContent>
        <CardActions>
          <Link
            onClick={() => history.push('/')}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '100%',
            }}
            underline="hover"
          >
            Todo List
          </Link>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '4px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            width: '30%',
            border: 'none',
            p: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ minWidth: 150 }}>Description:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              sx={{ ml: 2 }}
              size="small"
              value={descriptionText}
              onChange={(e) => {
                setDescriptionText(e.target.value)
                dispatch(setErrorMessage(''))
              }}
              error={message !== ''}
              helperText={message}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ minWidth: 150 }}>Due Date:</Typography>
            <TextField
              fullWidth
              type="date"
              defaultValue={dueDate}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ ml: 2 }}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ minWidth: 150 }}>Priority:</Typography>
            <FormControl fullWidth size="small" sx={{ ml: 2 }}>
              <Select
                value={priorityText}
                onChange={(e) => setPriorityText(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='outlined' sx={{ mr: 2 }} onClick={() => {
              setOpen(false)
              dispatch(setErrorMessage(''))
              setDescriptionText('')
              setDueDate('')
              setPriorityText('')
            }}
            >
              Cancel
            </Button>
            <Button variant='contained' disabled={disabled} onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </Box >
  )
}

export default Task
