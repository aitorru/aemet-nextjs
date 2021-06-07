import Despejado from '../public/weather/039-sun.svg'
import DespejadoNoche from '../public/weather/022-night-3.svg'
import PocoNuvoso from '../public/weather/038-cloudy-3.svg'
import PocoNuvosoNoche from '../public/weather/007-night.svg'
import Nuboso from '../public/weather/001-cloud.svg'
import NubosoNoche from '../public/weather/002-cloud-1.svg'
import MuyNuvoso from '../public/weather/011-cloudy.svg'
import NubesAltas from '../public/weather/017-foog.svg'
import NubosoConLluvia from '../public/weather/034-cloudy-1.svg'
import NubosoConLluviaNoche from '../public/weather/021-night-2.svg'
import NubeGordaLluvia from '../public/weather/003-rainy.svg'
import SolConNieve from '../public/weather/035-snowy-2.svg'
import NocheConNieve from '../public/weather/019-night-1.svg'
import Nieve from '../public/weather/006-snowy.svg'
import TormentaSol from '../public/weather/009-storm-1.svg'
import TormentaNoche from '../public/weather/020-storm-3.svg'
import Tormenta from '../public/weather/008-storm.svg'
import Niebla from '../public/weather/017-foog.svg'

export default function InconoTiempo(props) {

    const id = props.id;

    switch (id.toString()) {
        case '11':
            return <Despejado className={props.className} />
        case '11n':
            return <DespejadoNoche className={props.className} />
        case '12':
            return <PocoNuvoso className={props.className} />
        case '12n':
            return <PocoNuvosoNoche className={props.className} />
        case '13':
            return <PocoNuvoso className={props.className} />
        case '13n':
            return <PocoNuvosoNoche className={props.className} />
        case '14':
            return <Nuboso className={props.className} />
        case '14n':
            return <NubosoNoche className={props.className} />
        case '15':
            return <MuyNuvoso className={props.className} />
        case '16':
            return <MuyNuvoso className={props.className} />
        case '17':
            return <NubesAltas className={props.className} />
        case '17n':
            return <NubesAltas className={props.className} />
        case '43':
            return <NubosoConLluvia className={props.className} />
        case '43n':
            return <NubosoConLluviaNoche className={props.className} />
        case '44':
            return <NubosoConLluvia className={props.className} />
        case '44n':
            return <NubosoConLluviaNoche className={props.className} />
        case '45':
            return <NubeGordaLluvia className={props.className} />
        case '46':
            return <NubeGordaLluvia className={props.className} />
        case '23':
            return <NubosoConLluvia className={props.className} />
        case '23n':
            return <NubosoConLluviaNoche className={props.className} />
        case '24':
            return <NubosoConLluvia className={props.className} />
        case '24n':
            return <NubosoConLluviaNoche className={props.className} />
        case '25':
            return <NubeGordaLluvia className={props.className} />
        case '26':
            return <NubeGordaLluvia className={props.className} />
        case '71':
            return <SolConNieve className={props.className} />
        case '71n':
            return <NocheConNieve className={props.className} />
        case '72':
            return <SolConNieve className={props.className} />
        case '72n':
            return <NocheConNieve className={props.className} />
        case '73':
            return <Nieve className={props.className} />
        case '74':
            return <Nieve className={props.className} />
        case '33':
            return <SolConNieve className={props.className} />
        case '33n':
            return <NocheConNieve className={props.className} />
        case '34':
            return <SolConNieve className={props.className} />
        case '34n':
            return <NocheConNieve className={props.className} />
        case '35':
            return <Nieve className={props.className} />
        case '36':
            return <Nieve className={props.className} />
        case '51':
            return <TormentaSol className={props.className} />
        case '51n':
            return <TormentaNoche className={props.className} />
        case '52':
            return <TormentaSol className={props.className} />
        case '52n':
            return <TormentaNoche className={props.className} />
        case '53':
            return <Tormenta className={props.className} />
        case '54':
            return <Tormenta className={props.className} />
        case '61':
            return <TormentaSol className={props.className} />
        case '61n':
            return <TormentaNoche className={props.className} />
        case '62':
            return <TormentaSol className={props.className} />
        case '62n':
            return <TormentaNoche className={props.className} />
        case '63':
            return <Tormenta className={props.className} />
        case '64':
            return <Tormenta className={props.className} />
        case '81':
            return <Niebla className={props.className} />
        case '82':
            return <Niebla className={props.className} />
        case '83':
            return <Niebla className={props.className} />
        default:
            return <a>❓</a>
    }

}