export interface DebtInfo {
  amount: number;
  groupId: string;
}

export interface GroupDebt {
  amount: number;
  address: string;
}

export interface Group {
  id?: bigint;
  name: string;
  type?: string;
}

export interface GroupMember {
  address: string;
  groupId: string;
}

export interface GroupTransaction {
  amount: number;
  groupId: string;
  id?: string;
  title: string;
}

export interface Friend {
  id: string;
  address: string;
  name: string;
}

export interface ENSName {
  id: string;
  name: string;
  labelName: string;
  labelhash: string;
}
