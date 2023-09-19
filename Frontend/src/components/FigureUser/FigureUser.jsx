export const FigureUser = ({ user }) => {
  //! cambiar a prop
  return (
    <figure className="dataProfile">
      <img src={user.user.image} alt="user image" className="imageUser" />
      <h4 className="emailUser">Email: {user.user.email}</h4>
    </figure>
  );
};
