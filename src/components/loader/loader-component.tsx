import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './loader.json';

import { loaderTestId } from '../../constants/data-test/data-test-id';

import './loader-component.scss';
import { store } from '../../redux';

export const LoaderComponent: React.FC = () => {
    const [isStopped, setIsStopped] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
 
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    useEffect(() => {
        store.subscribe(() => setIsLoading((store.getState()).loader.isLoading));
    }, [])
    

    return isLoading ? (
        <div className='loader-wrapper'>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
               // isStopped={isStopped}
                data-test-id={loaderTestId}
            />
        </div>) : null
        
    ;
};
