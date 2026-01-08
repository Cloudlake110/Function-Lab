export type FunctionCategory = 'Cleaning' | 'Slicing' | 'Engineering' | 'Logic' | 'Training';

export interface FunctionDef {
  id: string;
  name: string;
  category: FunctionCategory;
  description: string;
  businessLogic: string;
  codePrototype: string;
}

export interface DataRow {
  id: number | string;
  val1: string | number | null;
  val2: string | number;
  status: 'normal' | 'error' | 'success' | 'processing' | 'warning' | 'hidden' | 'training' | 'testing';
  highlight?: boolean;
}
