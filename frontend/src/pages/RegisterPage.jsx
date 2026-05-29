import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

export default function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleRegister(e) {

    e.preventDefault();

    try {

      await api.post("/auth/register", {
        name,
        email,
        phone,
        city,
        password
      });

      alert("Usuário criado com sucesso!");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Erro ao cadastrar"
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
        onSubmit={handleRegister}
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
          Criar Conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
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
          Cadastrar
        </button>

        <p className="
          text-center
          mt-4
          text-gray-600
        ">
          Já possui conta?

          <Link
            to="/"
            className="
              text-orange-600
              ml-1
            "
          >
            Entrar
          </Link>
        </p>

      </form>

    </div>

  )
}