const Header = ({ course }) => {
  return (
    <>
      <h2>{course}</h2>
    </>
  ) 
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => {
        return <Part key={part.id} part={part.name} exercises={part.exercises} />
      })}
    </>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>{part} {exercises}</p>
    </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((total, accum) => {
    return total += accum.exercises;
  }, 0);
  return (
    <>
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
       <Header course={course.name} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
     </div>
  )
}

export default Course