import { Select } from "antd"

interface SelectLimitProps {
    limit: number;
    setLimit: (val: number) => void;
}
const SelectLimit = (props: SelectLimitProps) => {
    const {limit, setLimit} = props
    return (
        <Select 
            value={limit} 
            onChange={(val) => setLimit(val)}
        >
            <Select.Option value={5}>Giới hạn 5</Select.Option>
            <Select.Option value={10}>Giới hạn 10</Select.Option>
            <Select.Option value={20}>Giới hạn 30</Select.Option>
            <Select.Option value={50}>Giới hạn 50</Select.Option>
        </Select>
    )
}

export default SelectLimit