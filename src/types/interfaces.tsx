export interface ClimbsTableResponse {
  ID: number;
  Route: string;
  Location: string;
  URL: string;
  'AVG STARS': number;
  'Your Stars': number;
  'Route Type': string;
  Rating: string;
  Pitches: number;
  Length: string;
  'Area Latitude': number;
  'Area Longitude': number;
}

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
  id: number;
  name: string;
  description: string;
  totalClimbs: number;
  tags: Tags[];
  peopleOnMap: friendsObject[];
}

export interface friendsObject {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}
