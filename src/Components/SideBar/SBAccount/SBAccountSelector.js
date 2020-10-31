

export default function SBAccountSelector(props) {
  const activeUserID = Object.keys(props.activeUser)[0]

  // List all Users in Select input as options
  var accountOptions = props.allUserList.map(userData => {
    const userID = Object.keys(userData)[0]
    return <option key={userID} value={userID}>{userData[userID]}</option>
  })


  return (
    <select
      id="accountSelector"
      onChange={props.switchUser}
      value={activeUserID}>
      <option disabled key="empty" value="empty">Select a user</option>
      {accountOptions}
    </select>
  )
}