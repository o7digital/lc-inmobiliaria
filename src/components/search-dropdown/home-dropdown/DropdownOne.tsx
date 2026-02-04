import NiceSelect from "@/ui/NiceSelect";

const DropdownOne = ({ style }: any) => {

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
      window.location.href = '/listing_05';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">Estoy buscando...</div>
                  <NiceSelect className={`nice-select ${style ? "fw-normal" : ""}`}
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
                     onChange={selectTypeHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
               <div className="input-box-one border-left">
                  <div className="label">Ubicación</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
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
                     onChange={selectLocationHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left border-lg-0">
                  <div className="label">Rango de precio</div>
                  <NiceSelect
                     className={`nice-select ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "1", text: "$10,000 - $200,000" },
                        { value: "2", text: "$20,000 - $300,000" },
                        { value: "3", text: "$30,000 - $400,000" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectLocationHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-2"}`}>
               <div className="input-box-one lg-mt-10">
                  <button className={`fw-500 tran3s ${style ? "w-100 tran3s search-btn-three" : "text-uppercase search-btn"}`}>{style ? "Buscar ahora" : "Buscar"}</button>
              </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
