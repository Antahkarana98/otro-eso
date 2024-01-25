import { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"

import useProjects from "../hooks/useProjects"
import Table from "../components/Table"
import TasksModal from "../components/TasksModal"
import ActionsModal from "../components/ActionsModal"
import BoxFiles from "../components/BoxFiles"
import TaskCard from "../components/TaskCard"

const Project = () => {

  const { setProjects, projects } = useProjects()

  const [dataProject, setDataProject] = useState({});
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksPending, setTasksPending] = useState(0);
  const [tasksDelayed, setTasksDelayed] = useState(0);

  const { id } = useParams()


  useEffect(() => {
    const foundProject = projects.find((p) => p.id === id);
    if (foundProject) {
      setDataProject({ ...foundProject });
    }
  }, [])

  useEffect(() => {

    if (Object.keys(dataProject).length === 0) return

    const  newAction = {
      id: (Date.now()).toString(),
      action: "Se ha creado el proyecto",
      date: Date.now().toString()
    }
    console.log(newAction);

    /* setDataProject((prevProject) => ({
      ...prevProject,
      actions: [...(prevProject.actions || []), newAction],
    })) */

    let completedCount = 0;
    let pendingCount = 0;
    let delayedCount = 0;

    dataProject.tasks.forEach((task) => {
      if (task.status === "1") {
        completedCount++;
      } else if (task.status === "2") {
        pendingCount++;
      } else if (task.status === "3") {
        delayedCount++;
      }
    });

    setTasksCompleted(completedCount);
    setTasksPending(pendingCount);
    setTasksDelayed(delayedCount);

    const updatedProjects = projects.map((p) =>
      p.id === id ? dataProject : p
    );

    setProjects(updatedProjects);
  }, [dataProject]);


  return (
    <section >
      <div className="grid grid-cols-2 m-auto h-screen container">
        <div className="m-auto w-1/2">
          <img
            className="w-full"
            src={ dataProject.image }
            alt="Project image"
          />
        </div>

        <div className=" my-auto">
          <h1 className="text-xl my-5"><span className="font-bold text-2xl">Nombre Clave: </span> {dataProject.name}</h1>
          <p className="font-bold text-2xl">Descripción:</p>
          <p className="text-xl">{dataProject.description}</p>
          <p className="text-xl"><span className="font-bold text-2xl">Alias:</span> {dataProject.alias}</p>
          <p className="text-xl"><span className="font-bold text-2xl">Propietario:</span> {dataProject.propietario}</p>
          <p className="text-xl"><span className="font-bold text-2xl">Fecha de inicio:</span> {dataProject.date}</p>
          <p className="text-xl"><span className="font-bold text-2xl">Fecha de finalización:</span> {dataProject.finalDate}</p>
          <p className="text-xl"><span className="font-bold text-2xl">Duración:</span> {dataProject.duration} Semanas</p>
          <div>
            {
              dataProject.tags &&
              <div className="pt-4 pb-5 grid grid-cols-5 gap-2">
                {(dataProject.tags).map((tag, index) => (
                  <div key={index} className='bg-gray-800 text-white text-sm font-medium px-2.5 py-1 rounded-full flex justify-center w-full'>
                    <div className="w-full text-center">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>

      <div className="container mx-auto">

        <div className="flex justify-center items-center mb-5">
          <h2 className="text-2xl font-bold text-center">Tareas</h2>

          {/* verificar si hay tareas */}
          <TasksModal
            dataProject={dataProject}
            setDataProject={setDataProject}
          />
        </div>

        <div className="flex justify-center items-center gap-5 text-center">
          <div className=" bg-emerald-200 text-emerald-600 w-32 p-5 rounded-lg">
            <h3 className="font-bold">Completadas</h3>
            <p className="font-bold text-5xl">{tasksCompleted}</p>

          </div>

          <div className=" bg-yellow-200 text-yellow-600 h-full w-32  p-5 rounded-lg">
            <h3 className="font-bold">Pendientes</h3>
            <p className="font-bold text-5xl">{tasksPending}</p>
          </div>

          <div className=" bg-red-200 text-red-600 h-full p-5 w-32  rounded-lg">
            <h3 className="font-bold">Atrasadas</h3>
            <p className="font-bold text-5xl">{tasksDelayed}</p>
          </div>

        </div>

        <div className={`bg-gray-100 w-3/4 flex justify-center items-center mx-auto my-5 py-5 ${dataProject.tasks ? '' : 'h-40'}`}>
          {
            dataProject.tasks?.length !== 0 ? (
              <div className="grid grid-cols-3 gap-5 w-3/4">

                {
                  dataProject.tasks?.map((task, index) => (
                    <div key={index}>
                      <TaskCard
                        task={task}
                        dataProject={dataProject}
                        setDataProject={setDataProject}
                      />
                    </div>
                  ))
                }

              </div>
            ) : (
              <p className="text-xl">No hay tareas</p>
            )
          }
        </div>

        {/* <Table
          dataProject={dataProject}
        /> */}
      </div>

      <div className="my-5">

        <div className="flex justify-center items-center">
          <h2 className="text-2xl text-center font-bold">Acciones</h2>
          <ActionsModal
            dataProject={dataProject}
            setDataProject={setDataProject}
          />
        </div>


        <div className={`bg-gray-100 w-3/4 flex justify-center items-center mx-auto my-5 py-5 ${dataProject.actions ? '' : 'h-40'}`}>
           {
            dataProject.actions ? (
              <div className="grid grid-cols-2 gap-5">
                {
                  dataProject.actions.map(action => (
                    <div key={action.id} className="bg-orange-500 text-white p-2 rounded-lg">
                      <div className="text-xl">
                        {action.action}
                      </div>

                      <div>
                        {action.date}
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className="text-xl">No hay acciones</p>
            )
           }
        </div>
        {/* verificar si hay acciones */}
      </div>

      <div className="container mx-auto">
        <h2 className="text-2xl text-center font-bold">Archivos relacionados con el proyecto</h2>
        <div className="my-5 flex justify-center">

          <BoxFiles
            dataProject={dataProject}
            setDataProject={setDataProject}
          />
        </div>
        {/* verificar si hay archivos */}
      </div>
    </section>
  )
}

export default Project
