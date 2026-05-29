import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

export default function MyRequestsPage() {

  const [requests, setRequests] =
    useState([]);

  async function loadRequests() {

    try {

      const response =
        await api.get(
          "/donations/my-requests"
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
        Minhas Solicitações
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
              {
                request.availability
                  .tileType
              }
            </h2>

            <p className="mb-2">
              <strong>
                Doador:
              </strong>
              {" "}
              {request.donor.name}
            </p>

            <p className="mb-2">
              <strong>
                Telefone:
              </strong>
              {" "}
              {request.donor.phone}
            </p>

            <p className="mb-2">
              <strong>
                Quantidade:
              </strong>
              {" "}
              {request.requestedQuantity}
            </p>

            <p className="mb-2">
              <strong>
                Status:
              </strong>
              {" "}
              {request.status}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}