import React from "react";

interface Props {
  dataPendidikan: string;
}
const Pendidikan: React.FC<Props> = ({ dataPendidikan }) => {
  const pendikans = dataPendidikan.split("\n");
  return (
    <>
      <div className="text-left">
        <h4 className="text-lg font-bold mb-2">Pendidikan</h4>
        <ul className="list-disc list-inside mb-4">
          {pendikans.map((value) => (
            <li>{value}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Pendidikan;
