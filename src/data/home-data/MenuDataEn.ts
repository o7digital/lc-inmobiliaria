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

const menu_data_en: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/en",
    has_dropdown: false,
  },
  {
    id: 2,
    title: "Properties",
    link: "/en/properties",
    has_dropdown: false,
  },
  {
    id: 3,
    title: "About Us",
    link: "/en/#about-us",
    has_dropdown: false,
  },
  {
    id: 4,
    title: "Contact",
    link: "/en/contact",
    has_dropdown: false,
  },
  {
    id: 5,
    title: "EN",
    link: "#",
    has_dropdown: true,
    sub_menus: [
      { link: "/", title: "ES" },
    ],
  },
];

export default menu_data_en;
