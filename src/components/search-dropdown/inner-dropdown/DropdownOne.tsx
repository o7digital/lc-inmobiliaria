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
                        { value: "apartments", text: "Comprar departamentos" },
                        { value: "condos", text: "Rentar condos" },
                        { value: "houses", text: "Vender casas" },
                        { value: "industrial", text: "Rentar industrial" },
                        { value: "villas", text: "Vender villas" },
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
                        { value: "washington", text: "Washington DC" },
                        { value: "mexico", text: "Acapulco, Mexico" },
                        { value: "germany", text: "Berlin, Germany" },
                        { value: "france", text: "Cannes, France" },
                        { value: "india", text: "Delhi, India" },
                        { value: "giza", text: "Giza, Egypt" },
                        { value: "cuba", text: "Havana, Cuba" },
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
