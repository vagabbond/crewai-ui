import { FC } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateAgent } from '../../redux/user/userSlice';
import { checkIfExist } from '../../utils/checkIfExist';
import { validationSchema } from './validation';

import Select from 'react-select';

import { IAgent } from '../../types/interfaces/agent';
import { ITool } from '../../types/interfaces/tool';

export interface IInitialValues {
  role: string;
  goal: string;
  backstory: string;
  modelName: ISelectOption | null;
  tools: ISelectOption[] | null;
}
interface ISelectOption {
  label: string;
  value: string;
}
interface IProps {
  toggleModal: () => void;
  item: IAgent;
}

const FormEditAgent: FC<IProps> = ({ item, toggleModal }) => {
  const { tools, alivableAgents } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const initialValues: IInitialValues = {
    role: item.role,
    goal: item.goal,
    backstory: item.backstory,
    modelName: { label: item.modelName, value: item.modelName },
    tools: item.tools.map((tool: string) => {
      const selectedTool: ITool = tools.find((t: ITool) => t.name === tool);
      return {
        label: selectedTool.name,
        value: selectedTool.id
      };
    })
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, actions) => {
      const check = checkIfExist({ items: alivableAgents, keyWord: values.role });
      if (!values.modelName || check || !values.tools) {
        return actions.setErrors({
          role: check ? 'Role already exists' : ''
        });
      }
      const newValues = {
        ...values,
        id: item.id,
        modelName: values.modelName.value,
        tools: values.tools.map((tool) => tool.value)
      };
      actions.resetForm();
      toggleModal();
      dispatch(updateAgent(newValues));
    },
    validationSchema: validationSchema
  });

  const selectToolsOptions: ISelectOption[] = tools.map((tool: ITool) => ({
    label: tool.name,
    value: tool.id
  }));
  const SelectModelOptions: ISelectOption[] = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-3', value: 'gpt-3' }
  ];

  return (
    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
      <div className="">
        <div className="mt-3">
          <label htmlFor="role" className="text-sm text-gray-600">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            required
            onChange={formik.handleChange}
            value={formik.values.role}
            placeholder="Agent Role"
            className="bg-white border-[#d1d5db] text-gray-900 text-sm rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500 text-xs italic mt-1">
            {formik.touched.role && formik.errors.role}
          </p>
        </div>
        <div className="mt-3">
          <label htmlFor="tools" className="text-sm text-gray-600 mb-1">
            Tools
          </label>
          <Select
            required
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
            value={formik.values.tools}
            isMulti
            isSearchable
            name="tools"
            closeMenuOnSelect={false}
            options={selectToolsOptions}
            noOptionsMessage={() => 'No tools available'}
            placeholder="Select tools..."
            onChange={(selectedOption) => {
              const newValues = selectedOption.map((option) => ({
                label: option.label,
                value: option.value
              }));
              formik.setValues({
                ...formik.values,
                tools: newValues
              });
            }}
          />
          <p className="text-red-500 text-xs italic mt-1">
            {formik.touched.tools && formik.errors.tools}
          </p>
        </div>
        <div className="mt-3">
          <label htmlFor="modelName" className="text-sm text-gray-600 mb-1">
            Model
          </label>
          <Select
            required
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
            value={formik.values.modelName}
            isSearchable
            name="modelName"
            placeholder="Select Model..."
            onChange={(selectedOption) => {
              selectedOption &&
                formik.setValues({
                  ...formik.values,
                  modelName: selectedOption
                });
            }}
            options={SelectModelOptions}
          />
          <p className="text-red-500 text-xs italic mt-1">
            {formik.touched.modelName && formik.errors.modelName}
          </p>
        </div>
        <div className="mt-3">
          <label htmlFor="goal" className="text-sm text-gray-600 mb-1">
            Goal
          </label>
          <textarea
            id="goal"
            name="goal"
            required
            onChange={formik.handleChange}
            value={formik.values.goal}
            placeholder="Agent goal"
            className="bg-white border-[#d1d5db] text-gray-900 text-sm rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500 text-xs italic mt-1">
            {formik.touched.goal && formik.errors.goal}
          </p>
        </div>
        <div className="mt-3">
          <label htmlFor="backstory" className="text-sm text-gray-600 mb-1">
            Backstory
          </label>
          <textarea
            id="backstory"
            name="backstory"
            required
            onChange={formik.handleChange}
            value={formik.values.backstory}
            placeholder="Agent backstory"
            className="bg-white border-[#d1d5db] text-gray-900 text-sm rounded-lg border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <p className="text-red-500 text-xs italic mt-1">
            {formik.touched.backstory && formik.errors.backstory}
          </p>
        </div>
      </div>
      <button
        type="submit"
        className="mt-3 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Update Agent
      </button>
    </form>
  );
};

export default FormEditAgent;
