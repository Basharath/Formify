import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react';
import UserAuth from '../../types/AuthUser';
import Link from 'next/link';

interface FormProps {
  user: UserAuth;
}

interface SubmissionType {
  id: string;
  name: string | null;
  email: string | null;
  twitter: string | null;
  website: string | null;
  message: string | null;
  forminfoId: string;
}

function Form({ user }: FormProps) {
  const router = useRouter();
  const formId = router.query.id as string;
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getForm(formId);
  }, [formId]);

  if (process.browser) {
    if (!user) router.push('/login');
  }

  const getForm = async (id: string) => {
    const res = await fetch(`/api/forms/manage?id=${id}`);
    const result = await res.json();
    setSubmissions(result.data);
    // console.log('Form manage', result);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl">Submissions</h1>
      <div className="my-4">
        {submissions.length > 0 &&
          submissions.map((s: SubmissionType) => (
            <div key={s.id} className="flex space-x-4">
              <div>{s.id}</div>
              <div>{s.name}</div>
              <div>{s.email}</div>
            </div>
          ))}
      </div>
      <Link href="/dashboard">Go back</Link>
    </div>
  );
}

export default Form;
