export const updateToken = () => {
  const user = localStorage.getItem("user")
  if (user) {
    const parseUser = JSON.parse(user)
    console.log(parseUser)
    return parseUser.token
  }
}
