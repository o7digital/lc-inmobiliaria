import NiceSelect from "@/ui/NiceSelect"
import PriceRange from "../../common/PriceRange";
import Link from "next/link";

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
   const isEnglish = locale === "en";
   const amenities = isEnglish ? ammenities_en : ammenities_es;
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
      <form onSubmit={(e) => e.preventDefault()}>
         <div className="row gx-lg-5">
            <div className="col-12">
               <div className="input-box-one mb-35">
                  <div className="label">{isEnglish ? "I'm looking for..." : "Estoy buscando..."}</div>
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
                  <div className="label">{isEnglish ? "Keyword" : "Palabra clave"}</div>
                  <input
                     onChange={handleSearchChange}
                     type="text"
                     placeholder={isEnglish ? "buy, home, loft, apartment" : "comprar, casa, loft, departamento"}
                     className="type-input"
                  />
               </div>
            </div>

            <div className="col-12">
               <div className="input-box-one mb-50">
                  <div className="label">{isEnglish ? "Location" : "Ubicación"}</div>
                  <NiceSelect className="nice-select location fw-normal"
                     options={[
                        { value: "", text: isEnglish ? "All locations" : "Todas las ubicaciones" },
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
                  <div className="label">{isEnglish ? "Bedrooms" : "Recámaras"}</div>
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
                  <div className="label">{isEnglish ? "Bathrooms" : "Baños"}</div>
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
               <h6 className="block-title fw-bold mb-30">{isEnglish ? "Amenities" : "Amenidades"}</h6>
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
               <h6 className="block-title fw-bold mt-25 mb-15">{isEnglish ? "Price range" : "Rango de precio"}</h6>
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
                  <input type="text" placeholder={isEnglish ? "Min" : "Mín"} />
                  <div className="divider"></div>
                  <input type="text" placeholder={isEnglish ? "Max" : "Máx"} />
               </div>
            </div>
            <div className="col-12">
               <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
                  <i className="fa-light fa-magnifying-glass"></i>
                  <span>{isEnglish ? "Search" : "Buscar"}</span>
               </button>
            </div>

            <div className="col-12">
               <div className="d-flex justify-content-between form-widget">
                  <a onClick={handleResetFilter} style={{ cursor: "pointer" }} className="tran3s">
                     <i className="fa-regular fa-arrows-rotate"></i>
                     <span>{isEnglish ? "Reset filters" : "Reiniciar filtros"}</span>
                  </a>
                  <Link href="#" className="tran3s">
                     <i className="fa-regular fa-star"></i>
                     <span>{isEnglish ? "Save search" : "Guardar búsqueda"}</span>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   )
}

export default DropdownOne
