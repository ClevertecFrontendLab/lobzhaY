import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './loader.json';

import { loaderTestId } from '../../constants/data-test/data-test-id';

import './loader-component.scss';

export const LoaderComponent: React.FC = () => {
    const [isStopped, setIsStopped] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className='loader-wrapper'>
            <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                isStopped={isStopped}
                data-test-id={loaderTestId}
            />
        </div>
    );
};
