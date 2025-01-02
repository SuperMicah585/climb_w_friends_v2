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

export type TempDic = {
  [key: string]: (Tags | null)[];
};

export type deleteTagItem = [string, number];

export type ClimbTagItem = [Tags, number];

export interface ChatObject {
  message: string;
  username?: string;
  ClimbChatId: number;
  auth0Id: string;
  MapToFeatureToClimbId?: number;
  CreatedAt?: string;
}

export interface Tags {
  id?: number;
  tagId: number;
  tagName: string;
  associatedAt?: string;
}

export interface GeoJsonObject {
  type: string;
  features: GeoJsonFeature[];
}
export interface GeoJsonFeature {
  geometry: Geometry;
  properties: Properties;
  id: number;
  type: string;
}

export interface ClimbWithDependencies {
  climb: ClimbsTableResponse;
  tags: Tags[];
  userObjectForFeature: null | UserObjectForFeature[];
  attempts: null | AttemptObject | TickAndAttemptObjectBeforeResponse;
  ticks: null | TickObject | TickAndAttemptObjectBeforeResponse;
  chatObject: ChatObject[];
}

export interface AttemptObject {
  attemptId: number;
  mapId: number;
  climbId: number;
  userId: number;
  attempts: string;
  difficulty: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TickObject {
  tickId: number;
  mapId: number;
  climbId: number;
  userId: number;
  attempts: string;
  difficulty: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TickAndAttemptObjectBeforeResponse {
  mapId: number;
  climbId: number;
  userId: string;
  attempts: string;
  difficulty: string;
  notes: string;
}

export interface UserObjectForFeature {
  userId?: number;
  auth0ID?: string;
  name?: string;
  username?: string;
}

interface Properties {
  climbs: number[];
}

interface Geometry {
  coordinates: number[];
  type: string;
}

export interface MapObject {
  mapId: number;
  mapName: string;
  description: string;
  climbersOnMap?: friendsObject[];
  climbCountOnMap: number;
}

export interface filterObject {
  users: UserObjectForFeature[];
  tags: Tags[];
  gradeRange: GradeRange;
}

export interface GradeRange {
  type: string;
  gradeStart: string;
  gradeEnd: string;
}

export interface friendsObject {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export interface userObject {
  userId: number;
  auth0Id: string;
  userName: string;
  name: string;
  email: string;
}
