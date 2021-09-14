import React from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { Link } from 'react-router-dom'
const Articles = (props) => {
  return (
    <AdminLayout section="Articles">
      <Link to="/dashboard/articles/add">Add</Link>
    </AdminLayout>
  )
}

export default Articles