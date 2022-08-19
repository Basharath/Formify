import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { UserFormTypeWithId, UserType } from '../types';
import toast from 'react-hot-toast';
import {
  createUserForm,
  deleteUserForm,
  signout,
  updateUserForm,
} from '../http';
import { AxiosError } from 'axios';
import UserFormItem from '../components/UserFormItem';
import FormMenubar from '../components/FormMenubar';
import {
  copyToClipboard,
  generateFieldsObject,
  generateFieldsString,
} from '../utils';
import FormModal from '../components/FormModal';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import Image from 'next/image';
import Header from '../components/Header';
import ScriptModal from '../components/ScriptModal';
import Link from 'next/link';

interface DashboardProps {
  userForms: UserFormTypeWithId[];
  user: UserType;
}

const initialFormInputs = {
  name: '',
  displayName: '',
  id: '',
};

const initialFormCheckboxes = {
  name: false,
  email: false,
  website: false,
  twitter: false,
  message: false,
};

function Dashboard({ userForms, user }: DashboardProps) {
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [formCheckboxes, setFormCheckboxes] = useState(initialFormCheckboxes);
  const [forms, setForms] = useState<UserFormTypeWithId[]>(userForms);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scriptModal, setScriptModal] = useState(false);
  const [formDetails, setFormDetails] = useState<UserFormTypeWithId>();

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxes = (e: ChangeEvent<HTMLInputElement>) => {
    setFormCheckboxes((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const start = () => NProgress.start();
  const end = () => NProgress.done();

  const createAndUpateForm = async (id: string) => {
    const numberOfFieldsFilled = Object.entries(formCheckboxes).filter(
      ([k, v]) => v
    );
    if (numberOfFieldsFilled.length < 1) {
      toast.error('Please check at least one field');
      return;
    }
    if (formInputs.name === '') {
      toast.error('Please add the form name');
      return;
    }
    const formData = {
      ...formInputs,
      fields: generateFieldsString(formCheckboxes),
      ownerId: user.id,
    };

    try {
      start();
      let result: { data: UserFormTypeWithId };
      if (isEditMode && id) {
        result = await updateUserForm(id, formData);
      } else {
        result = await createUserForm(formData);
      }
      if (result.data) {
        if (isEditMode) {
          const filteredForms = forms.filter((f) => f.id !== id);
          setForms([result.data, ...filteredForms]);
        } else setForms((prev) => [result.data, ...prev]);
        setFormInputs(initialFormInputs);
        setFormCheckboxes(initialFormCheckboxes);
        setIsModalOpen(() => false);
        setIsEditMode(false);
        end();
      }
    } catch (err) {
      end();
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
      // console.error('err', err);
    }
  };

  const handleSignout = async () => {
    try {
      start();
      const res = await signout();
      end();
      if (res.data) Router.push('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
      // console.log('err', err);
    }
  };

  const handleScript = async (
    e: MouseEvent<HTMLElement>,
    formDetails: UserFormTypeWithId
  ) => {
    e.stopPropagation();
    setFormDetails(formDetails);
    setScriptModal(true);
  };

  const handleEdit = (
    e: MouseEvent<HTMLElement>,
    formDetails: UserFormTypeWithId
  ) => {
    e.stopPropagation();
    e.target;
    const { name, id, displayName, fields } = formDetails;

    setFormInputs({
      name,
      displayName,
      id,
    });
    setFormCheckboxes({
      ...initialFormCheckboxes,
      ...generateFieldsObject(fields),
    });

    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (e: MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    try {
      const result = await deleteUserForm(id);
      if (result.data) {
        const updatedForms = forms.filter((f) => f.id !== id);
        setForms(updatedForms);
        toast.success('Deleted successfully');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
    // console.log('Click on Delete');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormInputs(initialFormInputs);
    setFormCheckboxes(initialFormCheckboxes);
  };

  const closeScriptModal = () => {
    setScriptModal(false);
    setFormDetails(undefined);
  };

  return (
    <>
      <Header title="Formify - Dashboard" />
      <main className="bg-purple-100 w-full h-screen overflow-hidden">
        <div className="p-4 pt-8 md:p-10 max-w-[1200px] mx-auto">
          <div className="bg-blue-200 p-4 rounded-xl flex justify-between items-center mb-8">
            <Link href="/">
              <a className="text-2xl md:text-4xl font-medium select-none">
                <Image
                  src="/images/logo.svg"
                  width={119}
                  height={41}
                  alt="Formify logo"
                />
              </a>
            </Link>
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="font-medium">Hi, {user?.name}</div>
              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-500/90 text-white px-3 py-1 rounded-lg mr-4 hidden md:inline-block"
                >
                  Create form
                </button>
                <button
                  onClick={handleSignout}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg hidden md:inline-block"
                >
                  Signout
                </button>
                {/* Mobile views */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-500/90 text-white p-1 rounded-lg mr-4 md:hidden inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleSignout}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-lg md:hidden inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2 rounded-xl overflow-auto no-scrollbar">
            <FormMenubar />
          </div>

          <div className="scrollbar bg-gray-50 h-[65vh] md:h-[420px] mb-8 rounded-xl overflow-auto">
            {forms?.map((f) => (
              <UserFormItem
                key={f.id}
                formDetails={f}
                onScriptClick={handleScript}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
              />
            ))}
          </div>

          {isModalOpen && (
            <FormModal
              inputsState={formInputs}
              checkboxesState={formCheckboxes}
              onInputChange={handleInputs}
              onCheckboxChange={handleCheckboxes}
              onSubmit={createAndUpateForm}
              closeModal={closeModal}
              editMode={isEditMode}
            />
          )}
          {scriptModal && formDetails && (
            <ScriptModal onClose={closeScriptModal} formDetails={formDetails} />
          )}
        </div>
      </main>
    </>
  );
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
  const cookieString: string | undefined = ctx.req.headers.cookie;

  let cookieData;
  if (cookieString) cookieData = cookie.parse(cookieString);

  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER
      : 'http://localhost:3000';

  const userURL = `${baseURL}/api/users/getuser`;
  const formsURL = `${baseURL}/api/forms/userforms`;

  let userData;

  if (cookieData?.token) {
    try {
      const userRes = await fetch(userURL, {
        method: 'GET',
        headers: {
          Authorization: `${cookieData.token}`,
        },
      });

      const result = await userRes.json();
      userData = result;

      if (!result.id) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }

  try {
    const userForms = await fetch(formsURL, {
      method: 'GET',
      headers: {
        Authorization: `${cookieData?.token}`,
      },
    });

    const result = await userForms.json();

    return {
      props: { userForms: result, user: userData },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
