import { createContext, useState, useEffect, useMemo } from "react";
import data from '../../public/data/projects.js'

const ProjectsContext = createContext()

const ProjectsProvider = ({children}) => {

  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({})


  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [alias, setAlias] = useState("")
  const [propietario, setPropietario] = useState("")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")
  const [tags, setTags] = useState([])
  const [actions, setActions] = useState([])
  const [files, setFiles] = useState([])
  const [tasks, setTasks] = useState([])




  const getProjects = async () => {
    try {
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects()
  }, [])

  useEffect(() => {
    if (Object.keys(project).length === 0) return

    setProjects([...projects, project])

  }, [project])

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        setProject,
        project,
        setProjects,
        name,
        setName,
        description,
        setDescription,
        alias,
        setAlias,
        propietario,
        setPropietario,
        date,
        setDate,
        duration,
        setDuration,
        tags,
        setTags,
        actions,
        setActions,
        files,
        setFiles,
        tasks,
        setTasks,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export { ProjectsProvider }

export default ProjectsContext
