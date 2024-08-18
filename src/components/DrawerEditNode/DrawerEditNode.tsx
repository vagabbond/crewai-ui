import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { IAgent } from '../../types/interfaces/agent';
import { useFormik } from 'formik';
import { checkIfExist } from '../../utils/checkIfExist';
import { updateAgent } from '../../redux/user/userSlice';
import Select from 'react-select';
import { ITool } from '../../types/interfaces/tool';

interface IInitialValues {
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
  nodeId: string;
  toggleDrawer: () => void;
}

const DrawerEditNode: FC<IProps> = ({ nodeId, toggleDrawer }) => {
  const { alivableAgents, tools } = useAppSelector((state) => state.user);
  const node = alivableAgents.find((agent: IAgent) => agent.id === nodeId);
  const dispatch = useAppDispatch();
  const initialValues: IInitialValues = {
    role: node.role,
    goal: node.goal,
    backstory: node.backstory,
    modelName: { label: node.modelName, value: node.modelName },
    tools: node.tools.map((tool: string) => {
      return {
        label: tool,
        value: tool
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
        id: nodeId,
        modelName: values.modelName.value,
        tools: values.tools.map((tool) => tool.value)
      };
      actions.resetForm();
      toggleDrawer();
      dispatch(updateAgent(newValues));
    }
  });
  const handleCancel = () => {
    formik.resetForm();
    toggleDrawer();
  };
  const selectToolsOptions: ISelectOption[] = tools.map((tool: ITool) => ({
    label: tool.name,
    value: tool.id
  }));
  const SelectModelOptions: ISelectOption[] = [
    { label: 'GPT-4', value: 'gpt-4' },
    { label: 'GPT-3', value: 'gpt-3' }
  ];
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-3">
        <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-600">
          Your name
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Agent Role"
        />
        <p className="mt-2 text-sm text-red-600">{formik.touched.role && formik.errors.role}</p>
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
              color: 'white',
              ':hover': {
                backgroundColor: '#83c5ff',
                color: 'white',
                borderRadius: '0.5rem'
              }
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
        <p className="mt-2 text-sm text-red-600">{formik.touched.tools && formik.errors.tools}</p>
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
        <p className="mt-2 text-sm text-red-600">
          {formik.touched.modelName && formik.errors.modelName}
        </p>
      </div>
      <div className="mt-3">
        <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-900">
          Goal
        </label>
        <textarea
          id="goal"
          name="goal"
          value={formik.values.goal}
          onChange={formik.handleChange}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."></textarea>
        <p className="mt-2 text-sm text-red-600">{formik.touched.goal && formik.errors.goal}</p>
      </div>
      <div className="mt-3">
        <label htmlFor="backstory" className="block mb-2 text-sm font-medium text-gray-900 ">
          Backstory
        </label>
        <textarea
          id="backstory"
          name="backstory"
          value={formik.values.backstory}
          onChange={formik.handleChange}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your thoughts here..."></textarea>
        <p className="mt-2 text-sm text-red-600">
          {formik.touched.backstory && formik.errors.backstory}
        </p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Save
        </button>
      </div>
    </form>
  );
};

export default DrawerEditNode;
