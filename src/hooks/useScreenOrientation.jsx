import { useEffect, useState } from 'react';

const defaultState = {
  angle: 0,
  type: 'landscape-primary',
};

const useScreenOrientation = ( initialState = defaultState) => {
  const [screenOrientation, setScreenOrientation] = useState(initialState);

  useEffect(() => {
    let mounted = true;
    const onChange = () => {
        if (mounted) {
            const { orientation } = screen;
            if (orientation) {
                const { angle, type } = orientation;
                setState({ angle, type });
            }
            else if (window.orientation) {
                setScreenOrientation({
                    angle: typeof window.orientation === 'number' ? window.orientation : 0,
                    type: '',
                });
            }
            else {
                setScreenOrientation(initialState);
            }
        }
    };
    on(window, 'orientationchange', onChange);
    onChange();
    return () => {
        mounted = false;
        off(window, 'orientationchange', onChange);
    };
}, []);
return screenOrientation;
};

export default useScreenOrientation;