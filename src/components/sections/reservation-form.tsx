"use client";

import { useState } from "react";
import { reservationMessage, whatsappUrl } from "@/lib/links";

const initialState = {
  name: "",
  phone: "",
  people: "2",
  date: "",
  time: ""
};

export function ReservationForm() {
  const [values, setValues] = useState(initialState);

  function updateValue(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function submitReservation() {
    const message = reservationMessage(values);
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="glass-panel grid gap-4 rounded-lg p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        submitReservation();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-white/75">
          Nombre
          <input
            required
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            className="rounded-lg border border-white/12 bg-black/45 px-4 py-3 text-cream outline-none transition placeholder:text-white/28 focus:border-soft-gold"
            placeholder="Tu nombre"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white/75">
          Telefono
          <input
            required
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            className="rounded-lg border border-white/12 bg-black/45 px-4 py-3 text-cream outline-none transition placeholder:text-white/28 focus:border-soft-gold"
            placeholder="+56 9..."
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-white/75">
          Personas
          <input
            required
            min="1"
            type="number"
            value={values.people}
            onChange={(event) => updateValue("people", event.target.value)}
            className="rounded-lg border border-white/12 bg-black/45 px-4 py-3 text-cream outline-none transition focus:border-soft-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white/75">
          Fecha
          <input
            required
            type="date"
            value={values.date}
            onChange={(event) => updateValue("date", event.target.value)}
            className="rounded-lg border border-white/12 bg-black/45 px-4 py-3 text-cream outline-none transition focus:border-soft-gold"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-white/75">
          Hora
          <input
            required
            type="time"
            value={values.time}
            onChange={(event) => updateValue("time", event.target.value)}
            className="rounded-lg border border-white/12 bg-black/45 px-4 py-3 text-cream outline-none transition focus:border-soft-gold"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-2 min-h-13 rounded-full bg-neon-red px-6 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_32px_rgba(229,9,47,0.45)] transition hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
      >
        Enviar reserva por WhatsApp
      </button>
      <p className="text-xs leading-6 text-white/48">
        Este formulario no reemplaza una confirmacion del local. Enviaremos tu solicitud por WhatsApp para validar disponibilidad.
      </p>
    </form>
  );
}
