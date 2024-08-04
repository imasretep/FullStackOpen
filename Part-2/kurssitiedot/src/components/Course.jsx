
const Header = ({name}) => {
    return(
      <h2>{name}</h2> 
    ) 
  }
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map(p => 
          <Part key={p.id} part={p}/>
        )}
        <Total parts={parts}/>
      </div>  
    )
  }
  
  const Part = ({part}) => {
    return(
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((sum, parts) => sum + parts.exercises, 0)
    return(
      <div>
        <strong>Total of {sum} exercises </strong>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        
      </div>
    )
  }
  
  const Courses = ({courses}) => {
    return(
    <div>
        {courses.map(c => 
          <Course key={c.id} course={c}/>
        )}
    </div>
    )
  }

  export default Courses
  