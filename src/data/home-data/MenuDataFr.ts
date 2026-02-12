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

const menu_data_fr: MenuItem[] = [
  {
    id: 1,
    title: "Accueil",
    link: "/fr",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Proprietes",
    link: "/fr/properties",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "A Propos",
    link: "/fr/#about-us",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Contact",
    link: "/fr/contact",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "Langues",
    link: "#",
    has_dropdown: true,
    sub_menus: [
      { link: "/", title: "Espanol" },
      { link: "/en", title: "English" },
      { link: "/it", title: "Italiano" },
      { link: "/de", title: "Deutsch" },
    ],
  },
];

export default menu_data_fr;
