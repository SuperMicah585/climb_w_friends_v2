export interface ClimbsTableResponse {
  climbId: number;
  climbName: string;
  location: string;
  url: string;
  avgStars: number;
  climbType: string;
  rating: string;
  pitches: number;
  areaLatitude: number;
  areaLongitude: number;
  coordinates: number[];
}

export interface AddClimbsModalProps {
  location: string;
  routeType: string;
  closeAddClimbsModalCallBack: (trigger: boolean) => void;
  mapId: number;
}

export type TempDic = {
  [key: string]: (Tags | null)[];
};

export type deleteTagItem = [string, number];

export type ClimbTagItem = [Tags, number];

export interface Micah {
  name: string;
  id: number;
  email: string;
  userName: string;
}

export interface Tags {
  id?: number;
  tagId: number;
  tagName: string;
  associatedAt?: string;
}
export interface GeoJsonFeature {
  climbId: string;
  climber_names: string[];
  climbName: string;
  rating: string;
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
  climbersOnMap?: friendsObject[];
}

export interface friendsObject {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}
