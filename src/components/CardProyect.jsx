import { Link } from "react-router-dom"
import NoImage from "./NoImage"


const CardProyect = ({project}) => {

  const { id, name, description, image, tags, alias, propietario, date, duration, finalDate } = project

  return (
    <>
      <article className="max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-xl card-tranform">
        <Link to={`/projects/${id}`}>
          <header>
            {
              image ? (
                <img
                  className="w-full"
                  src={ image }
                  alt="project image"
                />
              ) : (
                <NoImage />
              )
            }
          </header>

          <main>
            <div className="text-gray-700 text-base px-6 py-4">
              <div className="font-bold text-xl mb-2">{name}</div>
              <p className=" mb-2">
                <span className="font-bold">Descripción: </span>
                {description}
              </p>

              <p className="border-t-2 pt-2">
                <span className="font-bold">Alias: </span>
                {alias}
              </p>

              <p>
                <span className="font-bold">Propietario: </span>
                {propietario}
              </p>

              <p>
                <span className="font-bold">Fecha de inicio: </span>
                {date}
              </p>

              <p>
                <span className="font-bold">Duración: </span>
                {duration} Semanas
              </p>

              <p>
                <span className="font-bold">Fecha de finalización: </span>
                {finalDate}
              </p>
            </div>
          </main>

          <footer>
            <div className="px-6 pt-4 pb-5 grid grid-cols-2 ">
              {tags.map((tag, index) => (
                <div key={index} className="my-1 mx-1">
                  <span className='bg-gray-800 text-white text-sm font-medium px-2.5 py-1 rounded-full flex justify-center w-full'>
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </footer>
        </Link>
      </article>
    </>
  )
}

export default CardProyect
