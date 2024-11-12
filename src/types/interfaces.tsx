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

export interface Tags{
  id:number;
  tag:string
}
export interface GeoJsonFeature {
  id: string;
  climber_names: string[];
  name: string;
  grade: string;
}

export interface ChatProps {
  displayTrigger: number;
  climbName: string;
  climbGrade: string;
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
  peopleOnMap: friendsObject[];
}

export interface friendsObject {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}
