declare interface DBSaveData {
  id: number;
  created_at: string;
  user_id: string;
  saved_costs_data: boolean[] | null;
  saved_boosts_data: boolean[] | null;
  saved_upgrade_counts: number[] | null;
  balance: number;
  increment: number;
  expenses: number;
  checkpoint: number;
}

declare interface DBSaveDataPartial {
  id?: number;
  created_at?: string;
  user_id?: string;
  saved_costs_data: boolean[] | null;
  saved_upgrade_counts: number[] | null;
  balance: number;
  increment: number;
  expenses: number;
  checkpoint: number;
}
