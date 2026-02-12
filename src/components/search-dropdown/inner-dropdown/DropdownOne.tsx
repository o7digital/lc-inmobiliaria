import NiceSelect from "@/ui/NiceSelect"
import PriceRange from "../../common/PriceRange";
import Link from "next/link";
import { SiteLocale } from "@/types/siteLocale";

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

const ammenities_es: string[] = [
   "A/C y Calefacción",
   "Garajes",
   "Jardín",
   "Acceso para discapacitados",
   "Alberca",
   "Estacionamiento",
   "Wifi",
   "Pet Friendly",
   "Altura de techo",
   "Chimenea",
   "Área de juegos",
   "Elevador",
];

const ammenities_en: string[] = [
   "A/C & Heating",
   "Garages",
   "Garden",
   "Disabled Access",
   "Pool",
   "Parking",
   "Wifi",
   "Pet Friendly",
   "Ceiling Height",
   "Fireplace",
   "Playground",
   "Elevator",
];

const ammenities_fr: string[] = ["Climatisation", "Garages", "Jardin", "Acces PMR", "Piscine", "Parking", "Wifi", "Animaux acceptes", "Hauteur sous plafond", "Cheminee", "Aire de jeux", "Ascenseur"];
const ammenities_it: string[] = ["A/C e Riscaldamento", "Garage", "Giardino", "Accesso disabili", "Piscina", "Parcheggio", "Wifi", "Animali ammessi", "Altezza soffitto", "Camino", "Area giochi", "Ascensore"];
const ammenities_de: string[] = ["Klimaanlage & Heizung", "Garagen", "Garten", "Barrierefreier Zugang", "Pool", "Parkplatz", "Wifi", "Haustierfreundlich", "Deckenhohe", "Kamin", "Spielplatz", "Aufzug"];

const DropdownOne = ({
   locale = "es",
   handleBathroomChange,
   handleBedroomChange,
   handleSearchChange,
   handlePriceChange,
   maxPrice,
   priceValue,
   handleResetFilter,
   selectedAmenities,
   handleAmenityChange,
   handleLocationChange,
   handleStatusChange, }: any) => {
   const currentLocale = locale as SiteLocale;
   const amenitiesMap: Record<SiteLocale, string[]> = {
      es: ammenities_es,
      en: ammenities_en,
      fr: ammenities_fr,
      it: ammenities_it,
      de: ammenities_de,
   };
   const amenities = amenitiesMap[currentLocale];
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
         { value: "buy-apartments", text: "Acheter Appartements" },
         { value: "rent-apartments", text: "Louer Appartements" },
         { value: "buy-houses", text: "Acheter Maisons" },
         { value: "rent-houses", text: "Louer Maisons" },
         { value: "buy-offices", text: "Acheter Bureaux" },
         { value: "rent-offices", text: "Louer Bureaux" },
         { value: "buy-land", text: "Acheter Terrains" },
         { value: "sell-land", text: "Vendre Terrains" },
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
   const labelsMap: Record<SiteLocale, { looking: string; keyword: string; keywordPlaceholder: string; location: string; allLocations: string; bedrooms: string; bathrooms: string; amenities: string; priceRange: string; min: string; max: string; search: string; reset: string; save: string }> = {
      es: { looking: "Estoy buscando...", keyword: "Palabra clave", keywordPlaceholder: "comprar, casa, loft, departamento", location: "Ubicación", allLocations: "Todas las ubicaciones", bedrooms: "Recámaras", bathrooms: "Baños", amenities: "Amenidades", priceRange: "Rango de precio", min: "Mín", max: "Máx", search: "Buscar", reset: "Reiniciar filtros", save: "Guardar búsqueda" },
      en: { looking: "I'm looking for...", keyword: "Keyword", keywordPlaceholder: "buy, home, loft, apartment", location: "Location", allLocations: "All locations", bedrooms: "Bedrooms", bathrooms: "Bathrooms", amenities: "Amenities", priceRange: "Price range", min: "Min", max: "Max", search: "Search", reset: "Reset filters", save: "Save search" },
      fr: { looking: "Je recherche...", keyword: "Mot-cle", keywordPlaceholder: "achat, maison, loft, appartement", location: "Localisation", allLocations: "Toutes les zones", bedrooms: "Chambres", bathrooms: "Salles de bain", amenities: "Equipements", priceRange: "Plage de prix", min: "Min", max: "Max", search: "Rechercher", reset: "Reinitialiser", save: "Sauvegarder la recherche" },
      it: { looking: "Sto cercando...", keyword: "Parola chiave", keywordPlaceholder: "acquisto, casa, loft, appartamento", location: "Localita", allLocations: "Tutte le localita", bedrooms: "Camere", bathrooms: "Bagni", amenities: "Servizi", priceRange: "Fascia di prezzo", min: "Min", max: "Max", search: "Cerca", reset: "Reimposta filtri", save: "Salva ricerca" },
      de: { looking: "Ich suche...", keyword: "Stichwort", keywordPlaceholder: "kauf, haus, loft, wohnung", location: "Standort", allLocations: "Alle Standorte", bedrooms: "Schlafzimmer", bathrooms: "Badezimmer", amenities: "Ausstattung", priceRange: "Preisspanne", min: "Min", max: "Max", search: "Suchen", reset: "Filter zurucksetzen", save: "Suche speichern" },
   };
   const labels = labelsMap[currentLocale];
   const typeOptions = typeOptionsMap[currentLocale];

   return (
      <form onSubmit={(e) => e.preventDefault()}>
         <div className="row gx-lg-5">
            <div className="col-12">
               <div className="input-box-one mb-35">
                  <div className="label">{labels.looking}</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={typeOptions}
                     defaultCurrent={0}
                     onChange={handleStatusChange}
                     name=""
                     placeholder="" />
               </div>
            </div>

            <div className="col-12">
               <div className="input-box-one mb-35">
                  <div className="label">{labels.keyword}</div>
                  <input
                     onChange={handleSearchChange}
                     type="text"
                     placeholder={labels.keywordPlaceholder}
                     className="type-input"
                  />
               </div>
            </div>

            <div className="col-12">
               <div className="input-box-one mb-50">
                  <div className="label">{labels.location}</div>
                  <NiceSelect className="nice-select location fw-normal"
                     options={[
                        { value: "", text: labels.allLocations },
                        ...locations.map((location) => ({ value: location, text: location })),
                     ]}
                     defaultCurrent={0}
                     onChange={handleLocationChange}
                     name=""
                     placeholder="" />
               </div>
            </div>

            <div className="col-sm-6">
               <div className="input-box-one mb-40">
                  <div className="label">{labels.bedrooms}</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={[
                        { value: "1", text: "1" },
                        { value: "2", text: "2" },
                        { value: "3", text: "3" },
                        { value: "4", text: "4" },
                     ]}
                     defaultCurrent={0}
                     onChange={handleBedroomChange}
                     name=""
                     placeholder="" />
               </div>
            </div>

            <div className="col-sm-6">
               <div className="input-box-one mb-40">
                  <div className="label">{labels.bathrooms}</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={[
                        { value: "1", text: "1" },
                        { value: "2", text: "2" },
                        { value: "3", text: "3" },
                        { value: "4", text: "4" },
                     ]}
                     defaultCurrent={0}
                     onChange={handleBathroomChange}
                     name=""
                     placeholder="" />
               </div>
            </div>

            <div className="col-12">
               <h6 className="block-title fw-bold mb-30">{labels.amenities}</h6>
               <ul
                  className="style-none d-flex flex-wrap justify-content-between filter-input">
                  {amenities.map((list, i) => (
                     <li key={i}>
                        <input
                           type="checkbox"
                           name="Amenities"
                           value={list}
                           checked={selectedAmenities.includes(list)}
                           onChange={handleAmenityChange}
                        />
                        <label>{list}</label>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="col-12">
               <h6 className="block-title fw-bold mt-25 mb-15">{labels.priceRange}</h6>
               <div className="price-ranger">
                  <div
                     className="price-input d-flex align-items-center justify-content-between pt-5">
                     <div className="field d-flex align-items-center">
                        <input type="number" className="input-min" value={priceValue[0]} onChange={() => handlePriceChange} />
                     </div>
                     <div className="divider-line"></div>
                     <div className="field d-flex align-items-center">
                        <input type="number" className="input-max" value={priceValue[1]} onChange={() => handlePriceChange} />
                     </div>
                     <div className="currency ps-1">MXN</div>
                  </div>
               </div>
               <PriceRange
                  MAX={maxPrice}
                  MIN={0}
                  STEP={1}
                  values={priceValue}
                  handleChanges={handlePriceChange}
               />
            </div>

            <div className="col-12">
               <h6 className="block-title fw-bold mt-45 mb-20">m²</h6>
               <div className="d-flex align-items-center sqf-ranger">
                  <input type="text" placeholder={labels.min} />
                  <div className="divider"></div>
                  <input type="text" placeholder={labels.max} />
               </div>
            </div>
            <div className="col-12">
               <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
                  <i className="fa-light fa-magnifying-glass"></i>
                  <span>{labels.search}</span>
               </button>
            </div>

            <div className="col-12">
               <div className="d-flex justify-content-between form-widget">
                  <a onClick={handleResetFilter} style={{ cursor: "pointer" }} className="tran3s">
                     <i className="fa-regular fa-arrows-rotate"></i>
                     <span>{labels.reset}</span>
                  </a>
                  <Link href="#" className="tran3s">
                     <i className="fa-regular fa-star"></i>
                     <span>{labels.save}</span>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   )
}

export default DropdownOne
