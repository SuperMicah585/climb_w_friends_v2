export interface ClimbsTableResponse {
  id: number;
  name: string;
  Location: string;
  URL: string;
  'AVG STARS': number;
  'Your Stars': number;
  'Route Type': string;
  grade: string;
  Pitches: number;
  Length: string;
  'Area Latitude': number;
  'Area Longitude': number;
}

export interface AddClimbsModalProps {
  location: string;
  routeType: string;
  closeAddClimbsModalCallBack: (trigger: boolean) => void;
}

export type TempDic = {
  [key: string]: (Tags | null)[];
};

export type deleteTagItem = [string, number];

export type ClimbTagItem = [Tags, string];

export interface Micah {
  name: string;
  id: number;
  email: string;
  userName: string;
}

export interface Tags {
  id: number;
  tag: string;
}
export interface GeoJsonFeature {
  id: string;
  climber_names: string[];
  name: string;
  grade: string;
  tags: Tags[];
  conversation: ChatObject[];
}

export interface ChatProps {
  displayTrigger: number;
  climbName: string;
  climbGrade: string;
  climbChat: ChatObject[];
}

export interface ChatObject {
  message: string;
  name: string;
}

export interface MapObject {
  mapId: number;
  mapName: string;
  description: string;
  climbersOnMap?: string[];
}

export interface friendsObject {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}
