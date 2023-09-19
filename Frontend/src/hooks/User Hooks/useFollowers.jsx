import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrgById } from "../../services/org.service";

const useFollowers = () => {
  const [followers, setFollowers] = useState([{}]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrgById(id);
        if (response.status === 200) setFollowers(response.data.data.usersFav);
      } catch (error) {
        console.error("Error ");
      }
    };
  });

  return <div>useFollowers</div>;
};

export default useFollowers;
