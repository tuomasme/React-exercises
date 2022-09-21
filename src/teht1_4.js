import { useState} from 'react';


/*

1. Tee React-komponetti (<Laskuri>), joka sisältää napin (Kasvata), jota painamalla kasvatetaan laskurin arvoa. 
Näytä laskurin arvo napin alapuolella h1-elementissä muodossa "Laskuri on 2".

2. Lisää edelliseen tehtävään nappi (Nollaa), jolla laskuri voidaan nollata.

3. Lisää edelliseen tehtävään ominaisuus, joka näyttää laskurin arvon boldattuna ja punaisella, jos laskurin arvo on yli 10. 
Riittää boldata ja värjätä punaisella koko teksti "Laskuri on 3".

4. Muuta edellistä tehtävää (tai tehtävää 2) siten, että laskurin arvon näyttämiseen käytetään omaa komponettia (<Arvo>), joka 
käyttää datan välittämiseen props:ia "arvo".
 
*/

function Laskuri() {
    const [arvo, setArvo] = useState(0);
    
    return(
        <div>
            <Arvo arvo={arvo}/>
            <button onClick={() => setArvo(arvo + 1)}>Kasvata</button>
            <button onClick={() => setArvo(0)}>Nollaa</button>
        </div>
    )
}

const Arvo = (props) => {
    let tyyli = {color: 'black'}

    if(props.arvo > 10){
        tyyli = {
            color: 'red',
            fontWeight: 'bold'
        }
    }
    return(
        <div>
            <h1 style={tyyli}>Laskuri on {props.arvo}</h1>
        </div>
    )
}

export {Laskuri,Arvo};