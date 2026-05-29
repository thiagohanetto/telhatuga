import { useEffect, useState } from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyNeedsPage() {

  const [needs, setNeeds] =
    useState([]);

  const navigate = useNavigate();    

  async function loadNeeds() {

    try {

      const response =
        await api.get("/needs/my");

      setNeeds(response.data);

    } catch (error) {

      alert("Erro ao carregar necessidades");

    }
  }

  useEffect(() => {

    loadNeeds();

  }, []);

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      <h1 className="
        text-3xl
        font-bold
        text-orange-600
        mb-8
      ">
        Minhas Necessidades
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {needs.map((need) => (

          <div
            key={need.id}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            {availability.imageUrl && (

              <img
                src={availability.imageUrl}
                alt="Telha"
                className="
                  w-full
                  h-48
                  object-cover
                  rounded-xl
                  mb-4
                "
              />
            )}

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              {need.tileType}
            </h2>

            <p className="mb-2">
              <strong>
                Quantidade:
              </strong>
              {" "}
              {need.quantityNeeded}
            </p>

            <p className="mb-2">
              <strong>
                Recebidas:
              </strong>
              {" "}
              {need.quantityReceived}
            </p>

            <p className="mb-2">
              <strong>
                Cidade:
              </strong>
              {" "}
              {need.city}
            </p>

            <p className="mb-2">
              <strong>
                Distrito:
              </strong>
              {" "}
              {need.district}
            </p>

            <p className="
              mt-4
              inline-block
              px-3
              py-1
              rounded-full
              text-sm
              bg-orange-100
              text-orange-700
            ">
              {need.status}
            </p>

            <div className="mt-6">

            <button
                onClick={() =>
                navigate(
                    `/needs/${need.id}/matches`
                )
                }
                className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2
                rounded-lg
                "
            >
                Ver Matches
            </button>

            <p className="mb-2">
              <strong>
                Faltam:
              </strong>
              {" "}
              {
                need.quantityNeeded -
                need.quantityReceived
              }
            </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}