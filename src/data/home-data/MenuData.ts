interface MenuItem {
  id: number;
  title: string;
  class_name?: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
  menu_column?: {
    id: number;
    mega_title: string;
    mega_menus: {
      link: string;
      title: string;
    }[];
  }[];
}

const menu_data: MenuItem[] = [
  {
    id: 1,
    title: "Inicio",
    link: "/",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Propiedades",
    link: "/listing_05",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "Quiénes Somos",
    link: "/#quienes-somos",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Contacto",
    link: "/contact",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "Idiomas",
    link: "#",
    has_dropdown: true,
    sub_menus: [
      { link: "/en", title: "English" },
      { link: "/fr", title: "Francais" },
      { link: "/it", title: "Italiano" },
      { link: "/de", title: "Deutsch" },
    ],
  },
];

export default menu_data;
