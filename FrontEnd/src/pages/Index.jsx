import { Layout } from "../layout/Layout"
import { Ofertas } from '../components/Ofertas'
import { Slider } from '../components/Slider'
export function Index(){
    return (
        <Layout>
            {/*Contenido */}
           <Slider/>
            <Ofertas/>
        </Layout>
    )
}