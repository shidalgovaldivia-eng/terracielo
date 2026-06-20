export type MenuDelDia = {
  fecha: string;
  entrada: string;
  fondo: string;
  acompanamiento: string;
  bebida: string;
  postre: string;
  precio: string;
  disponible: string;
};

export type MenuDelDiaResponse = {
  ok: boolean;
  date: string;
  menu: MenuDelDia | null;
  message: string;
};
