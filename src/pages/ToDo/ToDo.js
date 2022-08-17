import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  IconButton,
  Modal,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon
} from '@mui/material'
import { getTodoList, addTodo, deleteTodo, setErrorMessage } from 'redux/modules/todo/actions'
import { getAllTasks } from 'redux/modules/task/actions'
import { todoListSelector, errorMessageSelector } from 'redux/modules/todo/selectors'
import { allTasksSelector } from 'redux/modules/task/selectors'
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"
import { BsDot } from "react-icons/bs"

const ToDo = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const todos = useSelector(todoListSelector)
  const errorMessage = useSelector(errorMessageSelector)
  const allTasks = useSelector(allTasksSelector)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setDisabled(name === '')
  }, [name])

  useEffect(() => {
    setMessage(errorMessage)
  }, [errorMessage])

  useEffect(() => {
    dispatch(getTodoList())
    dispatch(getAllTasks())
  }, [dispatch])

  const handleSubmit = () => {
    dispatch(addTodo({
      body: {
        name
      },
      success: () => {
        setName('')
        setOpen(false)
      }
    }))
  }

  const handleDelete = (id) => () => {
    dispatch(deleteTodo({ id }))
  }

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
            <Typography variant="h5" >Todo</Typography>

            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <AiOutlinePlus />
            </IconButton>
          </Box>

          <List sx={{ width: '100%' }}>
            {todos?.length > 0 ?
              (todos.map((item) => {
                const { id, name } = item
                const completedCount = allTasks?.filter(item => item.todo_id === id && item.completed).length
                const allCount = allTasks?.filter(item => item.todo_id === id).length
                const todoCompleted = completedCount === allCount && completedCount !== 0

                return (
                  <ListItem
                    key={id}
                    secondaryAction={
                      <IconButton onClick={handleDelete(id)}>
                        <AiOutlineDelete />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <BsDot style={{ fontSize: 20, color: "#000" }} />
                    </ListItemIcon>
                    <Link
                      color="inherit"
                      onClick={() => !todoCompleted && history.push(`/todo/${id}`)}
                      sx={{
                        cursor: 'pointer',
                        textDecoration: todoCompleted && 'line-through'
                      }}
                      underline={todoCompleted ? "none" : "hover"}
                    >
                      {name} ({completedCount}/{allCount})
                    </Link>
                  </ListItem>
                )
              }))
              :
              <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center' }}>Add your todos</Typography>
            }
          </List>
        </CardContent>
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
            <Typography variant="h6" sx={{ minWidth: 150 }}>Name:</Typography>
            <TextField
              variant="outlined"
              fullWidth
              error={message !== ''}
              helperText={message}
              sx={{ ml: 2 }}
              size="small"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                dispatch(setErrorMessage(''))
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant='outlined'
              sx={{ mr: 2 }}
              onClick={() => {
                setOpen(false)
                setName('')
                dispatch(setErrorMessage(''))
              }}
            >Cancel</Button>
            <Button variant='contained' disabled={disabled} onClick={handleSubmit}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default ToDo
