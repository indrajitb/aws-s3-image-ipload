/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-13 17:26:10 
 * @Last Modified by:   Indrajit Bhattacharya 
 * @Last Modified time: 2020-09-13 17:26:10 
 */
import {useRef} from 'react';

export const useComponentWillMount = (func) => {
    const willMount = useRef(true);

    if (willMount.current) func();

    willMount.current = false;
}