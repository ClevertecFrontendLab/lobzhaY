import { useEffect, useState } from 'react';

import Lottie from 'react-lottie';
import animationData from './loader.json';

import { store } from '../../redux';

import { loaderTestId } from '../../constants/data-test/data-test-id';

import './loader-component.scss';

export const LoaderComponent: React.FC = () => {
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
        store.subscribe(() => setIsLoading(store.getState().loader.isLoading));
    }, []);

    return isLoading ? (
        <div className='loader-wrapper' data-test-id={loaderTestId}>
            <Lottie options={defaultOptions} height={150} width={150} />
        </div>
    ) : null;
};
