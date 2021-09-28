import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'

const steps = ['Enter old email','Enter new email','Are you sure ?'];

const EmailStepper = () => {
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      email: '',
      newemail: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      newemail: Yup.string().email('set new email').required('Required')
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default EmailStepper