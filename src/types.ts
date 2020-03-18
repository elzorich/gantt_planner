export interface Campaign {
  id: number;
  campaign: string;
  type: string;
  startTime: string;
  endTime: string;
  color: string;
  contents: Array<any>;
}

export interface Contents {
  name: string;
  contentDate: string;
  ySide: number;
  color: string;
}
