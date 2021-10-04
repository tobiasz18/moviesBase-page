import * as React from 'react'
import * as Yup from 'yup'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { changeEmailUserAsync } from '../../../../store/actions/users_actions'

const steps = ['Enter old email', 'Enter new email', 'Are you sure ?'];

const EmailStepper = ({ user }) => {
  const [activeStep, setactiveStep] = React.useState(0)
  const dispatch = useDispatch()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      newemail: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required').test(
        'match',
        "Please check your email",
        (email) => email === user.data.email,
      ),
      newemail: Yup.string().email('set new email').required('Required').test(
        'match',
        "Please check your email",
        (email) => email !== user.data.email,
      ),
    }),
    onSubmit: (values) => {
      dispatch(changeEmailUserAsync(values))
    },
  });

  const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
  })

  const handleButton = (step) => {
    if (step === 'next') {
      setactiveStep((prevState) => prevState + 1)
    } else if (step === 'back') {
      setactiveStep((prevState) => prevState - 1)
    }
  }

  const btnNext = (disable) => {
    return (
      <Button disabled={disable} onClick={() => handleButton('next')}>Next</Button>
    )
  }

  const btnBack = () => {
    return (
      <Button onClick={() => handleButton('back')}>Back</Button>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4} >
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 ?
            <Box mb={2} >
              <TextField
                fullWidth
                name="email"
                label="enter old email"
                {...formik.getFieldProps('email')}
                {...errorHelper(formik, 'email')}
              />
              <Box pt={2} sx={{ display: 'flex', justifyContent: 'right' }} >
                {!formik.errors.email && formik.values.email ? btnNext(false) : btnNext(true)}
              </Box>
            </Box>
            : null}
          {activeStep === 1 ?
            <Box mb={2}>
              <TextField
                fullWidth
                name="newemail"
                label="enter new email"
                {...formik.getFieldProps('newemail')}
                {...errorHelper(formik, 'newemail')}
              />
              <Box pt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {btnBack()}
                {!formik.errors.newemail && formik.values.newemail ? btnNext(false) : btnNext(true)}
              </Box>
            </Box>
            : null}
          {activeStep === 2 ?
            <Box pt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {btnBack()}
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </Box>
            : null
          }
        </form>
      </Box>
    </Box >
  );
}

export default EmailStepper