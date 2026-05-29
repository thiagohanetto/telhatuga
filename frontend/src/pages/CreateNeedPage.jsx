import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

import api from "../services/api";

export default function CreateNeedPage() {

  const navigate = useNavigate();

  const [tileType, setTileType] =
    useState("");

  const [quantityNeeded,
    setQuantityNeeded] =
    useState("");

  const [city, setCity] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [imageFile, setImageFile] =
    useState(null);  

  async function handleSubmit(e) {

    e.preventDefault();

    let imageUrl = "";

    if (imageFile) {

      const fileName =
        `${Date.now()}-${imageFile.name}`;

      const { error } =
        await supabase.storage
          .from("images")
          .upload(fileName, imageFile);

      if (error) {

        console.error(error);

        alert("Erro ao enviar imagem");

        return;
      }

      const {
        data: publicUrlData
      } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      imageUrl =
        publicUrlData.publicUrl;
      
      console.log(imageUrl);
    }

    try {

      await api.post("/needs", {

        tileType,

        quantityNeeded:
          Number(quantityNeeded),

        city,
        district,

        imageUrl

      });

      alert("Necessidade criada!");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      console.error(
        error.response?.data
      );

      alert(
        error.response?.data?.error ||
        "Erro ao criar necessidade"
      );

    }
  }
  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-6
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow
          w-full
          max-w-lg
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-orange-600
          mb-6
        ">
          Nova Necessidade
        </h1>

        <select
          value={tileType}
          onChange={(e) =>
            setTileType(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        >
        <option value="">
            Selecione o tipo da telha
        </option>

        <option value="Telha Americana">
            Telha Americana
        </option>

        <option value="Telha Colonial">
            Telha Colonial
        </option>

        <option value="Telha Francesa">
            Telha Francesa
        </option>

        <option value="Telha Italiana">
            Telha Italiana
        </option>

        <option value="Telha Paulista">
            Telha Paulista
        </option>

        <option value="Telha Portuguesa">
            Telha Portuguesa
        </option>

        <option value="Telha Romana">
            Telha Romana
        </option>

        </select>


        <input
          type="number"
          placeholder="Quantidade"
          value={quantityNeeded}
          onChange={(e) =>
            setQuantityNeeded(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="text"
          placeholder="Cidade"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="text"
          placeholder="Distrito"
          value={district}
          onChange={(e) =>
            setDistrict(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImageFile(
              e.target.files[0]
            )
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-orange-600
            hover:bg-orange-700
            text-white
            p-3
            rounded-lg
            font-semibold
          "
        >
          Salvar Necessidade
        </button>

      </form>

    </div>

  )
}