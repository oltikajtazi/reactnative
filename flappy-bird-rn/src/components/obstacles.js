import reaact from 'react';

import {View } from 'react-native';

const Obstacles = (  {
    color,
    obsticaleWidth,
    obsticaleHeight,
    gap,
    obsticalBottom,
    gap,
    obsticalLeft
}) => {
    return 
    
        <View>
        return (
            <>
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: color,
                        width: obsticaleWidth,
                        height: obsticaleHeight,
                        left: obsticalLeft,
                        bottom: obsticalBottom + gap + obsticaleHeight,
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: color,
                        width: obsticaleWidth,
                        height: obsticaleHeight,
                        left: obsticalLeft,
                        bottom: obsticalBottom,
                    }}
                />
            </>
        );
    

}