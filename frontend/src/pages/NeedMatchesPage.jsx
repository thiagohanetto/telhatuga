import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import api from "../services/api";

export default function NeedMatchesPage() {

  const { id } = useParams();

  const [data, setData] =
    useState(null);

  const [selectedMatch,
    setSelectedMatch] =
    useState(null);

  const [quantity,
    setQuantity] =
    useState("");

  async function loadMatches() {

    try {

      const response =
        await api.get(
          `/needs/${id}/matches`
        );

      setData(response.data);

    } catch (error) {

      alert(
        "Erro ao carregar matches"
      );

    }
  }

  useEffect(() => {

    loadMatches();

  }, []);

  function handleRequest(match) {

    setSelectedMatch(match);

  }

  async function submitRequest() {

    try {

      await api.post(
        "/donations/request",
        {
          availabilityId:
            selectedMatch.id,

          needId: id,

          requestedQuantity:
            Number(quantity)
        }
      );

      alert(
        "Solicitação enviada!"
      );

      setSelectedMatch(null);

      setQuantity("");

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Erro ao solicitar doação"
      );

    }
  }

  if (!data) {

    return (
      <div className="p-8">
        Carregando...
      </div>
    )

  }

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
        mb-2
      ">
        Matches Encontrados
      </h1>

      <p className="
        text-gray-600
        mb-8
      ">
        Tipo:
        {" "}
        <strong>
          {data.need.tileType}
        </strong>
      </p>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {data.matches.map((match) => (

          <div
            key={match.id}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            <img
              src={match.imageUrl}
              alt="Telha"
              className="
                w-full
                h-48
                object-cover
                rounded-xl
                mb-4
              "
            />

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              {match.tileType}
            </h2>

            <p className="mb-2">
              <strong>
                Disponível:
              </strong>
              {" "}
              {match.quantityAvailable}
            </p>

            <p className="mb-2">
              <strong>
                Cidade:
              </strong>
              {" "}
              {match.city}
            </p>

            <p className="mb-2">
              <strong>
                Distrito:
              </strong>
              {" "}
              {match.district}
            </p>

            <div className="
              mt-6
              border-t
              pt-4
            ">

              <p className="
                font-semibold
              ">
                Doador
              </p>

              <p>
                {match.user.name}
              </p>

              <p>
                {match.user.phone}
              </p>

            </div>

            <button
              onClick={() =>
                handleRequest(match)
              }
              className="
                mt-4
                bg-orange-600
                hover:bg-orange-700
                text-white
                px-4
                py-2
                rounded-lg
                w-full
              "
            >
              Solicitar Doação
            </button>

          </div>

        ))}

      </div>

      {selectedMatch && (

        <div className="
          fixed
          inset-0
          bg-black
          bg-opacity-50
          flex
          items-center
          justify-center
        ">

          <div className="
            bg-white
            p-6
            rounded-2xl
            w-full
            max-w-md
          ">

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              Solicitar Doação
            </h2>

            <p className="mb-4">
              Doador:
              {" "}
              {selectedMatch.user.name}
            </p>

            <p className="mb-4">
              Disponível:
              {" "}
              {selectedMatch.quantityAvailable}
            </p>

            <input
              type="number"
              placeholder="Quantidade desejada"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
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

            <div className="
              flex
              gap-2
            ">

              <button
                onClick={submitRequest}
                className="
                  bg-orange-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  flex-1
                "
              >
                Confirmar
              </button>

              <button
                onClick={() =>
                  setSelectedMatch(null)
                }
                className="
                  bg-gray-300
                  px-4
                  py-2
                  rounded-lg
                  flex-1
                "
              >
                Cancelar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )
}