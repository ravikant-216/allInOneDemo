import React, { useState } from 'react'
import { Button, Dialog, DialogTitle } from '@mui/material'
import InputField from '../../atoms/InputField'

export interface Student {
  id: string
  name: string
  age: number
  mark: number
}

interface ModelBoxProps {
  openModel: boolean
  onClose?: () => void
  preData: Student
  onClick: (data: Student) => void
}

const ModelBox = ({ openModel, onClose, preData, onClick }: ModelBoxProps) => {
  const [data, setData] = useState<Student>(preData)

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    head: 'name' | 'age' | 'mark'
  ) => {
    setData({
      ...data,
      [head]: e.target.value,
    })
  }

  return (
    <Dialog open={openModel} onClose={onClose} sx={{ gap: '32px' }}>
      <DialogTitle>Student Data</DialogTitle>
      <InputField
        label={'Name'}
        value={data.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(e, 'name')
        }
      />
      <InputField
        label={'Age'}
        value={data.age}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(e, 'age')
        }
      />
      <InputField
        label={'Mark'}
        value={data.mark}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(e, 'mark')
        }
      />
      <Button
        onClick={() => {
          onClick(data)
        }}
      >
        Submit
      </Button>
    </Dialog>
  )
}
export default ModelBox














import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from '../../services/Service'
import Icon from '../../atoms/Icon'
import ModelBox from '../PopUpModel.tsx'

export interface Student {
  id: string
  name: string
  age: number
  mark: number
}

const TableData = () => {
  const [data, setData] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openModel, setOpenModel] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await getItems()
      setData(studentData)
    }

    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteItem(id)
    setData(data.filter((student) => student.id !== id))
  }

  const handleEdit = async (student: Student) => {
    setSelectedStudent(student)
    setOpenModel(true)
  }

  const handleAdd = () => {
    setSelectedStudent(null)
    setOpenModel(true)
  }

  const handleSubmit = async (student: Student) => {
    if (selectedStudent) {
      await updateItem(selectedStudent.id, student)
      setData(
        data.map((item) => (item.id === selectedStudent.id ? student : item))
      )
    } else {
      const newStudent = await createItem(student)
      setData([...data, newStudent])
    }

    setOpenModel(false)
  }

  const filteredData = data.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((student: Student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.mark}</TableCell>
                <TableCell>
                  <Icon onClick={() => handleDelete(student.id)}>Delete</Icon>
                  <Icon onClick={() => handleEdit(student)}>Edit</Icon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleAdd}>Add</Button>
      </TableContainer>
      {openModel && (
        <ModelBox
          openModel={openModel}
          onClose={() => setOpenModel(false)}
          preData={selectedStudent || { id: '', name: '', age: 0, mark: 0 }}
          onClick={handleSubmit}
        />
      )}
    </Box>
  )
}

export default TableData
