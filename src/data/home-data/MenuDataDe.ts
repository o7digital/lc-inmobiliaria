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

const menu_data_de: MenuItem[] = [
  {
    id: 1,
    title: "Startseite",
    link: "/de",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Immobilien",
    link: "/de/properties",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "Uber Uns",
    link: "/de/#about-us",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Kontakt",
    link: "/de/contact",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "Sprachen",
    link: "#",
    has_dropdown: true,
    sub_menus: [
      { link: "/", title: "Espanol" },
      { link: "/en", title: "English" },
      { link: "/fr", title: "Francais" },
      { link: "/it", title: "Italiano" },
    ],
  },
];

export default menu_data_de;
