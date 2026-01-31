import NiceSelect from "@/ui/NiceSelect";

const DropdownOne = ({ style }: any) => {

   const selectHandler = (e: any) => { };

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
                        { value: "comprar-departamentos", text: "Comprar departamentos" },
                        { value: "rentar-departamentos", text: "Rentar departamentos" },
                        { value: "vender-casas", text: "Vender casas" },
                        { value: "rentar-oficinas", text: "Rentar oficinas" },
                        { value: "vender-terrenos", text: "Vender terrenos" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className={`${style ? "col-xl-3" : "col-xl-4"} col-lg-4`}>
               <div className="input-box-one border-left">
                  <div className="label">Ubicación</div>
                  <NiceSelect className={`nice-select location ${style ? "fw-normal" : ""}`}
                     options={[
                        { value: "cdmx", text: "Ciudad de México" },
                        { value: "edomex", text: "Estado de México" },
                        { value: "guadalajara", text: "Guadalajara, Jalisco" },
                        { value: "monterrey", text: "Monterrey, Nuevo León" },
                        { value: "puebla", text: "Puebla, Puebla" },
                        { value: "queretaro", text: "Querétaro, Querétaro" },
                        { value: "merida", text: "Mérida, Yucatán" },
                        { value: "cancun", text: "Cancún, Quintana Roo" },
                        { value: "tijuana", text: "Tijuana, Baja California" },
                        { value: "leon", text: "León, Guanajuato" },
                        { value: "toluca", text: "Toluca, Estado de México" },
                        { value: "playa", text: "Playa del Carmen, Quintana Roo" },
                        { value: "cabos", text: "Los Cabos, B.C.S." },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
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
                     onChange={selectHandler}
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
