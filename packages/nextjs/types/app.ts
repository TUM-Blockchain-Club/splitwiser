export interface DebtInfo {
  amount: number;
  groupId: string;
}

export interface Group {
  id?: string;
  name: string;
  type: string;
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
  address: string;
  name: string;
}

export interface ENSName {
  id: string;
  name: string;
  labelName: string;
  labelhash: string;
}
