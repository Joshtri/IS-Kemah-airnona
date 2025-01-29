export interface Jemaat {
  // Define the properties of a Jemaat here
    id: number;
    nama_jemaat: string;
    tanggal_lahir: string;
    alamat: string;
    nomor_telepon: string;
    email: string;
    status_keanggotaan: StatusKeanggotaan;
    created_at: string;
    updated_at: string;
    kartu_keluargaid: number;
    rayonId: number;
  
}

export interface JemaatVariables {
  // Define the properties of Jemaat variables here
    nama_jemaat: string;
    tanggal_lahir: string;
    alamat: string;
    nomor_telepon: string;
    email: string;
    status_keanggotaan: StatusKeanggotaan;
    kartu_keluargaid: number;
    rayonId: number;
}

export interface Pagination {
  page: number;
  perPage: number;
}

export interface Filters {
  // Define filter properties
  [key: string]: unknown;

}

export interface Sorter {
  field: string;
  order: 'asc' | 'desc';
}

export interface JemaatContextType {
  useGetList: (
    pagination: Pagination,
    filters: Filters,
    sorters: Sorter[]
  ) => {
    data: { data: Jemaat[]; total: number } | undefined;
    isLoading: boolean;
    error: unknown;
  };
  useGetOne: (id: number) => {
    data: Jemaat | undefined;
    isLoading: boolean;
    error: unknown;
  };
  createJemaat: (variables: JemaatVariables) => Promise<void>;
  updateJemaat: (id: number, variables: JemaatVariables) => Promise<void>;
  deleteJemaat: (id: number) => Promise<void>;
}
