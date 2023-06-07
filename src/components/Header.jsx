
const Header = ({ proyectos }) => {
  return (
    <>
       { proyectos && proyectos.length ? (
        <h1 className="text-center font-black text-5xl md:w-2/3 mx-auto pb-5">
           A DARLE!!
        </h1>
       ) : (
        <h1 className="text-center font-black text-5xl md:w-2/3 mx-auto pb-5">
            ¿LISTO?
        </h1>
       )}
        
        <h2 className="text-center text-4xl md:w-2/3 mx-auto">
            ¡Comienza a cumplir Metas!
        </h2>
      </>
  )
}

export default Header
