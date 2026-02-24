import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
  const params = useParams();
  return <div>TEST: {JSON.stringify(params)}</div>;
};

export default UserDetailsPage;
