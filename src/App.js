import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tasks from './components/tasks'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const ButtonClick = props => {
  const {each, clickOn, isActive} = props
  const {displayText, optionId} = each
  const changeActive = () => {
    clickOn(optionId)
  }
  return (
    <button
      onClick={changeActive}
      type="button"
      className={isActive ? 'btn-ul active' : 'btn-ul'}
    >
      {displayText}
    </button>
  )
}

// Replace your code here
class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    allTagList: [],
    activeId: 'INITIAL',
  }

  changeTask = event => {
    this.setState({task: event.target.value})
  }

  changeTag = event => {
    this.setState({tag: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {tag, task} = this.state
    // console.log(task, tag)

    const tagFilter = tagsList.filter(each => each.optionId === tag)
    const newObject = {
      tag,
      task,
      dis: tagFilter[0].displayText,
    }
    console.log(newObject)
    this.setState(pre => ({
      allTagList: [...pre.allTagList, newObject],
      tag: tagsList[0].optionId,
      task: '',
    }))
  }

  changeActiveId = id => {
    const {activeId} = this.state
    if (activeId === id) {
      this.setState({activeId: 'INITIAL'})
    } else {
      this.setState({activeId: id})
    }
  }

  render() {
    const {task, tag, allTagList, activeId} = this.state
    const FilterArray = allTagList.filter(each => each.tag === activeId)
    const SourceArray = activeId === 'INITIAL' ? allTagList : FilterArray
    return (
      <div className="tasks-container">
        <div className="task-input-container">
          <h1 className="task-creation-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.addTask}>
            <label className="task-label" htmlFor="task">
              Task
            </label>
            <input
              className="inp"
              id="task"
              onChange={this.changeTask}
              value={task}
              type="text"
              placeholder="Enter the task here"
            />
            <label className="task-label" htmlFor="tag">
              Tags
            </label>
            <select
              className="inp"
              id="tag"
              onChange={this.changeTag}
              value={tag}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add" onClick={this.addTask}>
              Add Task
            </button>
          </form>
        </div>
        <div className="task-display-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tag-list-btn-con">
            {tagsList.map(each => (
              <li key={each.optionId}>
                <ButtonClick
                  each={each}
                  clickOn={this.changeActiveId}
                  isActive={each.optionId === activeId}
                />
              </li>
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <div className="tasks-display-content">
            {allTagList.length === 0 ? (
              <p className="no-tasks">No Tasks Added Yet</p>
            ) : (
              <ul className="task-ul-list">
                {SourceArray.map(each => (
                  <Tasks each={each} key={uuidv4()} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
