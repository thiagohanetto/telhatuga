import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

export default function DonationRequestsPage() {

  const [requests, setRequests] =
    useState([]);

  async function loadRequests() {

    try {

      const response =
        await api.get(
          "/donations/received"
        );

      setRequests(response.data);

    } catch (error) {

      alert(
        "Erro ao carregar solicitações"
      );

    }
  }

  useEffect(() => {

    loadRequests();

  }, []);

  async function approveRequest(
    requestId,
    approvedQuantity
  ) {

    try {

      await api.patch(
        `/donations/${requestId}/approve`,
        {
          approvedQuantity
        }
      );

      alert(
        "Solicitação aprovada!"
      );

      loadRequests();

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Erro ao aprovar"
      );

    }
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
        text-green-600
        mb-8
      ">
        Solicitações Recebidas
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        {requests.map((request) => (

          <div
            key={request.id}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            <h2 className="
              text-xl
              font-bold
              mb-4
            ">
              {request.availability.tileType}
            </h2>

            <p className="mb-2">
              <strong>
                Receptor:
              </strong>
              {" "}
              {request.receiver.name}
            </p>

            <p className="mb-2">
              <strong>
                Telefone:
              </strong>
              {" "}
              {request.receiver.phone}
            </p>

            <p className="mb-2">
              <strong>
                Solicitado:
              </strong>
              {" "}
              {request.requestedQuantity}
            </p>

            <p className="mb-4">
              <strong>
                Status:
              </strong>
              {" "}
              {request.status}
            </p>

            {request.status ===
              "PENDING" && (

              <button
                onClick={() =>
                  approveRequest(
                    request.id,
                    request.requestedQuantity
                  )
                }
                className="
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  py-2
                  rounded-lg
                "
              >
                Concluir doação
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  )
}