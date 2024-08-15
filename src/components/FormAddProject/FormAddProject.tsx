import { FC } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addProject } from '../../redux/user/userSlice';
import { checkIfExist } from '../../utils/checkIfExist';
import { validationSchema } from './validation';

import Select from 'react-select';

import { IAgent } from '../../types/interfaces/agent';

export interface IInitialValues {
  name: string;
  description: string;
  llm: ISelectOption | null;
  agents: ISelectOption[] | null;
  isSequential: boolean;
}
interface ISelectOption {
  label: string;
  value: string;
}
interface IProps {
  toggleModal: () => void;
}

const FormAddProject: FC<IProps> = ({ toggleModal }) => {
  const { alivableAgents, projects } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const initialValues: IInitialValues = {
    name: '',
    description: '',
    llm: null,
    agents: [],
    isSequential: false
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      const check = checkIfExist({ items: projects, keyWord: values.name });
      if (!values.llm || check || !values.agents) {
        return actions.setErrors({
          name: check ? 'Project already exists' : ''
        });
      }
      dispatch(addProject({values,alivableAgents}));
      actions.resetForm();
      toggleModal();
    },
    validationSchema: validationSchema
  });

  const selectAgentsOptions: ISelectOption[] = alivableAgents.map((agent: IAgent) => ({
    label: agent.role,
    value: agent.id
  }));
  const selectLLMOptions: ISelectOption[] = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-3', value: 'gpt-3' }
  ];

  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
      <div className="">
        <div className="mt-3">
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Project Name"
            className="bg-white border-[#d1d5db] text-gray-900 text-sm rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500 text-xs mt-1">{
            formik.touched.name && 
            formik.errors.name}</p>
        </div>
        <div className="mt-3">
          <label htmlFor="agents" className="text-sm text-gray-600 mb-1">
            Agents
          </label>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                padding: '0.625rem',
                fontSize: '0.875rem'
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#d1d5db' : 'white',
                color: state.isFocused ? 'black' : 'black',
                cursor: 'pointer'
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: '150px',
                backgroundColor: 'white',
                zIndex: 9999,
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#2563EB',
                  borderRadius: '9999px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#d1d5db'
                }
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: '#2563EB',
                color: 'white',
                borderRadius: '0.5rem'
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'white'
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: 'white'
              })
            }}
            value={formik.values.agents}
            isMulti
            isSearchable
            name="agents"
            closeMenuOnSelect={false}
            options={selectAgentsOptions}
            noOptionsMessage={() => 'No agents available'}
            placeholder="Select Agents..."
            onChange={(selectedOption) => {
              const newValues = selectedOption.map((option) => ({
                label: option.label,
                value: option.value
              }));
              formik.setValues({
                ...formik.values,
                agents: newValues
              });
            }}
          />
          <p className="text-red-500 text-xs mt-1">{
            formik.touched.agents &&
            formik.errors.agents}</p>
        </div>
        <div className="mt-3">
          <label htmlFor="llm" className="text-sm text-gray-600 mb-1">
            LLM
          </label>
          <Select
            styles={{
              control: (provided) => ({
                ...provided,
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                padding: '0.625rem',
                fontSize: '0.875rem'
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#d1d5db' : 'white',
                color: state.isFocused ? 'black' : 'black',
                cursor: 'pointer'
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: '100px',
                backgroundColor: 'white',
                zIndex: 9999,
                '&::-webkit-scrollbar': {
                  width: '8px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#2563EB',
                  borderRadius: '9999px'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#d1d5db'
                },
                border: '1px solid #d1d5db'
              })
            }}
            value={formik.values.llm}
            isSearchable
            name="llm"
            placeholder="Select LLM..."
            onChange={(selectedOption) => {
              selectedOption &&
                formik.setValues({
                  ...formik.values,
                  llm: selectedOption
                });
            }}
            options={selectLLMOptions}
          />
          <p className="text-red-500 text-xs mt-1">{
            formik.touched.llm &&
            formik.errors.llm}</p>
        </div>
        <div className="mt-3">
          <label htmlFor="description" className="text-sm text-gray-600 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            placeholder="Project Description"
            className="bg-white border-[#d1d5db] text-gray-900 text-sm rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500 text-xs mt-1">{
          formik.touched.description &&
            formik.errors.description}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-3 items-center">
        <label htmlFor="isSequential" className="text-sm text-gray-600">
          Sequential
        </label>
        <input
          type="checkbox"
          id="isSequential"
          name="isSequential"
          onChange={formik.handleChange}
          checked={formik.values.isSequential}
          className="rounded-lg border-[#d1d5db] text-blue-600 text-sm border-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
        <p className="text-red-500 text-xs mt-1">{
          formik.touched.isSequential &&
          formik.errors.isSequential}</p>
      </div>
      <button
        type="submit"
        className="mt-3 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Add Project
      </button>
    </form>
  );
};

export default FormAddProject;
