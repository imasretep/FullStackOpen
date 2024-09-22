import { PartProps } from "../types"

const Part = (props: PartProps) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (props.parts.kind) {
    case "basic":
      return (
        <div>
          <h3>{props.parts.name} {props.parts.exerciseCount}</h3>
          <i>{props.parts.description}</i>
        </div>
      )
    case "group":
      return (
        <div>
          <h3>{props.parts.name} {props.parts.exerciseCount}</h3>
          Group projects {props.parts.groupProjectCount}
        </div>
      )

    case "background":
      return (
        <div>
          <h3>{props.parts.name} {props.parts.exerciseCount}</h3>
          <i>{props.parts.description} </i> <br />
          {props.parts.backgroundMaterial}
        </div >
      )

    case "special":
      return (
        <div>
          <h3>{props.parts.name} {props.parts.exerciseCount}</h3>
          <i>{props.parts.description} </i> <br />
          Required skills: {props.parts.requirements.join(", ")}
        </div >
      )
    default:
      return assertNever(props.parts)
  }
}

export default Part
