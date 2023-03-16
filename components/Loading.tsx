import { CircularProgress } from "@chakra-ui/react";

const Loading = (): JSX.Element => {
  return (
    <div className="loader h-full">
      <CircularProgress
        isIndeterminate
        size={140}
        color="#eb1234"
        trackColor="white"
      />
    </div>
  );
};

export default Loading;
