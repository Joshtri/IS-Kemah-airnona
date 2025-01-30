import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define types for KartuKeluarga
export interface KartuKeluargaVariables {
  id?: number;
  nama_kepala_keluarga: string;
  alamat_keluarga: string;
  nomor_telepon_keluarga: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface KartuKeluarga {
  id: number;
  nama_kepala_keluarga: string;
  alamat_keluarga: string;
  nomor_telepon_keluarga: string;
  created_at: Date;
  updated_at: Date;
}

// Pagination, Filters, and Sorter types
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
  data: KartuKeluarga[];
  total: number;
}

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/kartu-keluarga`;

export const useKartuKeluarga = () => {
  const queryClient = useQueryClient();

  // Get List of KartuKeluarga with pagination, filters, and sorting
  const getList = async (
    pagination: Pagination,
    filters: Filters,
    sorters: Sorter[]
  ): Promise<GetListResponse> => {
    const { current = 1, pageSize = 10 } = pagination;
    const response = await axios.get<{ status: number; message: string; data: KartuKeluarga[] }>(apiUrl, {
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

  // Get a single KartuKeluarga by ID
  const getOne = async (id: number): Promise<KartuKeluarga> => {
    const response = await axios.get<{ status: number; message: string; data: KartuKeluarga }>(`${apiUrl}/${id}`);
    return response.data.data;
  };

  // React Query hooks
  const useGetList = (pagination: Pagination, filters: Filters, sorters: Sorter[]) =>
    useQuery({
      queryKey: ["kartuKeluarga", pagination, filters, sorters],
      queryFn: () => getList(pagination, filters, sorters),
    });

  const useGetOne = (id: number) =>
    useQuery({
      queryKey: ["kartuKeluarga", id],
      queryFn: () => getOne(id),
      enabled: !!id,
    });

  // Mutation for creating KartuKeluarga
  const createKartuKeluarga = useMutation<KartuKeluarga, Error, KartuKeluargaVariables>({
    mutationFn: async (variables: KartuKeluargaVariables) => {
      const response = await axios.post<{ status: number; message: string; data: KartuKeluarga }>(apiUrl, variables);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kartuKeluarga"] });
    },
  });

  // Mutation for updating KartuKeluarga
  const updateKartuKeluarga = useMutation<KartuKeluarga, Error, { id: number; variables: KartuKeluargaVariables }>({
    mutationFn: async ({ id, variables }) => {
      const response = await axios.put<{ status: number; message: string; data: KartuKeluarga }>(`${apiUrl}/${id}`, variables);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kartuKeluarga"] });
    },
  });

  // Mutation for deleting KartuKeluarga
  const deleteKartuKeluarga = useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await axios.delete<{ status: number; message: string; data: KartuKeluarga }>(`${apiUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kartuKeluarga"] });
    },
  });

  return {
    useGetList,
    useGetOne,
    createKartuKeluarga,
    updateKartuKeluarga,
    deleteKartuKeluarga,
  };
};
