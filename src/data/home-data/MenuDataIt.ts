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

const menu_data_it: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/it",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Immobili",
    link: "/it/properties",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "Chi Siamo",
    link: "/it/#about-us",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Contatto",
    link: "/it/contact",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "Lingue",
    link: "#",
    has_dropdown: true,
    sub_menus: [
      { link: "/", title: "Espanol" },
      { link: "/en", title: "English" },
      { link: "/fr", title: "Francais" },
      { link: "/de", title: "Deutsch" },
    ],
  },
];

export default menu_data_it;
