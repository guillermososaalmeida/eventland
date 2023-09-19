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
        setFollowers(response.usersFav);
      } catch (error) {
        console.error("Error al obtener la organización", error);
      }
    };

    fetchData();
  }, [id]);

  return followers;
};

export default useFollowers;
