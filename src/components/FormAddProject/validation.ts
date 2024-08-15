import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string()
    .required('Description is required')
    .max(100, 'Description must be maximum 100 characters'),
  agents: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required('Agent is required'),
        value: Yup.string().required('Agent is required')
      })
    )
    .min(1, 'Agents is required')
    .max(5, 'Max 5 agents')
    .required('Agents is required'),
  llm: Yup.object()
    .shape({
      label: Yup.string().required('LLM is required'),
      value: Yup.string().required('LLM is required')
    })
    .required('LLM is required'),
  isSequential: Yup.boolean().required('Sequential is required')
});
