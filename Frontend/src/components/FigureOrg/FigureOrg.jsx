export const FigureOrg = (organization) => {
  console.log("organization", organization);
  return (
    <figure className="dataProfile">
      <img src={organization?.organization.image} alt="organization image" />
      <h4>Email: {organization?.organization.email}</h4>
    </figure>
  );
};
