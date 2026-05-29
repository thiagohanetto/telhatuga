import { useNavigate } from "react-router-dom";

export default function DashboardPage() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

  }

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="
        bg-white
        shadow
        px-8
        py-4
        flex
        justify-between
        items-center
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-orange-600
          ">
            TelhaTuga
          </h1>

          <p className="text-gray-600">
            Bem-vindo, {user?.name}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Sair
        </button>

      </header>

      {/* MAIN */}
      <main className="p-8">

        <h2 className="
          text-2xl
          font-semibold
          mb-8
        ">
          Painel Principal
        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* PRECISO DE TELHAS */}
          <div className="
            bg-white
            p-6
            rounded-2xl
            shadow
          ">

            <h3 className="text-xl font-bold mb-4">
              Preciso de Telhas
            </h3>

            <p className="text-gray-600 mb-6">
              Registre e acompanhe suas necessidades de telhas.
            </p>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  navigate("/needs/new")
                }
                className="
                  bg-orange-600
                  hover:bg-orange-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Criar Necessidade
              </button>

              <button
                onClick={() =>
                  navigate("/my-needs")
                }
                className="
                  bg-orange-600
                  hover:bg-orange-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Ver Minhas
              </button>

              <button
                onClick={() =>
                  navigate("/my-requests")
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
                Solicitações
              </button>

            </div>

          </div>

          {/* TENHO TELHAS */}
          <div className="
            bg-white
            p-6
            rounded-2xl
            shadow
          ">

            <h3 className="text-xl font-bold mb-4">
              Tenho Telhas
            </h3>

            <p className="text-gray-600 mb-6">
              Disponibilize telhas para doação.
            </p>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() =>
                  navigate("/availabilities/new")
                }
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Criar Disponibilidade
              </button>

              <button
                onClick={() =>
                  navigate("/my-availabilities")
                }
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Ver Minhas
              </button>

              <button
                onClick={() =>
                  navigate("/donation-requests")
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
                Solicitações
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}