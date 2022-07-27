import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react';
import AuthUser from '../types/AuthUser';

interface DashboardProps {
  user: AuthUser;
}

interface FormType {
  id: string;
  name: string;
  ownerId: string;
  fields: string;
}

function Dashboard({ user }: DashboardProps) {
  const [input, setInput] = useState('');
  const [forms, setForms] = useState<FormType[]>([]);
  const router = useRouter();

  useEffect(() => {
    getForms();
  }, []);

  // console.log('Dash user', user);

  if (process.browser) {
    if (!user) router.push('/login');
  }

  const createForm = async () => {
    try {
      const res = await fetch('/api/forms/manage', {
        method: 'POST',
        body: JSON.stringify({
          name: input,
          fields: 'name,email,message',
          ownerId: user.id,
        }),
      });

      const result = await res.json();
      const newForm = result.data as FormType;
      setForms((prev) => [...prev, newForm]);
      setInput('');
    } catch (err) {
      console.error('err', err);
    }
  };

  const getForms = async () => {
    const res = await fetch('/api/forms/manage');
    const result = await res.json();
    setForms(result.data);
    // console.log('Form manage', result);
  };

  const handleSignout = async () => {
    const res = await fetch('/api/users/signout');
    const result = await res.json();

    if (result.msg === 'OK') location.href = '/login';
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Dashboard</div>
      <div>Howdy, {user?.name}</div>
      <div className="flex flex-col items-center my-10 space-y-4">
        <label>
          Form name{' '}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border rounded p-2"
          />
        </label>
        <button
          onClick={createForm}
          className="px-4 py-2 bg-blue-400 hover:bg-blue-500 rounded-lg mr-4"
        >
          Create form
        </button>
      </div>
      <button
        onClick={getForms}
        className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg"
      >
        Get form data
      </button>
      <button onClick={handleSignout}>Signout</button>
      <div className="mt-4">
        {forms.length > 0 &&
          forms.map((f: FormType) => (
            <div key={f.id} className="bg-blue-200 my-2 p-1">
              <Link href={`/form/${f.id}`}>{f.name}</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
