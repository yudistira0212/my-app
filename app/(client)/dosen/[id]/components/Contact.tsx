import React from "react";

interface Props {
  contact: string;
}
const Contact: React.FC<Props> = ({ contact }) => {
  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Kontak</h4>
      <p>{contact}</p>
    </div>
  );
};

export default Contact;
