import React, { createContext, useContext, ReactNode } from "react";
import {
  useKartuKeluarga,
  KartuKeluarga,
  KartuKeluargaVariables,
  Pagination,
  Filters,
  Sorter,
} from "../hooks/useKartuKeluarga";

interface KartuKeluargaContextType {
  useGetList: (
    pagination: Pagination,
    filters: Filters,
    sorters: Sorter[]
  ) => {
    data: { data: KartuKeluarga[]; total: number } | undefined;
    isLoading: boolean;
    error: unknown;
  };
  useGetOne: (id: number) => {
    data: KartuKeluarga | undefined;
    isLoading: boolean;
    error: unknown;
  };
  createKartuKeluarga: (variables: KartuKeluargaVariables) => Promise<void>;
  updateKartuKeluarga: (id: number, variables: KartuKeluargaVariables) => Promise<void>;
  deleteKartuKeluarga: (id: number) => Promise<void>;
}

const KartuKeluargaContext = createContext<KartuKeluargaContextType | undefined>(undefined);

interface KartuKeluargaProviderProps {
  children: ReactNode;
}

export const KartuKeluargaProvider: React.FC<KartuKeluargaProviderProps> = ({ children }) => {
  const {
    useGetList,
    useGetOne,
    createKartuKeluarga: createKartuKeluargaMutation,
    updateKartuKeluarga: updateKartuKeluargaMutation,
    deleteKartuKeluarga: deleteKartuKeluargaMutation,
  } = useKartuKeluarga();

  const createKartuKeluarga = async (variables: KartuKeluargaVariables) => {
    await createKartuKeluargaMutation.mutateAsync(variables);
  };

  const updateKartuKeluarga = async (id: number, variables: KartuKeluargaVariables) => {
    await updateKartuKeluargaMutation.mutateAsync({ id, variables });
  };

  const deleteKartuKeluarga = async (id: number) => {
    await deleteKartuKeluargaMutation.mutateAsync({ id });
  };

  return (
    <KartuKeluargaContext.Provider
      value={{
        useGetList,
        useGetOne,
        createKartuKeluarga,
        updateKartuKeluarga,
        deleteKartuKeluarga,
      }}
    >
      {children}
    </KartuKeluargaContext.Provider>
  );
};

export const useKartuKeluargaContext = (): KartuKeluargaContextType => {
  const context = useContext(KartuKeluargaContext);
  if (!context) {
    throw new Error("useKartuKeluargaContext must be used within a KartuKeluargaProvider");
  }
  return context;
};