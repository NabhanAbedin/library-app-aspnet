import { useRef } from "react";


const SortByAlpha =  ({inputFrom, setInputFrom, inputTo, setInputTo, setFilterData}) => {
    const containerRef = useRef(null);

    const validateAlpha = () => {
        if (inputFrom > inputTo || inputFrom === inputTo) {
            alert('invalid character entry');
            setInputFrom('A');
            setInputTo('Z');
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

        validateAlpha();
    };

    const handleInputChange = (setValue) => (e) => {
        let value = e.target.value;
        if (!isNaN(Number(value)) && value !== '') return;
        value = e.target.value.toUpperCase().slice(0,1);
        setValue(value);
    }

    return (
        <>
            <p>Alphabet order</p>
            <div className="alphabet-input-container" ref={containerRef}
            onBlur={handleBlur}
            >
                <input 
                    type="text"
                    value={inputFrom}
                    onChange={handleInputChange(setInputFrom)}
                    maxLength={1}
                    placeholder="A"
                />
                <input 
                    type="text"
                    value={inputTo}
                    onChange={handleInputChange(setInputTo)}
                    maxLength={1}
                    placeholder="Z"
                />
            </div>



        </>
    );
};

export default SortByAlpha;