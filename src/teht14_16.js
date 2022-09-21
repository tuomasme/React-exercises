import { useState } from "react"

/* 

14. Tee React-komponentti <Professional>, jossa käyttäjä voi valita alasvetovalikosta ammatin. Komponentti saa props:na VAIN ammatit ("ammatit") taulukossa 
niin että jokainen ammatti on JS-objekti, jolla on kentät koodi ja selite (laita koodi option-elementin value-attribuutiksi ja selite näkyviin käyttäjälle). 
Käyttäjä voi lisäksi syöttää nimen (input type=text, laita jokaiselle input-kentälle label, jossa on teksti Nimi/Ammatti). Kun käyttäjä painaa Insert-nappia, 
lisätään tiedot table-elementtiin niin että elementissä on sarakkeet nimi ja koodi. Table-elementin renderöinti täytyy toteuttaa komponentissa <Table>, se saa 
props:na ("data") taulukollisen JS-objekteja, joilla on kentät nimi ja koodi (valitun ammatin koodi). Tee tätä tehtävää varten komponentti <Teht14>, joka antaa 
<Professional>-komponentille tarvittavat props:t. <Professional>-komponentti sisältää siis kaiken logiikan (ja input-kentät sekä select-elementin jne) ja käyttää 
hyväksi <Table>-komponenttia.

15. Muuta tehtävää 14: käyttäjä voi valita checkbox:sta onko hänellä tutkinto suoritettu (laita checkbox:lle Label-komponentin avulla label "Tutkinto suoritettu:"). 
Lisää JS-objektiin kenttä tutkinto_suoritettu, jossa 0=ei tutkintoa, 1=tutkinto suoritettu. Näytä <Table>-komponentin avulla tämä uusi sarake (tutkinto) niin että 
sarakkeeseen tulostuu "Tutkinto suoritettu" tai "Ei tutkintoa".

16. Muuta edellistä tehtävää: jos käyttäjä valitsee "Tutkinto suoritettu" (label-elementti "Tutkinto:") (checkbox siis valittu), tulee näkyviin uusi input-kenttä, 
johon käyttäjä voi syöttää tutkinnon nimen. Tutkinnon nimi täytyy lisätä myös taulukkoon (ja JS-objektiin, kentän nimi on tutkinto).

*/

const Teht14 = () => {
    const [ammatit, setAmmatit] = useState([{koodi: "programmer", selite: "ohjelmoija"}, {koodi: "welder", selite: "hitsari"}]);

    return(
        <div>
            <Professional ammatit={ammatit}/>
        </div>
    )
}

const Professional = (props) => {
    const [nimi, setNimi] = useState('');

    const ammatit = props.ammatit | [];
    
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Ammatti<select><option></option></select></label><br/>
                <label>Nimi
                <input type="text" name="nimi" value={nimi} onChange={(e) => setNimi(e.target.value)}/></label>
                <button>Insert</button>
            </form>
            <Table/>
            </div>
  )  
}

const Table = (props) => {
    
    return(
        <table><thead><tr><th>nimi</th><th>koodi</th></tr></thead><tbody></tbody></table>
    )
}

export {Professional, Table, Teht14}