import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'About',
};

export default function Page(){

    return(
        <div className="w-full">
            <div className="flex flex-col w-full items-start justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>About us</h1>
                <h2 className={`${lusitana.className} text-xl`}>Norma 71362:2020</h2>
                <p>La Norma 71362:2020 de “Calidad de los materiales educativos digitales” elaborada por UNE responde a la necesidad 
                de proporcionar un documento de referencia sobre la calidad de los materiales educativos digitales (MED) y una herramienta para su medición.
                Los objetivos de esta norma se resumen en los siguientes objetivos específicos:
                Guiar la creación de un recurso educativo digital de calidad.
                Valorar estos recursos de forma precisa y objetiva.
                Facilitar a los usuarios la elección del mejor MED.
                La calidad de los Recursos Educativos Digitales se puede valorar a partir de 15 criterios establecidos en dicha norma. 
                Cada criterio contiene diferentes indicadores de calidad que especifican las características que debe reunir un recurso para tener una alta 
                valoración en dicho criterio.
                Esta norma, como hemos mencionado antes, proporciona una herramienta con forma de rúbrica para puntuar cada uno de los criterios. 
                La suma de las puntuaciones obtenidas en todos ellos arroja una calificación total del recurso educativo digital. De esta manera, 
                los docentes tendrán una información precisa acerca de la calidad de un recurso educativo de interés.
                Aquí puedes encontrar el ANEXO F de la norma UNE 71362:2017 que corresponde a la adaptación de la misma al perfil del alumno y del profesor.</p>
            </div>
        </div>
    );
}