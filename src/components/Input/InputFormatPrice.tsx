import { NumericFormat, NumericFormatProps } from 'react-number-format';

export const InputFormatPrice = (props?: NumericFormatProps) => {

    
    return <NumericFormat 
    
                suffix=" VND"
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                className="ant-input"
                {...props}
            />

}