interface TotalExercises {
  sum: number
}


const Total = (props: TotalExercises) => {
  return (
    <div>{props.sum}</div>
  )
}

export default Total
