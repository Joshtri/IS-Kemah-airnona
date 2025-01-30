import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Definisikan tipe untuk status keanggotaan
export enum StatusKeanggotaan {
  aktif = "aktif",
  pindah = "pindah",
  meninggal = "meninggal",
}

// Definisikan tipe untuk variabel jemaat
export interface JemaatVariables {
  nama_jemaat: string;
  tanggal_lahir: string;
  alamat: string;
  nomor_telepon: string;
  email: string;
  status_keanggotaan: StatusKeanggotaan;
  kartu_keluargaid: number;
  rayonId: number;
}

export interface Jemaat {
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

// Ekspor tipe Pagination, Filters, dan Sorter
export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface Filters {
  [key: string]: unknown;
}

export interface Sorter {
  field: string;
  order: "asc" | "desc";
}

interface GetListResponse {
  data: Jemaat[];
  total: number;
}

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/jemaat`;

export const useJemaat = () => {
  const queryClient = useQueryClient();

  const getList = async (
    pagination: Pagination,
    filters: Filters,
    sorters: Sorter[]
  ): Promise<GetListResponse> => {
    const { current = 1, pageSize = 10 } = pagination;
    const response = await axios.get<{ status: number; message: string; data: Jemaat[] }>(apiUrl, {
      params: {
        _page: current,
        _limit: pageSize,
        ...filters,
        _sort: sorters?.map((sort) => `${sort.field}:${sort.order}`).join(","),
      },
    });

    const total = parseInt(response.headers["x-total-count"] || "0", 10);

    return {
      data: response.data.data,
      total,
    };
  };

  const getOne = async (id: number): Promise<Jemaat> => {
    const response = await axios.get<{ status: number; message: string; data: Jemaat }>(`${apiUrl}/${id}`);
    return response.data.data;
  };

  const useGetList = (pagination: Pagination, filters: Filters, sorters: Sorter[]) =>
    useQuery({
      queryKey: ["jemaat", pagination, filters, sorters],
      queryFn: () => getList(pagination, filters, sorters),
    });

  const useGetOne = (id: number) =>
    useQuery({
      queryKey: ["jemaat", id],
      queryFn: () => getOne(id),
      enabled: !!id,
    });

  // const createJemaat = useMutation<Jemaat, Error, JemaatVariables>({
  //   mutationFn: async (variables: JemaatVariables) => {
  //     const response = await axios.post<{ status: number; message: string; data: Jemaat }>(apiUrl, variables);
  //     return response.data.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["jemaat"] });
  //   },
  // });

  const createJemaat = useMutation<Jemaat, Error, JemaatVariables>({
    mutationFn: async (variables: JemaatVariables) => {
      const response = await axios.post<{ status: number; message: string; data: Jemaat; errors?: Record<string, string> }>(apiUrl, variables);

      if (response.data.status === 400 && response.data.errors) {
        // If backend returns validation errors, throw them to be handled in the catch block
        throw response.data.errors;
      }

      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jemaat"] });
    },
  });


  const updateJemaat = useMutation<Jemaat, Error, { id: number; variables: JemaatVariables }>({
    mutationFn: async ({ id, variables }) => {
      const response = await axios.put<{ status: number; message: string; data: Jemaat }>(`${apiUrl}/${id}`, variables);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jemaat"] });
    },
  });

  const deleteJemaat = useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await axios.delete<{ status: number; message: string; data: Jemaat }>(`${apiUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jemaat"] });
    },
  });

  return {
    useGetList,
    useGetOne,
    createJemaat,
    updateJemaat,
    deleteJemaat,
  };
};