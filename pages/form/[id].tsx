import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import React, { useState, useEffect } from 'react';
import { UserType, FormSubmissionType } from '../../types';
import Link from 'next/link';
import { getFormSubmissions } from '../../http';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface FormProps {
  user: UserType;
}

function Form({ user }: FormProps) {
  const { query, isReady } = useRouter();
  const formId = query.id as string;
  const [submissions, setSubmissions] = useState([]);

  // useEffect(() => {
  //   if (!isReady) return;
  //   if (!user) Router.push('/login');
  // }, [isReady, user]);

  useEffect(() => {
    if (formId) getForms(formId);
  }, [formId]);

  const getForms = async (id: string) => {
    try {
      const result = await getFormSubmissions(id);
      setSubmissions(result.data);
    } catch (err) {
      console.log('Form', err);
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
    // console.log('Form manage', result);
  };

  return (
    <>
      <Head>
        <title>Formify - Dashboard</title>
        <meta name="description" content="Formify dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl">Submissions</h1>
        <div className="my-4">
          {submissions.length > 0 &&
            submissions.map((s: FormSubmissionType) => (
              <div key={s.id} className="flex space-x-4">
                <div>{s.id}</div>
                <div>{s.name}</div>
                <div>{s.email}</div>
                <div>{s.twitter}</div>
                <div>{s.message}</div>
              </div>
            ))}
        </div>
        <Link href="/dashboard">Go back</Link>
      </div>
    </>
  );
}

export default Form;

// import { useRouter } from 'next/router';
// import React, { useState, useContext, useEffect } from 'react';
// import UserAuth from '../../types/AuthUser';
// import Link from 'next/link';

// interface FormProps {
//   user: UserAuth;
// }

// interface FormSubmissionType {
//   id: string;
//   name: string | null;
//   email: string | null;
//   twitter: string | null;
//   website: string | null;
//   message: string | null;
//   forminfoId: string;
// }

// function Form({ user }: FormProps) {
//   const router = useRouter();
//   const formId = (router.query.id as string) || '';
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     if (formId) getForm(formId);
//   }, [formId]);

//   if (process.browser) {
//     console.log('Inside single form', user, formId);
//     if (!user) router.push('/login');
//     // if (!formId) router.push('/dashboard');
//   }

//   const getForm = async (id: string) => {
//     try {
//       const res = await fetch(`/api/forms/manage?id=${id}`);
//       const result = await res.json();
//       setSubmissions(result.data);
//     } catch (err) {
//       console.log('err', err);
//     }
//     // console.log('Form manage', result);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <h1 className="text-5xl">Submissions</h1>
//       <div className="my-4">
//         {submissions.length > 0 &&
//           submissions.map((s: SubmissionType) => (
//             <div key={s.id} className="flex space-x-4">
//               <div>{s.id}</div>
//               <div>{s.name}</div>
//               <div>{s.email}</div>
//             </div>
//           ))}
//       </div>
//       <Link href="/dashboard">Go back</Link>
//     </div>
//   );
// }

// export default Form;
