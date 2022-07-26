import Router from 'next/router';

import React, { useState, MouseEvent } from 'react';
import { FormSubmissionType, FieldsObjType } from '../../types';
import { deleteFormSubmission, getFormSubmissions } from '../../http';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import FormSubmissionMenubar from '../../components/FormSubmissionMenubar';
import FormSubmissionItem from '../../components/FormSubmissionItem';
import { parseFieldNames, fieldsToArray } from '../../utils';
import NProgress from 'nprogress';
import Header from '../../components/Header';

interface FormProps {
  submittedForms: FormSubmissionType[];
}

function FormSubmission({ submittedForms }: FormProps) {
  const [submissions, setSubmissions] = useState(submittedForms);
  const formName = submissions[0].forminfo?.name || '';
  const formFields = submissions[0].forminfo?.fields as string;
  const fieldsArray = parseFieldNames(formFields);

  const start = () => NProgress.start();
  const end = () => NProgress.done();

  const handleGoBack = () => Router.back();

  const handleDelete = async (e: MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    start();
    try {
      const result = await deleteFormSubmission(id);
      if (result.data) {
        if (submissions.length === 1) {
          const updatedForms = submissions.map((f) => ({
            forminfo: f?.forminfo,
            id: '',
          })) as FormSubmissionType[];
          setSubmissions(updatedForms);
        } else {
          const updatedForms = submissions.filter((f) => f.id !== id);
          setSubmissions(updatedForms);
        }
        end();
        toast.success('Deleted successfully');
      }
    } catch (err) {
      end();
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };

  return (
    <>
      <Header title="Formify - Submissions" />

      <main className="bg-purple-100 w-full h-screen overflow-hidden">
        <div className="p-4 pt-8 md:p-10 max-w-[1200px] mx-auto">
          <div className="bg-blue-200 p-2.5 md:p-4 rounded-xl grid grid-cols-3 items-center  mb-8">
            <button
              onClick={handleGoBack}
              className="bg-gray-700 w-fit hover:bg-gray-600 text-white px-1.5 py-1 md:p-2 md:py-1.5 rounded-md"
            >
              Go back
            </button>
            <div className="text-xl md:text-3xl font-medium text-center line-clamp-2">
              {formName}
            </div>
            <div className="text-end">
              Total submissions:{' '}
              <span className="font-medium">
                {submissions[0].id ? submissions.length : 0}
              </span>
            </div>
          </div>

          <div className="mb-2 rounded-xl overflow-auto no-scrollbar">
            <FormSubmissionMenubar fieldsArray={fieldsArray} />
          </div>

          <div className="bg-gray-50 h-[65vh] w-full md:h-[420px] mb-8 rounded-xl overflow-auto scrollbar">
            {submissions.length > 0 && submissions[0].id ? (
              submissions.map((s: FormSubmissionType) => (
                <FormSubmissionItem
                  key={s.id}
                  formDetails={s}
                  onDeleteClick={handleDelete}
                  // @ts-ignore
                  fields={
                    fieldsToArray(formFields) as unknown as keyof FieldsObjType
                  }
                />
              ))
            ) : (
              <div className="grid place-content-center h-[80%] text-lg">
                No submissions yet
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default FormSubmission;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
  const cookieString: string | undefined = ctx.req.headers.cookie;
  const id = ctx.params?.id;

  let cookieData;
  if (cookieString) cookieData = cookie.parse(cookieString);

  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER
      : 'http://localhost:3000';

  const formsURL = `${baseURL}/api/forms/submissions?id=${id}`;

  if (cookieData?.token) {
    try {
      const submittedForms = await fetch(formsURL, {
        method: 'GET',
        headers: {
          Authorization: `${cookieData?.token}`,
        },
      });

      const result = await submittedForms.json();

      return {
        props: { submittedForms: result },
      };
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
