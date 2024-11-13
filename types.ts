import { ReactNode } from "react";



export interface ITerminal {
    id: number,
    name: string,
    serial_no: string,
    terminal_id: string,
    merchant: string,
    location: string,
    transactions: string,
    status: 'Active' | 'Offline'
}

export interface IUser {

        id: number;
        email: string;
        
    
}


export interface IAuthContext{

    user: IUser | null;
    setUser: (user: IUser) => void;
    verifyOTP?: () => void

}

export type Status = 'Active' | 'Offline' | 'unknown' | 'Inactive' | 'Approved' | 'Refunded' | 'Assigned'


export interface IStatusBadge {
    status?: Status,
    bgColor?: '#0DAB0D1A' | '#0D0B651A'
}


export interface IOperationalHeader{

    name: string;
    dropDown?: boolean;
    search?: boolean;
    filter?: boolean;
    create?: boolean;
    table: {};
    onSearch?: (value: string) => void;
    searchTerm?:string;
    handleSearch?: () => void;
    buttonTitle?: string;
    buttonFunction?: () => void;
    buttonIcon?: ReactNode;
    isLoading?: boolean;
    filterData?: {lable: string, value: string}[]

}


export interface IDropDown{
    data: {value: string, label: string}[];
    textColor: string;
    chevronColor: string;
    popOverWidth: string;
    buttonWidth: string;
    borderRadius?: 'lg' | 'md' | 'full',
    variant?: 'location' | 'status' | 'merchant',
    table: {},
    clear: boolean | 'unknown';
    columnValues: string
  }




  export interface ISearchBarDefacto{

    data: {label: string, value: string}[]
    searchFunc: () => void;
    table: {}

  }

  export interface IMerchant {
    id: number,
    status: string,
    name: string,
    merchantId: string,
    location: string,
    devices: number
  }

  export interface IFilterComponent {
    table: {}
    filterData: {lable: string, value: string}[]
  }
