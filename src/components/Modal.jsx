import { useState } from 'react'
import useProjects from '../hooks/useProjects'
import TagForm from './TagForm'
import FinalDate from "../helpers/fechaFin"

const Modal = () => {

  const { setProject,
    name,
    setName,
    description,
    setDescription,
    alias,
    setAlias,
    tags,
    setTags,
    propietario,
    setPropietario,
    date,
    setDate,
    duration,
    setDuration,
    tasks,
    setTasks,
    actions,
    setActions,
    files,
    setFiles,
  } = useProjects()

  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target

    switch (name) {
      case 'name':
        setName(value)
        break;
      case 'description':
        setDescription(value)
        break;
      case 'alias':
        setAlias(value)
        break;
      case 'tags':
        setTags(value)
      break;
      case 'propietario':
        setPropietario(value)
        break;
      case 'date':
        setDate(value)
        break;
      case 'duration':
        setDuration(value)
        break;
      default:
        break;
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(false)

    FinalDate(date, duration)

    const newProject = {
      id: (Date.now()).toString(),
      name,
      description,
      image: "https://picsum.photos/200/200",
      alias,
      tags,
      propietario,
      date,
      duration,
      finalDate: FinalDate(date, duration),
      tasks,
      actions,
      files,
    }

    setProject(newProject)

    setName('')
    setDescription('')
    setAlias('')
    setTags([])
    setPropietario('')
    setDate('')
    setDuration('')

  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type='button'
        className="bg-orange-500 text-white ms-5 py-1 px-3 rounded-lg font-bold shadow-lg hover:bg-orange-600"
      >
        Nuevo Proyecto
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/4 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Agregar Nuevo Proyecto
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-5xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black text-3xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form action="" onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Nombre Clave:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Nombre del proyecto"
                          onChange={handleChange}
                          value={name}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alias">
                          Alias:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="alias"
                          type="text"
                          name="alias"
                          placeholder="Alias"
                          onChange={handleChange}
                          value={alias}
                        />
                      </div>


                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                          Tags:
                        </label>
                        <TagForm
                          setTags={setTags}
                          tags={tags}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Descripción:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                          id="description"
                          type="text"
                          name="description"
                          placeholder="Descripción del proyecto"
                          onChange={handleChange}
                          value={description}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="propietario">
                            Propietario:
                          </label>
                          <select
                            name="propietario"
                            id="propietario"
                            onChange={handleChange}
                            value={propietario}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                            <option value="0">Seleccione un propietario</option>
                            <option value="1">Propietario 1</option>
                            <option value="2">Propietario 2</option>
                            <option value="3">Propietario 3</option>
                          </select>
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                          Fecha de inicio:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="date"
                          type="date"
                          name="date"
                          placeholder="Fecha de inicio"
                          onChange={handleChange}
                          value={date}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                          Duración en semanas:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="duration"
                          type="number"
                          name="duration"
                          placeholder="Duración en semanas"
                          onChange={handleChange}
                          value={duration}
                        />
                      </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Agregar Proyecto
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default Modal
