import type { EventItem, FeaturedItem, ImageAsset, NavItem, Promotion, Testimonial } from "@/types/site";

export const siteConfig = {
  name: "Terracielo Gastrobar",
  shortName: "Terracielo",
  tagline: "Sabor y vida",
  description: "Gastronomia, cocteleria y experiencias unicas en Alto Hospicio.",
  url: "https://terracielogastrobar.cl",
  fudoMenuUrl: "https://app.fu.do/",
  instagramUrl: "https://www.instagram.com/terracielogastrobar/",
  whatsappNumber: "56958017106",
  displayPhone: "+56 9 5801 7106",
  address: {
    street: "Av. Ramon Perez Opazo 3122",
    city: "Alto Hospicio",
    region: "Tarapaca",
    country: "CL"
  },
  mapEmbedUrl:
    "https://www.google.com/maps?q=Av.%20Ramon%20Perez%20Opazo%203122%2C%20Alto%20Hospicio%2C%20Chile&output=embed",
  hours: [
    "Lunes a jueves: 12:30 - 23:30",
    "Viernes y sabado: 12:30 - 02:00",
    "Domingo: 12:30 - 22:30"
  ],
  keywords: [
    "restaurante alto hospicio",
    "gastrobar alto hospicio",
    "restaurante iquique",
    "cafeteria alto hospicio",
    "cocteleria alto hospicio",
    "bar alto hospicio",
    "karaoke alto hospicio",
    "eventos alto hospicio"
  ]
} as const;

export const navItems: NavItem[] = [
  { label: "Carta", href: "#platos" },
  { label: "Cocteleria", href: "#cocteleria" },
  { label: "Eventos", href: "#eventos" },
  { label: "Reservas", href: "#reservas" },
  { label: "Ubicacion", href: "#ubicacion" }
];

export const heroImage: ImageAsset = {
  src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85",
  alt: "Interior nocturno de gastrobar moderno con luces calidas"
};

export const featuredDishes: FeaturedItem[] = [
  {
    name: "Tabla Terracielo",
    description: "Seleccion para compartir con carnes, papas rusticas, salsas de la casa y toque premium.",
    price: "Desde $18.900",
    tag: "Para compartir",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "Tabla de carnes y acompanamientos para compartir"
  },
  {
    name: "Burger Sabor y Vida",
    description: "Hamburguesa jugosa con queso fundido, vegetales frescos y salsa especial.",
    price: "$10.900",
    tag: "Favorita",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    alt: "Hamburguesa gourmet con queso y papas"
  },
  {
    name: "Pasta Cremosa",
    description: "Pasta salteada con salsa cremosa, hierbas y terminacion de restaurante.",
    price: "$11.900",
    src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80",
    alt: "Plato de pasta cremosa servido en restaurante"
  },
  {
    name: "Corte Grill",
    description: "Corte a la plancha con guarnicion, verduras asadas y reduccion intensa.",
    price: "$15.900",
    src: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
    alt: "Corte de carne grillado con guarnicion"
  },
  {
    name: "Cafe de Autor",
    description: "Cafe preparado para tarde de conversacion, postre y sobremesa.",
    price: "$3.500",
    tag: "Cafe",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    alt: "Cafe servido en taza con ambiente de cafeteria"
  },
  {
    name: "Postre de Temporada",
    description: "Dulce final de la casa para cerrar almuerzos, cenas y celebraciones.",
    price: "$5.900",
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
    alt: "Postre premium con frutos y crema"
  }
];

export const cocktails: FeaturedItem[] = [
  {
    name: "Neon Spritz",
    description: "Refrescante, frutal y perfecto para iniciar la noche.",
    price: "Happy Hour",
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
    alt: "Coctel naranja con hielo y decoracion"
  },
  {
    name: "Terracielo Sour",
    description: "Clasico sour con presentacion de autor y balance citrico.",
    price: "2x1 seleccionado",
    src: "https://images.unsplash.com/photo-1527761939622-933c772d814b?auto=format&fit=crop&w=900&q=80",
    alt: "Coctel sour servido en copa corta"
  },
  {
    name: "Red Night",
    description: "Intenso, elegante y pensado para fotos, brindis y DJ.",
    price: "Promo nocturna",
    src: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80",
    alt: "Coctel rojo en barra nocturna"
  }
];

export const events: EventItem[] = [
  {
    name: "Karaoke Night",
    schedule: "Jueves seleccionados",
    description: "Noche para cantar, compartir y convertir la mesa en escenario.",
    src: "https://images.unsplash.com/photo-1527261834078-9b37d35a4a32?auto=format&fit=crop&w=900&q=80",
    alt: "Microfono de karaoke en ambiente nocturno"
  },
  {
    name: "DJ Session",
    schedule: "Viernes y sabado",
    description: "Musica en vivo, cocteles y ambiente de gastrobar hasta tarde.",
    src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
    alt: "DJ mezclando musica en evento nocturno"
  },
  {
    name: "Guerra de Sexos",
    schedule: "Eventos tematicos",
    description: "Dinamicas, concursos y entretencion para grupos de amigos.",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80",
    alt: "Personas celebrando en evento social"
  },
  {
    name: "Halloween",
    schedule: "Temporada octubre",
    description: "Fiesta de disfraces, promociones y experiencias especiales.",
    src: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=900&q=80",
    alt: "Coctel tematico de Halloween en barra"
  },
  {
    name: "San Valentin",
    schedule: "Febrero",
    description: "Cena, cocteles y ambiente romantico para celebrar en pareja.",
    src: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=900&q=80",
    alt: "Mesa romantica con copas y luz calida"
  },
  {
    name: "Eventos Privados",
    schedule: "Con reserva",
    description: "Cumpleanos, reuniones sociales y celebraciones a medida.",
    src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80",
    alt: "Celebracion privada en restaurante con luces"
  }
];

export const galleryImages: ImageAsset[] = [
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    alt: "Restaurante moderno con mesas iluminadas"
  },
  {
    src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800&q=80",
    alt: "Personas compartiendo comida en restaurante"
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
    alt: "Barra de cocteleria con luces de noche"
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    alt: "Grupo de amigos brindando en una mesa"
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80",
    alt: "Plato gourmet servido en mesa oscura"
  },
  {
    src: "https://images.unsplash.com/photo-1532635224-cf024e66d122?auto=format&fit=crop&w=800&q=80",
    alt: "Terraza de bar con luces colgantes"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Camila R.",
    rating: 5,
    text: "Excelente ambiente para celebrar. La comida llego bien presentada y los tragos estaban buenisimos.",
    detail: "Reserva de cumpleanos"
  },
  {
    name: "Ignacio M.",
    rating: 5,
    text: "Fuimos por karaoke y terminamos quedandonos toda la noche. Buena musica, atencion rapida y local comodo.",
    detail: "Karaoke Night"
  },
  {
    name: "Daniela P.",
    rating: 5,
    text: "Tiene energia de bar moderno sin perder lo familiar. Ideal para ir en pareja o con amigos.",
    detail: "Cena y cocteles"
  }
];

export const promotions: Promotion[] = [
  {
    title: "Happy Hour",
    description: "Cocteles seleccionados y promociones para comenzar la tarde con buen ambiente.",
    badge: "After office"
  },
  {
    title: "Cumpleanos",
    description: "Reserva tu mesa, celebra con tu grupo y consulta beneficios para festejados.",
    badge: "Celebraciones"
  },
  {
    title: "2x1 Especial",
    description: "Promociones rotativas en bebestibles y platos seleccionados segun evento.",
    badge: "Promo"
  },
  {
    title: "Eventos Tematicos",
    description: "Karaoke, DJ, dinamicas, fechas especiales y experiencias nocturnas.",
    badge: "Noches TC"
  }
];
