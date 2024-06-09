import { InputNumber } from 'antd';
import { useState } from 'react';
import { generateRandomPoints } from '../utils/CMeans';

type Props = {
    action: (point: Point) => void,
    title: string
}

const InputPoint = (props: Props) => {
    const [xAxis, setXAxis] = useState<number>();
    const [yAxis, setYAxis] = useState<number>();

    const handleAdd = () => {
        const newPoint: Point = {
            x: xAxis ?? 0,
            y: yAxis ?? 0
        }
        try {
            props.action(newPoint);
            setXAxis(undefined);
            setYAxis(undefined);
        } catch (error) {
            console.error(error);
        }

    }

    const handleAddRandom = () => {
        const newPoint: Point = generateRandomPoints(1)[0];
        try {
            props.action(newPoint);
            setXAxis(undefined);
            setYAxis(undefined);
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div className='w-full px-3 flex flex-col items-start gap-2'>
            <h2 className='text-xl font-bold'>Add {props.title}</h2>
            <div className='flex justify-start w-full gap-8'>
                <InputNumber placeholder='X' value={xAxis} onChange={value => setXAxis(value ?? 0)} className='w-full text-lg' max={1000} min={-1000} />
                <InputNumber placeholder='Y' value={yAxis} onChange={value => setYAxis(value ?? 0)} className='w-full text-lg' max={1000} min={-1000} />
            </div>
            <div className='flex gap-2 items-center justify-center w-full'>
                <button onClick={handleAdd} className='text-white text-md bg-black px-4 py-2 rounded-md mt-2 font-medium' >
                    Add {props.title}
                </button>
                <button onClick={handleAddRandom} className='text-white text-md bg-black px-4 py-2 rounded-md mt-2 font-medium' >
                    Add Random {props.title}
                </button>
            </div>

        </div>
    )
}

export default InputPoint