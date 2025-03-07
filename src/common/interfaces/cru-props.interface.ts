
//CRU is CREATE, READ AND UPDATE



export interface CruProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    id?: string;
}