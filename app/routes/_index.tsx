import type { MetaFunction } from "@remix-run/node";
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [page, setPage] = useState(1)

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>
        Hello World!
      </h1>
      
    </div>
  );
}
