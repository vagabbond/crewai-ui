import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  goal: Yup.string().required('Goal is required').max(100, 'Goal must be maximum 100 characters'),
  backstory: Yup.string()
    .required('Backstory is required')
    .max(100, 'Backstory must be maximum 100 characters'),
  modelName: Yup.object()
    .shape({
      label: Yup.string().required('Model name is required'),
      value: Yup.string().required('Model name is required')
    })
    .required('Model name is required'),
  tools: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required('Tool is required'),
        value: Yup.string().required('Tool is required')
      })
    )
    .min(1, 'Tools is required')
    .max(5, 'Max 5 tools')
    .required('Tools is required')
    .required('Tools is required')
});
