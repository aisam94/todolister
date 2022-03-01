import { ClipLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="loader">
      <ClipLoader color="#eb1234" loading={true} size={150} />
    </div>
  );
};

export default Loading;
