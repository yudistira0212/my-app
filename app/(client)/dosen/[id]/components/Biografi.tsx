import React from "react";
interface Props {
  biografi: string;
}
const Biografi: React.FC<Props> = ({ biografi }) => {
  const biografiSplit = biografi.split("\n");

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Boigafi</h3>
      {biografiSplit.map((value, index) => (
        <div key={index}>
          <p> {value} </p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Biografi;
