import { ClipLoader } from "react-spinners";

const Loading = (): JSX.Element => {
  return (
    <div className="loader">
      <ClipLoader color="#eb1234" loading={true} size={150} />
    </div>
  );
};

export default Loading;
