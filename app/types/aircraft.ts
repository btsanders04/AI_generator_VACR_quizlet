import { ObjectId } from "mongodb";

export interface Aircraft {
  url: any;
  id: string;
  key: string;
  altNames: string[];
  tags: string[];
  h1tag: string[];
  generalData: {
    key: string;
    value: string;
  }[];
  weftDescription: {
    key: string;
    value: string;
  }[];
  imageUrls: string[];
  accat: string[];
  isabel: IsabelData;
}

export interface WingsData {
  type: string;
  placement: string;
  shape: string;
  slant: string;
  canards: boolean;
  }
 
 export interface EngineData {
  type: string;
  number: number;
  location: string;
 }
 
 export interface FuselageData {
  shape: string;
  distinctiveFeatures: string[];
 }
 
 export interface TailData {
  type: string;
  numberOfFins: number;
 }
 
 export interface DimensionsData {
  length: number;
  wingspan: number;
  height: number;
 }
 
 export interface RoleData {
  primaryRole: string;
  secondaryRole: string;
 }
 
 export interface IsabelData {
  wings: WingsData;
  engine: EngineData;
  fuselage: FuselageData;
  tail: TailData;
  dimensions: DimensionsData;
  roleData: RoleData;
 }
 