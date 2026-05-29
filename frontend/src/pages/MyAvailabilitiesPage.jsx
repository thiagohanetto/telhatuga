import { useEffect, useState } from "react";

import api from "../services/api";

export default function MyAvailabilitiesPage() {

  const [
    availabilities,
    setAvailabilities
  ] = useState([]);

  async function loadAvailabilities() {

    try {

      const response =
        await api.get(
          "/availabilities/my"
        );

      setAvailabilities(
        response.data
      );

    } catch (error) {

      alert(
        "Erro ao carregar disponibilidades"
      );

    }
  }

  useEffect(() => {

    loadAvailabilities();

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
        text-green-600
        mb-8
      ">
        Minhas Disponibilidades
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {availabilities.map(
          (availability) => (

          <div
            key={availability.id}
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
              {availability.tileType}
            </h2>

            <p className="mb-2">
              <strong>
                Quantidade:
              </strong>
              {" "}
              {availability.quantityAvailable}
            </p>

            <p className="mb-2">
              <strong>
                Reservadas:
              </strong>
              {" "}
              {availability.quantityReserved}
            </p>

            <p className="mb-2">
              <strong>
                Cidade:
              </strong>
              {" "}
              {availability.city}
            </p>

            <p className="mb-2">
              <strong>
                Distrito:
              </strong>
              {" "}
              {availability.district}
            </p>

            <p className="
              mt-4
              inline-block
              px-3
              py-1
              rounded-full
              text-sm
              bg-green-100
              text-green-700
            ">
              {availability.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}