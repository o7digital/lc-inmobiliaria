import NiceSelect from "@/ui/NiceSelect"
import PriceRange from "../../common/PriceRange";
import Link from "next/link";

const ammenities_data: string[] = ["A/C y Calefacción", "Garajes", "Jardín", "Acceso para discapacitados", "Alberca", "Estacionamiento", "Wifi", "Pet Friendly", "Altura de techo", "Chimenea", "Área de juegos", "Elevador"]

const DropdownOne = ({
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

   return (
      <form onSubmit={(e) => e.preventDefault()}>
         <div className="row gx-lg-5">
            <div className="col-12">
               <div className="input-box-one mb-35">
                  <div className="label">Estoy buscando...</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={[
                        { value: "comprar-departamentos", text: "Comprar Departamentos" },
                        { value: "rentar-departamentos", text: "Rentar Departamentos" },
                        { value: "comprar-casas", text: "Comprar Casas" },
                        { value: "rentar-casas", text: "Rentar Casas" },
                        { value: "comprar-oficinas", text: "Comprar Oficinas" },
                        { value: "rentar-oficinas", text: "Rentar Oficinas" },
                        { value: "comprar-terrenos", text: "Comprar Terrenos" },
                        { value: "vender-terrenos", text: "Vender Terrenos" },
                     ]}
                     defaultCurrent={0}
                     onChange={handleStatusChange}
                     name=""
                     placeholder="" />
               </div>
            </div>
            
            <div className="col-12">
               <div className="input-box-one mb-35">
                  <div className="label">Palabra clave</div>
                  <input onChange={handleSearchChange} type="text" placeholder="comprar, casa, loft, departamento"
                     className="type-input" />
               </div>
            </div>

            <div className="col-12">
               <div className="input-box-one mb-50">
                  <div className="label">Ubicación</div>
                  <NiceSelect className="nice-select location fw-normal"
                     options={[
                        { value: "Ciudad de México", text: "Ciudad de México" },
                        { value: "Estado de México", text: "Estado de México" },
                        { value: "Guadalajara, Jalisco", text: "Guadalajara, Jalisco" },
                        { value: "Monterrey, Nuevo León", text: "Monterrey, Nuevo León" },
                        { value: "Puebla, Puebla", text: "Puebla, Puebla" },
                        { value: "Querétaro, Querétaro", text: "Querétaro, Querétaro" },
                        { value: "Mérida, Yucatán", text: "Mérida, Yucatán" },
                        { value: "Cancún, Quintana Roo", text: "Cancún, Quintana Roo" },
                        { value: "Tijuana, Baja California", text: "Tijuana, Baja California" },
                        { value: "León, Guanajuato", text: "León, Guanajuato" },
                        { value: "Toluca, Estado de México", text: "Toluca, Estado de México" },
                        { value: "Playa del Carmen, Quintana Roo", text: "Playa del Carmen, Quintana Roo" },
                        { value: "Los Cabos, B.C.S.", text: "Los Cabos, B.C.S." },
                        { value: "Oaxaca, Oaxaca", text: "Oaxaca, Oaxaca" },
                        { value: "Veracruz, Veracruz", text: "Veracruz, Veracruz" },
                        { value: "Chihuahua, Chihuahua", text: "Chihuahua, Chihuahua" },
                        { value: "Hermosillo, Sonora", text: "Hermosillo, Sonora" },
                        { value: "Culiacán, Sinaloa", text: "Culiacán, Sinaloa" },
                        { value: "Tuxtla Gutiérrez, Chiapas", text: "Tuxtla Gutiérrez, Chiapas" },
                        { value: "San Luis Potosí, SLP", text: "San Luis Potosí, SLP" },
                        { value: "Morelia, Michoacán", text: "Morelia, Michoacán" },
                        { value: "Aguascalientes, Ags.", text: "Aguascalientes, Ags." },
                        { value: "Zacatecas, Zac.", text: "Zacatecas, Zac." },
                        { value: "Saltillo, Coahuila", text: "Saltillo, Coahuila" },
                        { value: "Torreón, Coahuila", text: "Torreón, Coahuila" },
                        { value: "Villahermosa, Tabasco", text: "Villahermosa, Tabasco" },
                        { value: "Tampico, Tamaulipas", text: "Tampico, Tamaulipas" },
                        { value: "La Paz, B.C.S.", text: "La Paz, B.C.S." },
                     ]}
                     defaultCurrent={0}
                     onChange={handleLocationChange}
                     name=""
                     placeholder="" />
               </div>
            </div>

            <div className="col-sm-6">
               <div className="input-box-one mb-40">
                  <div className="label">Recámaras</div>
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
                  <div className="label">Baños</div>
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
               <h6 className="block-title fw-bold mb-30">Amenidades</h6>
               <ul
                  className="style-none d-flex flex-wrap justify-content-between filter-input">
                  {ammenities_data.map((list, i) => (
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
               <h6 className="block-title fw-bold mt-25 mb-15">Rango de precio</h6>
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
                     <div className="currency ps-1">USD</div>
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
                  <input type="text" placeholder="Mín" />
                  <div className="divider"></div>
                  <input type="text" placeholder="Máx" />
               </div>
            </div>
            <div className="col-12">
               <button className="fw-500 text-uppercase tran3s apply-search w-100 mt-40 mb-25">
                  <i className="fa-light fa-magnifying-glass"></i>
                  <span>Buscar</span>
               </button>
            </div>

            <div className="col-12">
               <div className="d-flex justify-content-between form-widget">
                  <a onClick={handleResetFilter} style={{ cursor: "pointer" }} className="tran3s">
                     <i className="fa-regular fa-arrows-rotate"></i>
                     <span>Reiniciar filtros</span>
                  </a>
                  <Link href="#" className="tran3s">
                     <i className="fa-regular fa-star"></i>
                     <span>Guardar búsqueda</span>
                  </Link>
               </div>
            </div>
         </div>
      </form>
   )
}

export default DropdownOne
