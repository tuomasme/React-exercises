import { useState } from "react";

/* 

11. Tee React-komponetti (<ListForm>), jossa käyttäjä voi syöttää nimen, osoitteen ja syntymävuoden (input type=text elementin avulla, laita 
jokaiselle input-kentälle label, jossa on teksti Nimi/Osoite/Syntymävuosi). Kun käyttäjä painaa Add-nappia (button), lisätään tiedot nappien 
alla olevaan ul-elementtiin niin että tiedot näkyvät li-elementissä muodossa "Maija,Opistotie,1990". Tyhjennä myös syöttö-kentät Add-napin painamisen jälkeen.

12. Lisää tehtävään 11: tarkista että käyttäjä syöttänyt vähintään 4 merkkiä jokaiseen kenttään (jos syötteissä on virheitä, ei tietoja saa lisätä ul-elementtiin). 
Jos merkkejä on vähemmän, näytetään käyttäjälle <p>-elementissä virheteksti muodossa "Virheelliset kentät: nimi,osoite,vuosi" (jos virheitä ei ole, ei näytetä mitään
ja näytä vain se kenttä, jossa virhe oli). Virheiden näyttäminen pitää toteuttaa komponentin <Error> avulla. <Error>-komponentti saa props:na tiedon syötetyistä kentistä 
(props:t ovat nimi, osoite, vuosi), joten tämän komponentin täytyy sisältää logiikka näytetäänkö p-elementtiä (jossa on siis virheteksti) vai ei. Virheiden tarkistaminen 
riittää edelleenkin tehdä vasta kun käyttäjä klikkaa Add-nappia. HUOM! Tehtävässä harjoitellaan miten voidaan tarkistuslogiikkaa tehdä "joustavasti" kahteen paikkaan, 
Add-napin painamisen jälkeen (tietoja ei saa lisätä ul-elementtiin) JA <Error>-komponentissa, jossa muodostetaan virheviesti syötettyjen tietojen perusteella.

13. Lisää tehtävään 11: tarkista ettei nimeä ole jo syötetty aiemmin. Jos nimi löytyy jo, näytä punaisella värillä virheteksti "Nimi Liisa on jo syötetty". 
Virheviestin näyttäminen pitää tehdä komponentin <ErrorMessage> avulla, komponentille välitetään vain virheviesti props:na ("message"). Kun käyttäjä muuttaa nimeä ja 
painaa uudelleen Add-nappia, häviää virheteksti.

*/

const ListForm = () => {
    const [nimi, setNimi] = useState('');
    const [osoite, setOsoite] = useState('');
    const [vuosi, setVuosi] = useState('');
    const [henkilot, setHenkilot] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const lisaaHenkilo = () => {
        let data = henkilot;
        if (!onkoListassa(henkilot, nimi)) {
            data.push({nimi: nimi, osoite: osoite, vuosi: vuosi});
            setHenkilot(data);
        }
        setNimi('');
        setOsoite('');
        setVuosi('');
    }

    function onkoListassa(henkiloLista, nimi) {
        return henkiloLista.some(function (x) {
            if(nimi === x.nimi){
                setMessage("Nimi " + {nimi} + " on jo syötetty!");
            }
          return nimi === x.nimi;
        });
      }

    const henkiloLista = henkilot.map((x, i) => {
        return <li key={i}>{x.nimi},{x.osoite},{x.vuosi}</li>
    });

    return(
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            
            <label>Nimi
            <input type="text" name="nimi" value={nimi} onChange={(e) => setNimi(e.target.value)}/></label>
            
            
            <label>Osoite
            <input type="text" name="osoite" value={osoite} onChange={(e) => setOsoite(e.target.value)}/></label>
            
            
            <label>vuosi
            <input type="text" name="syntymavuosi" value={vuosi} onChange={(e) => setVuosi(e.target.value)}/></label>
            
            
            <button onClick={() => lisaaHenkilo()}>Add</button>
            
            <ul>{henkiloLista}</ul>
            <Error nimi ={nimi} osoite={osoite} vuosi={vuosi}/>
            <ErrorMessage message={message}/>
        </form>
        
        </div>
    )
}

const Error = (props) => {
    
    const nimi = props.nimi;
    const osoite = props.osoite;
    const vuosi = props.vuosi;
    
    return(
        <div>       
            {(() => {
            if (nimi.length < 4 && osoite.length < 4 && vuosi.length < 4) {
              return (
                <p>Virheelliset kentät: nimi,osoite,vuosi</p>
              )
            }else if (nimi.length < 4 && osoite.length < 4 && vuosi.length >= 4) {
              return (
                <p>Virheelliset kentät: nimi,osoite</p>
              )
            }else if (nimi.length < 4 && osoite.length >= 4 && vuosi.length >= 4) {
                return (
                  <p>Virheelliset kentät: nimi</p>
                )
            }else if (nimi.length >= 4 && osoite.length < 4 && vuosi.length < 4) {
                return (
                  <p>Virheelliset kentät: osoite,vuosi</p>
                )
            }else if (nimi.length < 4 && osoite.length >= 4 && vuosi.length < 4) {
                return (
                  <p>Virheelliset kentät: nimi,vuosi</p>
                )
            }else if (nimi.length >= 4 && osoite.length < 4 && vuosi.length >= 4) {
                return (
                  <p>Virheelliset kentät: osoite</p>
                )
            }else if (nimi.length >= 4 && osoite.length >= 4 && vuosi.length < 4) {
                return (
                  <p>Virheelliset kentät: vuosi</p>
                )
            }else {
              return (
                <div></div>
              )
            }
          })()}
        </div>
    )
}

const ErrorMessage = (props) => {
    const message = props.message;
    return(<div>
        <p style={{color: "red"}}>{message}</p>
    </div>)
}


export {ListForm, Error, ErrorMessage}