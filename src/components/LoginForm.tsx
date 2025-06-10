import { useState } from "react";

export default function LoginForm() {
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg({ text: "Inicio de sesión exitoso.", isError: false });
      } else {
        setMsg({
          text: data.message || "Error al iniciar sesión.",
          isError: true,
        });
      }
    } catch {
      setMsg({ text: "Error de conexión con el servidor.", isError: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Iniciar Sesión
      </button>
      {msg && (
        <p
          className={`text-sm ${
            msg.isError ? "text-red-500" : "text-green-600"
          }`}
        >
          {msg.text}
        </p>
      )}
    </form>
  );
}
