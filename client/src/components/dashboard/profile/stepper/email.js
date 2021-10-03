import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';

const steps = ['Enter old email', 'Enter new email', 'Are you sure ?'];

const EmailStepper = ({user}) => {
  const [activeStep, setactiveStep] = React.useState(0)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      newemail: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required').test(
        'is-42',
        "this isn't the number i want",
        (email) => email !== user.email,
      ),
      newemail: Yup.string().email('set new email').required('Required')
    }),
    onSubmit: (values) => {
      console.log(values)
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 ?
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="enter old email"
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
            </Box>
            : null}
        </form>
      </Box>
    </Box >
  );
}

export default EmailStepper