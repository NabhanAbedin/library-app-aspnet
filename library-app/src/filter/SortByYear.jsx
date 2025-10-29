import {  useRef } from "react";

const SortByYear = ({inputFrom, setInputFrom, inputTo, setInputTo, setFilterData}) => {
    const containerRef = useRef(null);
    const date = new Date();

    const validateYear =  () => {
        
        if (inputFrom < 1500) {
            alert(`the year ${inputFrom} from is not valid must be over 1500`);
            setInputFrom('');
            return;
        };
        if (inputTo > date.getFullYear()) {
            alert(`the year ${inputTo} to is greater than the current year, must be under`);
            setInputTo('');
            return;
        }
        if (inputFrom >= inputTo) {
            alert('years arent valid');
            setInputFrom(1500);
            setInputTo(date.getFullYear()); 
            return;
        }

        setFilterData(prev => ({
            ...prev, 
            from: inputFrom,
            to: inputTo
        }));
        
    };

    const handleBlur = (e) => {
        const sameContainer = e.relatedTarget;
        if (containerRef.current.contains(sameContainer)) return;

        validateYear();
    }

    return (
        <>
            <p>Years</p>
            <div className='years-input-container' 
            ref={containerRef}
            onBlur={handleBlur}
            >
                <input 
                value={inputFrom} 
                onChange={ e=> {setInputFrom(e.target.value)}} 
                type="number"
                min='1500'
                max={date.getFullYear()}
                step='1'
                />
                <input value={inputTo} 
                onChange={ e=> {setInputTo(e.target.value)}} 
                type="number"
                min='1500'
                max={date.getFullYear()}
                step='1'/>
            </div>
        </>
    );
};

export default SortByYear;