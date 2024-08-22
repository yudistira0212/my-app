import React from "react";

interface Props {
  publikasiIlmiah: string;
}
const PublikasiIlmiah: React.FC<Props> = ({ publikasiIlmiah }) => {
  const publikasiIlmiahSplit = publikasiIlmiah.split("\n");

  return (
    <div>
      <h3 className="text-lg  font-bold mb-2">Publikasi Ilmiah</h3>
      <ul>
        {publikasiIlmiahSplit &&
          publikasiIlmiahSplit.map((value, index) => (
            <li key={index}> {value} </li>
          ))}
      </ul>
    </div>
  );
};

export default PublikasiIlmiah;
