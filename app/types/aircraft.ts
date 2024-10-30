export interface Aircraft {
  key: string;
  altNames: string[];
  generalData: {
    key: string;
    value: string;
  }[];
  weftDescription: {
    key: string;
    value: string;
  }[];
  imageurls: string[];
  primaryimgurl: string;
  hltag: string[];
  accat: string[];
  tags: string[];
  isabel: Isabel
}

export interface Isabel {
    wings: {
      type: string;
      placement: string;
      shape: string;
      slant: string;
      canards: boolean;
    };
    engine: {
      type: string;
      number: number;
      location: string;
    };
    fuselage: {
      shape: string;
      distinctiveFeatures: string[];
    };
    tail: {
      type: string;
      numberOfFins: number;
      tailRotor?: string;
    };
    dimensions: {
      length?: number;
      wingspan: number;
      height?: number | null;
    };
    roleData: {
      primaryRole: string;
      secondaryRole: string | null;
    };
}

export interface AircraftImageData {
  url: string;
  answers: string[];
}
