"use client";

import React, { useEffect, useState } from "react";
import DosenInput from "./dosenInput";
import TableDosen from "./tableDosen";
import axios from "axios";
import { Dosen } from "@prisma/client";

const PageDosen = () => {
  const [dosen, setDosenList] = useState<Dosen[]>([]);

  const getDosen = () => {
    fetchDosen();
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await axios.get("/api/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen data:", error);
    }
  };
  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <DosenInput onSuccess={getDosen} />
        <div>
          <TableDosen dosenList={dosen} fetchDosen={fetchDosen} />
        </div>
      </div>
    </div>
  );
};

export default PageDosen;
