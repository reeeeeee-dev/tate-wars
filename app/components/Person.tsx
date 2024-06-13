type PersonProps = {
  name: string
  home: string
}

const Person = ({ name, home }: PersonProps) => {
  return(
    <div className='flex flex-col text-center justify-center'>
      <img
        alt={name}
        src={`https://api.dicebear.com/8.x/rings/svg?seed=${name}`}
        className='self-center w-24 h-24 rounded-full'
      />
      <div className='text-xl font-bold'>{name}</div>
      <div>{home}</div>
    </div>
  )
}

export default Person
