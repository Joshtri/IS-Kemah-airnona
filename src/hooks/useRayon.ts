import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Definisikan tipe untuk variabel Rayon
export interface RayonVariables {
  nama_rayon: string;
  wilayah: string;
}

export interface Rayon {
  id: number;
  nama_rayon: string;
  wilayah: string;
  created_at: string;
  updated_at: string;
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
  data: Rayon[];
  total: number;
}

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/rayon`;

export const useRayon = () => {
  const queryClient = useQueryClient();

  const getList = async (
    pagination: Pagination,
    filters: Filters,
    sorters: Sorter[]
  ): Promise<GetListResponse> => {
    const { current = 1, pageSize = 10 } = pagination;
    const response = await axios.get<{ status: number; message: string; data: Rayon[] }>(apiUrl, {
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

  const getOne = async (id: number): Promise<Rayon> => {
    const response = await axios.get<{ status: number; message: string; data: Rayon }>(`${apiUrl}/${id}`);
    return response.data.data;
  };

  const useGetList = (pagination: Pagination, filters: Filters, sorters: Sorter[]) =>
    useQuery({
      queryKey: ["rayon", pagination, filters, sorters],
      queryFn: () => getList(pagination, filters, sorters),
    });

  const useGetOne = (id: number) =>
    useQuery({
      queryKey: ["rayon", id],
      queryFn: () => getOne(id),
      enabled: !!id,
    });

  const createRayon = useMutation<Rayon, Error, RayonVariables>({
    mutationFn: async (variables: RayonVariables) => {
      const response = await axios.post<{ status: number; message: string; data: Rayon; errors?: Record<string, string> }>(apiUrl, variables);

      if (response.data.status === 400 && response.data.errors) {
        throw response.data.errors;
      }

      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rayon"] });
    },
  });

  const updateRayon = useMutation<Rayon, Error, { id: number; variables: RayonVariables }>({
    mutationFn: async ({ id, variables }) => {
      const response = await axios.put<{ status: number; message: string; data: Rayon }>(`${apiUrl}/${id}`, variables);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rayon"] });
    },
  });

  const deleteRayon = useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await axios.delete<{ status: number; message: string; data: Rayon }>(`${apiUrl}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rayon"] });
    },
  });

  return {
    useGetList,
    useGetOne,
    createRayon,
    updateRayon,
    deleteRayon,
  };
};
