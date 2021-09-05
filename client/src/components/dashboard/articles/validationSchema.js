import * as yup from 'yup';

export const initialValues = {
  title:'',
  content:'',
  excerpt:'',
  score:'',
  director:'',
  actors:[],
  status:'draft'
}

export const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  content: yup
    .string()
    .min(50, 'Too short content, write some more')
    .required('Content is required'),
  excerpt: yup
    .string()
    .max(500, 'Max 500 characters')
    .required('Excerpt is required'),
  director: yup
    .string()
    .required('Director is required'),
  actors: yup
    .array()
    .min(3,'Minimum is 3')
    .required('Must have actors'),
  score: yup
    .number()
    .required('Title is required'),
  status: yup
    .string()
    .required('Sorry the status is required')
})