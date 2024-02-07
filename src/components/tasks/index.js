import './index.css'

const Tasks = props => {
  const {each} = props
  const {tag, task} = each

  return (
    <li className="task-list">
      <p className="task">{task}</p>
      {/* <div className="tag-name"> */}
      <p className="tag-name">{tag}</p>
      {/* </div> */}
    </li>
  )
}
export default Tasks
