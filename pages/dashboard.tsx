import Head from 'next/head';
import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import { UserFormType, UserType } from '../types';
import toast, { Toaster } from 'react-hot-toast';
import { createUserForm, getUserForms, signout } from '../http';
import { AxiosError } from 'axios';
import UserFormItem from '../components/UserFormItem';
import FormMenubar from '../components/FormMenubar';
import { generateFieldsString, parseFieldNames } from '../utils';
import FormModal from '../components/FormModal';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

interface FormType extends UserFormType {
  id: string;
}

interface DashboardProps {
  userForms: FormType[];
  user: UserType;
}

const initialFormInputs = {
  name: '',
  displayName: '',
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
  const [forms, setForms] = useState<FormType[]>(userForms);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setFormInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxes = (e: ChangeEvent<HTMLInputElement>) => {
    setFormCheckboxes((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const createForm = async () => {
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
      const result = await createUserForm(formData);
      if (result.data) {
        setForms((prev) => [result.data, ...prev]);
        setFormInputs(initialFormInputs);
        setFormCheckboxes(initialFormCheckboxes);
        setIsModalOpen(() => false);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
      // console.error('err', err);
    }
  };

  // const getForms = async () => {
  //   try {
  //     const res = await getUserForms();
  //     setForms(res.data);
  //   } catch (err) {
  //     // if (err instanceof AxiosError) {
  //     //   toast.error(err?.response?.data);
  //     // }
  //   }
  //   // console.log('Form manage', result);
  // };

  const handleSignout = async () => {
    try {
      const res = await signout();
      if (res.data) location.href = '/login';
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
      // console.log('err', err);
    }
  };

  const handleScript = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('Click on Script');
  };

  const handleEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('Click on Edit');
  };

  const handleDelete = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('Click on Delete');
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Head>
        <title>Formify - Dashboard</title>
        <meta name="description" content="Formify dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-purple-100 w-full h-screen overflow-hidden">
        <div className="p-4 pt-8 md:p-10 max-w-[1200px] mx-auto">
          <div className="bg-blue-200 p-4 rounded-xl flex justify-between items-center mb-8">
            <div className="text-4xl font-medium">Formify</div>
            <div className="flex items-center space-x-8">
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
                  // onClick={handleSignout}
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

          <div className="bg-gray-50 h-[65vh] md:h-[420px] mb-8 rounded-xl overflow-auto">
            {forms?.map((f) => (
              <UserFormItem
                key={f.id}
                name={f.name}
                formId={f.id}
                fields={parseFieldNames(f.fields)}
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
              onSubmit={createForm}
              closeModal={closeModal}
            />
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
