import { useState, useEffect } from "react";

/* 

18. Tee React komponentti (<Asiakas>), jonka avulla voidaan hakea asiakkaita (käyttäen yo:n mukaista REST-rajapintaa). Sovelluksessa on hakuehtokentät (input type=text)
nimelle (data-testid="nameInput") ja osoitteelle (data-testid="addressInput"). Kun käyttäjä painaa Hae-nappia (data-testid="searchButton"), haetaan hakuehtojen mukainen
data REST-api:sta. Käyttäjä voi antaa minkä tahansa hakuehtojen kombinaation (tai jättää ne kokonaan antamatta). Haettu data näytetään HTML:n table-elementissä (näytä 
kentät järjestyksessä: Id, Nimi, Osoite, Postinumero, Postitoimipaikka, Puhelinnumero, Tyyppi_id, Tyyppi_selite, Poista, Muokkaa). HUOM! HTML table-elementin otsikot 
(siis thead-elementin alla olevat tr-elementit) EIVÄT saa olla näkyvissä ENNEN kuin käyttäjä painaa Hae-nappia (tätä ominaisuutta tarvitset erityisesti tehtävissä 20
eteenpäin). Ja vielä tarkemmin: table-elementti saa olla näkyvissä VASTA kun data on haettu REST-rajapinnasta ts. laita table näkyviin siinä useEffect:ssä, jossa data 
haetaan ja vasta kun REST-kutsu on tehty!

19. Lisää edelliseen tehtävään hakuehdoksi asiakastyyppi. Hae asiakastyypit alasvetovalikkoon 
(select -> data-testid="customertypeSelect", option -> data-testid="customertypeOption") kun sovellus käynnistyy ilman että käyttäjän tarvitsee tehdä mitään.

20. Lisää edelliseen tehtävään: kun tietoa haetaan REST-api:sta, näkyy käyttäjälle VAIN teksti "Loading..."  (p-elementti, data-testid="loading") 
HTML table:n tilalla (ei siis piiloteta hakuehto-kenttiä ja nappeja jne). Kun REST-api palauttaa tiedon, piilotetaan em. Loading-teksti ja näytetään käyttäjälle haettu
data. Tätä varten laita REST-api:iin "viivettä" pari sekuntia (--delay parametrilla).

21. Lisää edelliseen tehtävään: jos annetuilla hakuehdoilla ei löydy dataa, näytetään käyttäjälle HTML table:n tilalla teksti "Annetuilla hakuehdoilla ei löytynyt dataa" 
(p-elementti, data-testid="notFound").

22. Muuta edellistä tehtävää: "Annetuilla hakuehdoilla ei löytynyt dataa" teksti on näkyvissä vain 2s ajan, sen jälkeen teksti häviää pois.

23. Lisää edelliseen tehtävään: käyttäjä voi poistaa valitun asiakkaan. Toteuta tämä niin, että jokaisella rivillä on Poista-nappi (data-testid="deleteButton"), 
jota painamalla data poistetaan kutsumalla REST-api:a. Poistamisen jälkeen asiakas häviää käyttöliittymästä kun haet datan uudelleen REST-api:n kautta. 
Nimeä Poista-napit niin että nimi on muotoa "Poista id", jossa id on asiakkaan id-kentän arvo (esim. Poista 2).

24. Lisää edelliseen tehtävään varmistus "Haluatko varmasti poistaa asiakkaan X?". Käytä varmistuksen näyttämiseen confirm-funktiota. X:n tilalla täytyy olla poistettavan
asiakkaan nimi.

25. Lisää <Asiakas>-komponenttiin: käyttäjä voi myös lisätä uuden asiakkaan. Toteuta tämä niin, että sovelluksessa on nappi "Lisää uusi" (data-testid="addButton"), 
joka piilottaa kaikki muut napit (ja ja editointi- ja haku-kentät) ja näyttää form:n jolla voi lisätä uuden asiakkaan. Form:lla on seuraavat kentät 
(input type=text): nimi (data-testid="nameEdit"), osoite (data-testid="addressEdit"), puhelin (data-testid="phoneEdit"), lisäksi form:lla on alasvetovalikko 
asiakastyypille (data-testid="customertypeSelectEdit") ja napit Peruuta (data-testid="cancelButton") ja Tallenna (data-testid="saveButton"). Käytä uuden asiakkaan luomiseen
REST-rajapintaa. Hae asiakkaat uudelleen onnistuneen lisäämisen jälkeen jolloin lisätty asiakas näkyy näytöllä (jos hakuehdot olivat "sopivat" ts. haku tehdään niillä 
hakuehdoilla, jotka olivat olemassa ENNEN lisäyksen aloittamista).

26. Lisää aiemmin tekemääsi <Asiakas>-komponenttiin: käyttäjä voi myös muokata asiakasta. Toteuta tämä niin, että sovelluksessa on nappi "Muokkaa asiakasta xx" 
(jossa xx on asiakkaan id, data-testid="editButton"), joka piilottaa kaikki muut napit (ja editointi- ja haku-kentät) ja näyttää form:n jolla voi muokata valitun asiakkaan 
tietoja. Form:lla on seuraavat kentät (input type=text): nimi, osoite, puhelin, lisäksi form:lla on alasvetovalikko asiakastyypille ja napit "Peruuta muokkaus" 
(data-testid="cancelEditButton") ja "Tallenna muutos" (data-testid="saveEditButton"). Käytä asiakkaan muokkaamiseen REST-rajapintaa (PUT metodia). Toiminto on toteutettava 
niin, että ennen kuin muokkaus formi näytetään, haetaan asiakkaan tiedot REST-apista GET-metodilla (haetaan vain id:llä, url oltava muotoa http://localhost:3004/asiakas/123). 
Hae asiakkaat uudelleen onnistuneen muokkaamisen jälkeen jolloin lisätty asiakas näkyy näytöllä (jos hakuehdot olivat "sopivat", ks. edellinen tehtävä). Peruuta-napin 
painaminen sulkee vain muutos-formin ja laittaa näkyviin hakua varten tarvittavat napit ja kentät.

*/


const Asiakas = () => {
    const [nimi, setNimi] = useState('');
    const [osoite,setOsoite] = useState('');
    const [query, setQuery] = useState('');
    const [asiakkaat, setAsiakkaat] = useState([]);
    const [tyypit, setTyypit] = useState([]);
    const [valinta, setValinta] = useState("0");
    const [searching, setSearching] = useState(false);
    const [poistettavaId, setPoistettavaId] = useState(-1);

    // Asiakkaiden haku
    useEffect( () => {
        const fetchCustomers = async () => {
            setSearching(true);
            let response = await fetch("http://localhost:3004/asiakas" + query);
            let customers = await response.json();
            setAsiakkaat(customers);
            setSearching(false);
        }

        if ( query != '') fetchCustomers();
    }, [query]);

    // Asiakastyyppien haku
    useEffect(() => {
        const fetchCustomerTypes = async () => {
            let response = await fetch("http://localhost:3004/asiakastyyppi");
            let customer_types = await response.json() || [];
            setTyypit(customer_types);
        }
        fetchCustomerTypes();
    }, []);

    // Asiakkaan poistaminen
    useEffect(() => {
        const removeCustomer = async () => {
            let response = await fetch("http://localhost:3004/asiakas/" + poistettavaId, {
            method: 'DELETE',
            });
        };
        if (poistettavaId !== -1) {
            removeCustomer();
            setQuery("?" + Date.now());
        }
    }, [poistettavaId]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const asiakasTyypit = tyypit.map((t, i) => {
        return <option key={i} value={t.id}>{t.lyhenne}</option>
    }) || [];

    const handleFetch = () => {
        let haku = "";
        if (nimi != "") {
            haku = "nimi=" + nimi;
        }

        if (osoite != "") {
            if (haku != 0) {
                haku = haku + "&osoite=" + osoite;
            }
            else {
                haku = "osoite=" + osoite;
            }
        }

        if (valinta != "0") {
            if (haku != 0) {
                haku = haku + "&tyyppi_id=" + valinta;
            }
            else {
                haku = "tyyppi_id=" + valinta;
            }
        }
        setQuery("?" + haku);
    }
    
    const nimiChanged = (event) => {
        setNimi(event.target.value);
    }

    const osoiteChanged = (event) => {
        setOsoite(event.target.value);
    }

    const poistaAsiakas = (data) => {
        setPoistettavaId(data);
    }

    const asiakasLista = asiakkaat.map((s, i) => {
        return <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.nimi}</td>
            <td>{s.osoite}</td>
            <td>{s.postinumero}</td>
            <td>{s.postitoimipaikka}</td>
            <td>{s.puhelinnro}</td>
            <td>{s.tyyppi_id}</td>
            <td>{s.tyyppi_selite}</td>
            <td><button data-testid="deleteButton" onClick={(e) => poistaAsiakas(s.id)}>Poista {s.id}</button></td>
            <td><button>Muokkaa</button></td>
        </tr> 
    }) || [];
    
    return(
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Nimi<input type="text" data-testid="nameInput" value={nimi} onChange={(evt) => nimiChanged(evt)}/></label>
                <label>Osoite<input type="text" data-testid="addressInput" value={osoite} onChange={(evt) => osoiteChanged(evt)}/></label>
                <button data-testid="searchButton" onClick={() => handleFetch()}>Hae</button>
                <select data-testid="customertypeSelect" onChange={(e) => setValinta(e.target.value)} >
                    <option data-testid="customertypeOption"  defaultValue={0}>Valitse</option>
                    {asiakasTyypit} 
                </select>
                <button datatestid="addButton">Lisää uusi</button>
            </form> 
            {searching ?
            <p data-testid="loading">Loading ...</p> :
            asiakkaat.length > 0 ?
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nimi</td>
                        <td>Osoite</td>
                        <td>Postinumero</td>
                        <td>Postitoimipaikka</td>
                        <td>Puhelinnumero</td>
                        <td>Tyyppi_id</td>
                        <td>Tyyppi_selite</td>
                        <td>Poista</td>
                        <td>Muokkaa</td>
                    </tr>
                </thead>
                <tbody>{asiakasLista}</tbody>
            </table>
            :
            <p data-testid="notFound">Annetuilla hakuehdoilla ei löytynyt dataa</p>}
        </div>   
    )
}

export {Asiakas}