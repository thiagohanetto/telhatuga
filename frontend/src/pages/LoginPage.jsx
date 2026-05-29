import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin(e) {

    e.preventDefault();

    try {

      const response =
        await api.post("/auth/login", {
          email,
          password
        });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Erro ao fazer login"
      );

    }
  }

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    ">

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-md
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-orange-600
          mb-6
          text-center
        ">
          TelhaTuga
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-6
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
          Entrar
        </button>

        <p className="
          text-center
          mt-4
          text-gray-600
        ">
          Não possui conta?

          <Link
            to="/register"
            className="
              text-orange-600
              ml-1
            "
          >
            Cadastre-se
          </Link>
        </p>

      </form>

    </div>

  )
}