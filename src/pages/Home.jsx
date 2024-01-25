import { Link } from 'react-router-dom'
import LogoOpa from '../assets/Logo-opa.png'

const Home = () => {
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className="text-4xl font-bold my-10">Consulta Cualquier Proyecto de <span className='text-orange-500'>Opa S.A.S</span> en Este Lugar </h1>
        <img src={LogoOpa} alt="" className='my-10'/>
        <Link to="/projects" className='bg-blue-500 hover:bg-blue-700 text-white my-10 font-bold py-2 px-4 rounded w-1/5 text-center'>Proyectos</Link>
      </div>
    </div>
  )
}

export default Home
