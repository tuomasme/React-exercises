import React, { useState, useEffect } from 'react';
import {Link, NavLink, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, Navigate} from 'react-router-dom';

/* 

27. Tee SPA (Single Page Application) komponentti (<Spa>), jossa on menu (koko ajan näkyvissä): Koti ja Autot. Em. menuvaihtoehdot näkyvät siis linkkeinä. 
Kun käyttäjä klikkaa Koti-linkkiä, näytä <Koti> komponentti, joka renderoi tekstin "Savonia AMK" (p-elementissä). Tee lisäksi <Aika>-komponentti, joka renderöi vain 
(p-elementissä) kuluvan päivän ja tiedon onko nyt aamu- vai iltapäivä muodossa "23.02.2021 aamupäivä" (iltapäivä on klo 14-06, aamupäivä 06-14) ja käytä tätä 
<Aika>-komponenttia <Koti>-komponentissa

28. Lisää edelliseen tehtävään: käyttäjä klikkaa Autot-linkkiä, jolloin renderoidaan <Autot>-komponentti. Komponentissa näytetään tietoja autoista ol-elementissä 
siten että jokainen li-elementti on LINKKI, jonka teksti on muotoa "Opel, Astra" (autojen tiedot haetaan REST-palvelusta, käytä db_autot.json-tiedostoa, joka löytyy 
serveriltä). Tee REST-kutsu <Autot>-komponentissa ts. komponentille EI mene mitään props:ja.

29. Lisää edelliseen tehtävään: käyttäjä ei pääse Autot-sivulle jos hän ei ole ensin rekisteröitynyt. Eli jos käyttäjä yrittää navigoida Autot-sivulle mutta ei ole 
vielä rekisteröitynyt, näytä hänelle ensin Kirjautumis-sivu (<Kirjaudu>-komponentti). Käyttäjä antaa <Kirjaudu>-komponentissa etunimen ja henkilönumeron input-kentissä 
(label:t Etunimi ja Henkilönumero, riittää tarkistaa että molemmat tiedot on annettu), jonka jälkeen käyttäjä ohjataan automatic Autot-sivulle. Rekisteröityneen käyttäjän 
tiedot näkyvät menun alapuolella h3-elementissä muodossa "Maija,1234".

30. Muuta edellistä SPA-tehtävää niin että menu on ylälaidassa vaakatasossa ja linkeissä ei näy alleviivausta (ja linkit näkyvät isompana laatikkona, ks alla About menua 
ollaan juuri klikkaamassa). Alla oleva kuvassa EI siis ole oikeat menut, se on vain esimerkin vuoksi, jotta ymmärrät mitä pitää tehdä. Tässä tehtävässä täytyy tyylit 
tehdä RIVINSISÄISINÄ tyyleinä ts. laita tyylit käyttäen style-attribuuttia. Tyylinä pitää käyttää AINAKIN font-size:20px ja height:100px sekä jotain joka poistaa 
alleviivaukset! MUTTA hover:ia EI voi laittaa rivinsisäisenä tyylinä, joten tee sille tyylimäärittely "minne haluat".

31. Lisää edelliseen SPA-tehtävään: jos käyttäjä yrittää laittaa selaimen osoiteriville sellaista osoitetta, jota ei löydy (siis localhost:3000/ jälkeen), ohjaa käyttäjä 
virhesivulle (<Error>), jossa on teksti h4-elementissä "Yritit navigoida sivulle: se_virheellinen_sivu" ja nappi, josta pääsee Koti-sivulle (napissa on teksti "Koti-sivulle").

32. Lisää tehtävään 28:  Autot-sivulla näytetään autot siten että kukin auto on linkki (linkissä on auton merkki ja malli). Kun käyttäjä klikkaa ko. linkkiä, näytetään 
ko. auton tiedot uudella sivulla Details, jossa näkyy vain valitun auton tiedot h6-elementissä muodossa "Astra:Opel" (data-testid="details"). HUOM! Tässä EI saa enää 
tehdä uutta hakua Details-komponentissa, kaikki tarvittavat data tulee jo linkissä.

*/

const Spa = () => {
    const [user, setUser] = useState(null);

    const loginDone = (loggedUser) => { setUser(loggedUser); }
    
    return(
        <div>
            <NavLink to="/" style={{ textDecoration: 'none', fontSize: '20px', height: '100px'}}>Koti</NavLink>
            <NavLink to="/autot" style={{ textDecoration: 'none', fontSize: '20px', height: '100px'}}>Autot</NavLink>
            {
                user ?
                    <p><h3>{user} </h3></p> : null
            }
            <Routes>
                <Route path="/" element={<Koti/>}/>
                <Route path="/autot" element=
                {   user ?
                    <Autot /> : <Kirjaudu onLogin={(user) => loginDone(user)}/>
                }/>
                <Route path="*" element={<Error/>} />
            </Routes>
            </div>
    )
    
}

const Koti = () => (
    <div>
        <p>Savonia AMK</p>     
        <Aika/>
    </div>
)



const Aika = () => {
    let d = new Date();
    let tunnit = d.getHours();
    let aikateksti = '';
    if (tunnit > 6 && tunnit < 14)
        aikateksti = 'aamupäivä';
    else
        aikateksti = 'iltapäivä';
    let pvm = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
    
    return <p>{pvm} {aikateksti}</p>;
}

const Autot = (props) => {
    const [autot, setAutot] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            let response = await fetch("http://localhost:3004/autot");
            setAutot(await response.json());
        }
        fetchData();
    }, []);

    let autolista = [] || props.autot.map((s, i) => {
        return <li><a key={i} href="#">{s.Merkki}, {s.Malli}</a></li>
    });
    return (
        <div >
            <ol>{autolista}</ol>
        </div >
    )
}

const Kirjaudu = (props) => {
    const [etunimi, setEtunimi] = useState('');
    const [hlonro, setHlonro] = useState('');
    let navigate = useNavigate();

    const tarkistaTiedot = (event) => {
        if(etunimi.length > 0 && hlonro.length > 0){
            props.onLogin(etunimi + "," + hlonro);
            navigate("/autot");
        }
        else
            alert("Syötetyt tiedot ovat puutteelliset")
    }

    return <div>
        <label>Etunimi<input type="text" onChange={(e) => setEtunimi(e.target.value)} /></label>
        <label>Henkilönumero<input type="text" onChange={(e) => setHlonro(e.target.value)}/></label>
        <button onClick={(e) => tarkistaTiedot(e)}>Kirjaudu</button>
    </div>
}

const Error = () => {
    let location = useLocation();
    let navigate = useNavigate();

    const kotisivulle = (event) => {
        navigate("/");
    }

    return (
    <div>
        <h4>Yritit navigoida sivulle: {location.pathname} </h4>
        <button onClick={(e) => kotisivulle(e)}>Koti-sivulle</button>
    </div>
    )}

export {Spa, Koti, Aika, Autot, Kirjaudu, Error}