import NiceSelect from "@/ui/NiceSelect";
import { SiteLocale, getLocalePrefix } from "@/types/siteLocale";

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

const DropdownOne = ({ style, locale = "es" }: { style?: boolean; locale?: SiteLocale }) => {
   const localePrefix = getLocalePrefix(locale);
   const searchPath = locale === "es" ? "/listing_05" : `${localePrefix}/properties`;

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

   const typeOptionsMap: Record<SiteLocale, { value: string; text: string }[]> = {
      es: [
         { value: "", text: "Todas las categorías" },
         { value: "comprar-departamentos", text: "Comprar Departamentos" },
         { value: "rentar-departamentos", text: "Rentar Departamentos" },
         { value: "comprar-casas", text: "Comprar Casas" },
         { value: "rentar-casas", text: "Rentar Casas" },
         { value: "comprar-oficinas", text: "Comprar Oficinas" },
         { value: "rentar-oficinas", text: "Rentar Oficinas" },
         { value: "comprar-terrenos", text: "Comprar Terrenos" },
         { value: "vender-terrenos", text: "Vender Terrenos" },
      ],
      en: [
         { value: "", text: "All categories" },
         { value: "buy-apartments", text: "Buy Apartments" },
         { value: "rent-apartments", text: "Rent Apartments" },
         { value: "buy-houses", text: "Buy Houses" },
         { value: "rent-houses", text: "Rent Houses" },
         { value: "buy-offices", text: "Buy Offices" },
         { value: "rent-offices", text: "Rent Offices" },
         { value: "buy-land", text: "Buy Land" },
         { value: "sell-land", text: "Sell Land" },
      ],
      fr: [
         { value: "", text: "Toutes les categories" },
         { value: "buy-apartments", text: "Acheter des Appartements" },
         { value: "rent-apartments", text: "Louer des Appartements" },
         { value: "buy-houses", text: "Acheter des Maisons" },
         { value: "rent-houses", text: "Louer des Maisons" },
         { value: "buy-offices", text: "Acheter des Bureaux" },
         { value: "rent-offices", text: "Louer des Bureaux" },
         { value: "buy-land", text: "Acheter des Terrains" },
         { value: "sell-land", text: "Vendre des Terrains" },
      ],
      it: [
         { value: "", text: "Tutte le categorie" },
         { value: "buy-apartments", text: "Comprare Appartamenti" },
         { value: "rent-apartments", text: "Affittare Appartamenti" },
         { value: "buy-houses", text: "Comprare Case" },
         { value: "rent-houses", text: "Affittare Case" },
         { value: "buy-offices", text: "Comprare Uffici" },
         { value: "rent-offices", text: "Affittare Uffici" },
         { value: "buy-land", text: "Comprare Terreni" },
         { value: "sell-land", text: "Vendere Terreni" },
      ],
      de: [
         { value: "", text: "Alle Kategorien" },
         { value: "buy-apartments", text: "Wohnungen kaufen" },
         { value: "rent-apartments", text: "Wohnungen mieten" },
         { value: "buy-houses", text: "Hauser kaufen" },
         { value: "rent-houses", text: "Hauser mieten" },
         { value: "buy-offices", text: "Buros kaufen" },
         { value: "rent-offices", text: "Buros mieten" },
         { value: "buy-land", text: "Grundstucke kaufen" },
         { value: "sell-land", text: "Grundstucke verkaufen" },
      ],
   };

   const labelsMap: Record<SiteLocale, { looking: string; location: string; allLocations: string; priceRange: string; searchNow: string; search: string }> = {
      es: { looking: "Estoy buscando...", location: "Ubicación", allLocations: "Todas las ubicaciones", priceRange: "Rango de precio", searchNow: "Buscar ahora", search: "Buscar" },
      en: { looking: "I'm looking for...", location: "Location", allLocations: "All locations", priceRange: "Price range", searchNow: "Search now", search: "Search" },
      fr: { looking: "Je recherche...", location: "Localisation", allLocations: "Toutes les zones", priceRange: "Plage de prix", searchNow: "Rechercher", search: "Rechercher" },
      it: { looking: "Sto cercando...", location: "Localita", allLocations: "Tutte le localita", priceRange: "Fascia di prezzo", searchNow: "Cerca ora", search: "Cerca" },
      de: { looking: "Ich suche...", location: "Standort", allLocations: "Alle Standorte", priceRange: "Preisspanne", searchNow: "Jetzt suchen", search: "Suchen" },
   };
   const labels = labelsMap[locale];
   const typeOptions = typeOptionsMap[locale];

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">{labels.looking}</div>
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
                  <div className="label">{labels.location}</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "", text: labels.allLocations },
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
                  <div className="label">{labels.priceRange}</div>
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
                     {style ? labels.searchNow : labels.search}
                  </button>
              </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
