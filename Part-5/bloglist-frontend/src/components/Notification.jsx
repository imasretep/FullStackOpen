const Notification = ({ text, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 18,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10
  }
  if(text !== null){
    return(
      <div style={style}>
        {text}
      </div>
    )
  }
  return null
}

export default Notification