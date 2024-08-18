import Button from "@/app/components/common/button/Button";
import Input from "@/app/components/common/input/Input";
import Modals from "@/app/components/ui/modals/Modals";
import axios from "axios";
import { ApiError } from "next/dist/server/api-utils";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  id: number;
}
const Absen: React.FC<Props> = ({ id }) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [nim, setNim] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAbsen = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await axios.post("/api/absen", {
        mahasiswaNim: nim,
        classId: id,
      });

      toast.success("Absen berhasil");
      setIsLoading(false);
    } catch (error: any) {
      // toast.error("Absen gagal");
      setIsLoading(false);

      if (error.response) {
        console.log(error.response.data.message);
        // Server merespon dengan status selain 2xx
        toast.error(error.response.data.message || "Terjadi kesalahan.");
      } else if (error.request) {
        // Permintaan telah dikirim tetapi tidak ada respons dari server
        toast.error("Tidak ada respons dari server.");
      } else {
        // Kesalahan lain yang terjadi saat mengatur permintaan
        toast.error("Terjadi kesalahan dalam mengirim data.");
      }
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          Absen
        </button>
      </div>
      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={"Absen"}
      >
        <form onSubmit={handleAbsen}>
          <Input
            isEdit={!modalIsOpen}
            value={nim}
            onChange={(value) => setNim(value)}
            type="text"
            id={"nim"}
            label={"NIM"}
            placeholder="Masukkan NIM"
          />
          <div>
            <Button
              text={"Absen"}
              isEdit={!modalIsOpen}
              loading={isLoading}
              textLoading="Loading..."
              type="submit"
            />
          </div>
        </form>
      </Modals>
    </div>
  );
};

export default Absen;
