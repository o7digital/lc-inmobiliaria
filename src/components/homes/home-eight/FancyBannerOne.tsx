const FancyBannerOne = () => {
   return (
      <div className="fancy-banner-nine mt-110 lg-mt-80">
         <div className="container container-large">
            <div className="row align-items-center">
               <div className="col-lg-4">
                  <div className="d-flex align-items-center md-mb-30">
                     <img
                        src="/assets/images/agent/lourdes.jpeg"
                        alt="Lourdes Cazares"
                        className="rounded-circle avatar flex-shrink-0"
                        style={{ width: 100, height: 100, border: "2px solid #e0e0e0", objectFit: "cover", objectPosition: "center" }}
                        aria-hidden="true"
                     />
                     <div className="ps-3 text">
                        <h6 className="fs-22">Lourdes Cazares</h6>
                        <span className="fs-20">Fundadora y CEO de LC Inmobiliaria</span>
                     </div>
                  </div>
               </div>
               <div className="col-xxl-7 col-lg-8">
                  <blockquote>&quot;Seguimos un proceso para ofrecer a nuestros inversionistas las mejores oportunidades.&quot;</blockquote>
               </div>
            </div>

            <div className="mt-60 md-mt-40">
               <h3 className="text-center mb-50 lg-mb-30" style={{fontWeight: 600, fontSize: '2rem'}}>
                  ¿Por qué elegir LC Inmobiliaria?
               </h3>
               <div className="row g-4">
                  <div className="col-lg-4 col-md-6">
                     <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease'}}>
                        <div className="d-flex justify-content-center mb-3">
                           <div style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}>
                              <i className="bi bi-award" style={{fontSize: '32px', color: 'white'}}></i>
                           </div>
                        </div>
                        <h5 className="mb-3" style={{fontWeight: 600, fontSize: '1.25rem'}}>Experiencia</h5>
                        <p style={{color: '#6c757d', lineHeight: '1.6', fontSize: '15px'}}>
                           Más de 10 años en el mercado inmobiliario, conocemos cada detalle del sector y te ofrecemos la mejor asesoría.
                        </p>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease'}}>
                        <div className="d-flex justify-content-center mb-3">
                           <div style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}>
                              <i className="bi bi-person-check" style={{fontSize: '32px', color: 'white'}}></i>
                           </div>
                        </div>
                        <h5 className="mb-3" style={{fontWeight: 600, fontSize: '1.25rem'}}>Asesoría Personalizada</h5>
                        <p style={{color: '#6c757d', lineHeight: '1.6', fontSize: '15px'}}>
                           Te acompañamos en cada paso desde la búsqueda hasta la firma, con atención personalizada.
                        </p>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="card h-100 border-0 shadow-sm p-4 text-center" style={{borderRadius: '15px', transition: 'transform 0.3s ease, box-shadow 0.3s ease'}}>
                        <div className="d-flex justify-content-center mb-3">
                           <div style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}>
                              <i className="bi bi-geo-alt" style={{fontSize: '32px', color: 'white'}}></i>
                           </div>
                        </div>
                        <h5 className="mb-3" style={{fontWeight: 600, fontSize: '1.25rem'}}>Amplia Cobertura</h5>
                        <p style={{color: '#6c757d', lineHeight: '1.6', fontSize: '15px'}}>
                           Presencia en las principales zonas metropolitanas con el mejor portafolio de propiedades disponibles.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBannerOne
