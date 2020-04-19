import React, { useState } from "react";
import Auth0 from "../lib/Auth0";
import Axios from "axios";
import router from "next/router";

const createStatus = (props) => {
  const [dados, setDados] = useState({
    status: "bem",
    coords: {
      lat: null,
      long: null,
    },
  });

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDados((old) => {
          return {
            ...old,
            coords: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          };
        });
      });
    }
  };

  const handleStatus = (e) => {
    const value = e.target.value;
    setDados((old) => {
      return {
        ...old,
        status: value,
      };
    });
  };

  const saveStatus = async () => {
    await Axios.post("/api/save-status", dados);
    router.push("/app");
  };

  return (
    <div>
      <h1 className="my-6">Marque sua condiçao: </h1>
      <label className="block">
        <input
          onClick={handleStatus}
          name="status"
          value="bem"
          type="radio"
          className="mr-4"
        />
        Estou me sentindo bem
      </label>
      <label className="block">
        <input
          onClick={handleStatus}
          name="status"
          value="resfriado"
          type="radio"
          className="mr-4"
        />
        Estou com sintomas de resfriado
      </label>
      <label className="block">
        <input
          onClick={handleStatus}
          name="status"
          value="gripe"
          type="radio"
          className="mr-4"
        />
        Estou com sintomas de gripe
      </label>
      <label className="block">
        <input
          onClick={handleStatus}
          name="status"
          value="covid"
          type="radio"
          className="mr-4"
        />
        Estou com sintomas de COVID-19
      </label>
      <div className="flex my-4">
        <button
          className="mx-auto w-1/4 block text-center py-4 px-2 rounded font-bold bg-pink-800 text-white shadow"
          onClick={getMyLocation}
        >
          Pegar minha localização
        </button>
        <button
          className="mx-auto w-1/4 block text-center py-4 px-2 rounded font-bold bg-pink-800 text-white shadow"
          onClick={saveStatus}
        >
          Salvar meu status
        </button>
      </div>
    </div>
  );
};

export default createStatus;

export async function getServerSideProps({ req, res }) {
  const session = await Auth0.getSession(req);
  if (session) {
    return {
      props: {
        isAuth: true,
        user: session.user,
      },
    };
  }

  return {
    props: {
      isAuth: false,
      user: {},
    },
  };
}
