import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useState } from 'react';
import Person, { PersonProps } from '~/components/Person';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { people, hasNextPage, hasPrevPage } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? 1)
  const [query, setQuery] = useState('')

  const onNavClick = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString())
      return prev
    })
  }

  return (
    <div className='flex flex-col gap-12 items-center'>
      <h1 className='text-3xl font-bold underline'>
        Hello Tate!
      </h1>
      <div className="relative">
        <input
          type="text"
          className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
          placeholder="search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <img src='/search.svg' alt='search' className='w-4 h-4 absolute left-2.5 top-3.5'/>
      </div>
      <div className='flex gap-3'>
        <button disabled={!hasPrevPage} onClick={() => onNavClick(currentPage - 1)}>Prev</button>
        <div>{currentPage}</div>
        <button disabled={!hasNextPage} onClick={() => onNavClick(currentPage + 1)}>Next</button>
      </div>
      <div className='grid grid-cols-4 gap-6'>
        {people.map((person: PersonProps, idx: number) => <Person key={idx} {...person} />)}
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const requestURL = new URL(request.url)
  const url = 'https://swapi.dev/api/people?' + new URLSearchParams({
    search: requestURL.searchParams.get('search') || '',
    page: requestURL.searchParams.get('page') || '1'
  })

  const res = await fetch(url);
  const data = await res.json()

  const people = []
  for(const person of data.results) {
    const homeRes = await fetch(person.homeworld)
    const homeData = await homeRes.json()
    people.push({
      name: person.name as string,
      home: homeData.name as string
    })
  }

  return {
    people,
    hasNextPage: !!data?.next,
    hasPrevPage: !!data?.previous
  }
}