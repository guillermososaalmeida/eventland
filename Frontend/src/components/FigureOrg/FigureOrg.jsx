export const FigureOrg = ({ organization }) => {
  console.log("organization", organization);
  return (
    <figure className="dataProfile">
      <img src={organization?.image} alt="organization image" />
      <h4>Email: {organization?.email}</h4>
    </figure>
  );
};
