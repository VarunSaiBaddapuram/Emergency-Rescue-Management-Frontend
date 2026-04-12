export interface ReliefCenter {
  _id: string;
  id?: string; // For DataGrid tracking
  CenterName: string;
  Phone: string;
  Capacity: number;
  Admission: number;
  Address: string;
  latitude: number;
  longitude: number;
  email: string;
  InCharge: string;
}

export interface ReliefSupplyRequest {
  _id: string;
  ItemName: string;
  Quantity: number | string;
  CenterName: string;
  Phone: string;
  Requester: string;
  Status: 'pending' | 'accepted' | 'dispatched' | 'delivered';
  AcceptedBy?: string;
  DriverPhone?: string;
}
