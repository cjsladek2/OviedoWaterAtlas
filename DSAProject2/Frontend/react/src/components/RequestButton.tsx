import { useState, useContext } from 'react';
import { MapContext, type MapContextType } from './MapVariablesProvider.tsx';
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';
import filterIcon from '../../assets/filter.svg';
interface RequestButtonProps{
    billing_period: number;
    num: number;
    variable: string;
    method: string;
    category: string;
    exclude: boolean
    subdiv: string;
}

//THIS BUTTON MAKES A REQUEST TO THE CROW SERVER BASED ON THE BASSED IN PROPS
//THIS WILL NEED TO BE UPDATED LATER OFC
export default function RequestButton({billing_period, num, variable, method, category, exclude, subdiv}: RequestButtonProps) {
    const Animation = (UseAnimations as any).default || UseAnimations;
    const loadingAnimationData = (loading as any).default || loading;

    const { setReturnJSON } = useContext(MapContext) as MapContextType;
    const [isLoading, setLoading] = useState(false);

    const makeRequest = async () => {
        const API_BASE = import.meta.env.VITE_API_URL; // get the real URL
        const min_max_endpoint = `${API_BASE}/minmax/${billing_period}/${num}/${variable}/${method}/${category}/${Number(exclude)}/${subdiv}`;
        const deap_endpoint = `${API_BASE}/deap/${billing_period}/${num}/${variable}/${method}/${category}/${Number(exclude)}/${subdiv}`;

        try{
            setLoading(true);

            //DO REQUESTS
            const [minmaxJSON, deapJSON] = await Promise.all([
                fetch(min_max_endpoint).then(r => r.json()),
                fetch(deap_endpoint).then(r => r.json())
            ]);

            setReturnJSON([minmaxJSON, deapJSON]);
        }
        catch(error){
            console.log(`Crow server request error: ${error}`);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <button className = "uk-btn uk-btn-default mb-4" onClick = {makeRequest}>
            {isLoading ? <Animation animation={loadingAnimationData} size={20}/> :
                <img src={ filterIcon } alt="filter" width="20" height="20" />}
            <p>Apply Filters</p>
        </button>
    )
}