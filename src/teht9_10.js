import { useState} from 'react';

/* 

9. Tee React komponentti (<Cars>), jossa käyttäjä voi syöttää automerkkejä input-kenttään (type=text). Kun käyttäjä painaa Save-nappia (button), 
lisätään tiedot nappien alla olevaan ul-elementtiin niin että tiedot näkyvät li-elementissä (näytä syötetty tieto sellaisenaan, esimerkiksi "Volvo"). 
Tyhjennä syöttökentän (input) arvo Save-napin painamisen jälkeen.

10. Lisää edelliseen tehtävään: kun käyttäjä on syöttänyt vähintään 5 nimeä, näkyy h2-elementissä teksti "Ainakin 5 nimeä on jo syötetty". 
Tee tätä varten uusi komponentti (<Info>), joka renderöi em. tekstin. <Info>-komponentille välitetään props:n "count" avulla lukumäärä.

*/

const Cars = () => {
    const [autot, setAutot] = useState([]);
    const [auto, setAuto] = useState('');

    const buttonClicked = () => {
        let data = autot;
        if(auto.length > 0){
            data.push(auto);
            setAutot(data);
            setAuto('');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const autoLista = autot.map((n, index) => {
        return <li key={index}>{n}</li>
    })

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Info count={autot}/>
                <label>Syötä automerkki
                <input type="text" name="auto" value={auto} onChange={(e) => setAuto(e.target.value)}/></label>
                <button onClick={(e) => buttonClicked(e)}>Save</button>
                <ul>{autoLista}</ul>
                
            </form>
        </div>
    )
}

const Info = (props) => {
    
    const count = props.count.map((x, i) => {
        return <li key={i}>{x}</li>
    });
    
    return(
        <div> {count.length > 4 ?
            <h2>Ainakin 5 nimeä on jo syötetty</h2>
            : null}
        </div>
    )
}

export {Cars, Info};