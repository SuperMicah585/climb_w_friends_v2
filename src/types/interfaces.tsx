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
  climbersOnMap?: FriendsList[];
  climbCountOnMap?: number;
}

export interface MapEvent {
  action: string;
  details: string;
  updatedAt: string;
  name: string;
  username: string;
}

export interface filterObject {
  userFilters: UserFilter[];
  tagFilters: TagFilter[];
  gradeRangeFilters: GradeRange[];
}

export interface UserFilter {
  id: number;
  auth0Id: string;
  name: string;
  username: string;
}

export interface FriendsList {
  auth0Id: string;
  name: string;
  username: string;
}

export interface UsersOnMap {
  userId: string;
  auth0ID: string;
  name: string;
  username: string;
}

export interface TagFilter {
  tagId: number;
  tagName: string;
}

export interface GradeRange {
  type: string;
  toGrade: string;
  fromGrade: string;
}

export interface userObject {
  userId: number;
  auth0Id: string;
  userName: string;
  name: string;
  email: string;
}
