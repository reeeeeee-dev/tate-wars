type PersonProps = {
  img: string
  name: string
  home: string
}

const Person = ({ img, name, home }: PersonProps) => {
  return(
    <div className='flex flex-col text-center justify-center'>
      <img alt={name} src={img} className='self-center w-24 h-24 rounded-full' />
      <div className='text-xl font-bold'>{name}</div>
      <div>{home}</div>
    </div>
  )
}

export default Person
