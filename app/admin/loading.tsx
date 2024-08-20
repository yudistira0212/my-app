import Loading from "../components/common/loading/Loading";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loading text="Loading..." />
    </div>
  );
};

export default loading;
