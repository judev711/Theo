import { Link } from 'react-router-dom'

const Erreur = () => {
  return (
    <div className=''>
      <nav className='w-full h-16 bg-violet-800 flex justify-between items-center text-white p-3'>
        <div>
          <p className="inline-flex items-center p-2 text-sm text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700 " >
            eBuycluck
          </p>
        </div>
        <div className='flex gap-5'>
          <Link to='/Login'>
          <p className='inline-flex items-center p-2 text-sm text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700'>
            Se Connecter
          </p>
          </Link>
          <Link to='/Register'>
          <p className='inline-flex items-center p-2 text-sm text-white  font-bold  dark:text-gray-400 dark:hover:bg-gray-700'>
            S'inscrire
          </p>
          </Link>
        </div>
      </nav>
      <div className='flex flex-col justify-center items-center h-[25rem]   text-center'>
        <p className='font-extrabold text-[5rem] text-violet-800'>Error</p>
        <p className='font-extrabold text-[5rem] text-violet-800'>404 Not Found !</p>
      </div>
    </div>
  )
}

export default Erreur
