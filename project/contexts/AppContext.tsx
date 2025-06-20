import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Gasto {
  id: string;
  valor: number;
  descricao: string;
  categoria: string;
  data: Date;
  tipo: 'voz' | 'foto' | 'manual';
}

interface AppContextType {
  gastos: Gasto[];
  adicionarGasto: (gasto: Omit<Gasto, 'id'>) => void;
  removerGasto: (id: string) => void;
  limparGastos: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  const adicionarGasto = (novoGasto: Omit<Gasto, 'id'>) => {
    const gasto: Gasto = {
      ...novoGasto,
      id: Date.now().toString(),
    };
    setGastos(prev => [gasto, ...prev]);
  };

  const removerGasto = (id: string) => {
    setGastos(prev => prev.filter(gasto => gasto.id !== id));
  };

  const limparGastos = () => {
    setGastos([]);
  };

  return (
    <AppContext.Provider value={{
      gastos,
      adicionarGasto,
      removerGasto,
      limparGastos,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}