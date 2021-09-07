import React from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { Link } from 'react-router-dom'
const Articles = (props) => {
  console.log(props)
  return (
    <AdminLayout section="Articles">

      Articles
      <Link to="/dashboard/articles/add">home</Link>
    </AdminLayout>
  )
}

export default Articles