import axios from 'axios'

const API_LINK = 'http://localhost:8080/students'

export const createItem = async (item: unknown) => {
  const response = await axios.post(`${API_LINK}`, item)
  return response.data
}

export const getItems = async () => {
  const response = await axios.get(`${API_LINK}`)
  return response.data
}

export const getItem = async (id: string) => {
  const response = await axios.get(`${API_LINK}/${id}`)
  return response.data
}

export const updateItem = async (id: string, updatedItem: unknown) => {
  const response = await axios.put(`${API_LINK}/${id}`, updatedItem)
  return response.data
}

export const deleteItem = async (id: string) => {
  const response = await axios.delete(`${API_LINK}/${id}`)
  return response.data
}
