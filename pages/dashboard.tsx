import React, { useState } from 'react';

function Dashboard() {
  const [input, setInput] = useState('');

  const createForm = async () => {
    const res = await fetch('/api/forms/manage', {
      method: 'POST',
      body: JSON.stringify({
        name: input,
        fields: 'name,email,message',
        ownerId: '2f898856-a05b-4b83-9629-c9235cad76da',
      }),
    });

    const result = await res.json();
    console.log('Form create', result);
  };
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Dashboard</div>
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
      <button className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg">
        Delete form
      </button>
    </div>
  );
}

export default Dashboard;
