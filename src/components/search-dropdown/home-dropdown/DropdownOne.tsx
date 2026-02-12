import NiceSelect from "@/ui/NiceSelect";

type Locale = "es" | "en";

const locations = [
   "Ciudad de México",
   "Estado de México",
   "Guadalajara, Jalisco",
   "Monterrey, Nuevo León",
   "Puebla, Puebla",
   "Querétaro, Querétaro",
   "Mérida, Yucatán",
   "Cancún, Quintana Roo",
   "Tijuana, Baja California",
   "León, Guanajuato",
   "Toluca, Estado de México",
   "Playa del Carmen, Quintana Roo",
   "Los Cabos, B.C.S.",
   "Oaxaca, Oaxaca",
   "Veracruz, Veracruz",
   "Chihuahua, Chihuahua",
   "Hermosillo, Sonora",
   "Culiacán, Sinaloa",
   "Tuxtla Gutiérrez, Chiapas",
   "San Luis Potosí, SLP",
   "Morelia, Michoacán",
   "Aguascalientes, Ags.",
   "Zacatecas, Zac.",
   "Saltillo, Coahuila",
   "Torreón, Coahuila",
   "Villahermosa, Tabasco",
   "Tampico, Tamaulipas",
   "La Paz, B.C.S.",
];

const DropdownOne = ({ style, locale = "es" }: { style?: boolean; locale?: Locale }) => {
   const isEnglish = locale === "en";
   const searchPath = isEnglish ? "/en/properties" : "/listing_05";

   const setSession = (key: string, value: string) => {
      if (typeof window === "undefined") return;
      sessionStorage.setItem(key, value);
   };

   const selectTypeHandler = (e: any) => {
      setSession("search:type", e.target.value || "");
   };

   const selectLocationHandler = (e: any) => {
      setSession("search:location", e.target.value || "");
   };

   const searchHandler = () => {
      if (typeof window !== "undefined") {
         sessionStorage.setItem("search:activated", "1");
      }
      window.location.href = searchPath;
   };

   const typeOptions = isEnglish
      ? [
           { value: "", text: "All categories" },
           { value: "buy-apartments", text: "Buy Apartments" },
           { value: "rent-apartments", text: "Rent Apartments" },
           { value: "buy-houses", text: "Buy Houses" },
           { value: "rent-houses", text: "Rent Houses" },
           { value: "buy-offices", text: "Buy Offices" },
           { value: "rent-offices", text: "Rent Offices" },
           { value: "buy-land", text: "Buy Land" },
           { value: "sell-land", text: "Sell Land" },
        ]
      : [
           { value: "", text: "Todas las categorías" },
           { value: "comprar-departamentos", text: "Comprar Departamentos" },
           { value: "rentar-departamentos", text: "Rentar Departamentos" },
           { value: "comprar-casas", text: "Comprar Casas" },
           { value: "rentar-casas", text: "Rentar Casas" },
           { value: "comprar-oficinas", text: "Comprar Oficinas" },
           { value: "rentar-oficinas", text: "Rentar Oficinas" },
           { value: "comprar-terrenos", text: "Comprar Terrenos" },
           { value: "vender-terrenos", text: "Vender Terrenos" },
        ];

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">{isEnglish ? "I'm looking for..." : "Estoy buscando..."}</div>
                  <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={typeOptions}
                     defaultCurrent={0}
                     onChange={selectTypeHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
               <div className="input-box-one border-left">
                  <div className="label">{isEnglish ? "Location" : "Ubicación"}</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "", text: isEnglish ? "All locations" : "Todas las ubicaciones" },
                        ...locations.map((location) => ({ value: location, text: location })),
                     ]}
                     defaultCurrent={0}
                     onChange={selectLocationHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left border-lg-0">
                  <div className="label">{isEnglish ? "Price range" : "Rango de precio"}</div>
                  <NiceSelect
                     className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "1", text: "$50,000 - $10,000,000" },
                        { value: "2", text: "$50,000 - $5,000,000" },
                        { value: "3", text: "$50,000 - $2,000,000" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectLocationHandler}
                     name=""
                     placeholder="" />
              </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
               <div className="input-box-one lg-mt-10">
                  <button className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}>
                     {style ? (isEnglish ? "Search now" : "Buscar ahora") : (isEnglish ? "Search" : "Buscar")}
                  </button>
              </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
