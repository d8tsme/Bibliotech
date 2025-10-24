import './CardView.css';
import React, {useEffect, useState} from 'react';
import dadosMock from './dadosMockados/Mock';

function CardView() {
    const [dados, setDados] = useState([dadosMock]);
//     useEffect (() => {
//         fetch('API')
//         .then((response) => response.json())
//         .then(data => setDados(data))
//         .catch (error => {
//             console.error('Erro ao buscar dados:', error);
//             setError(true);
//         });
//     }, []);

// if (error) {
//     return (
//     <div className="cardViewError">
//         <h1>Erro</h1>
//         <img src='' alt='erro'/>
//     </div>
//     );
// }

return (
    <div className="card-container">
      {dados.map(item => (
        <div
          key={item.id}
          className="card"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="card-info">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardView;