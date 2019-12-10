import React from "react";

const NotFound = () => {

  return (
    <div className="main">
      <h1>Ops!</h1>
      <p>Página não encontrada</p>
      <a href='./' data-test="voltar"><i className="fas fa-arrow-left"></i> Voltar para Home</a>
    </div>
  )
}

export default NotFound
