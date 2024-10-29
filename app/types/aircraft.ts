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
  I_S_A_B_E_L: {
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
    };
    dimensions: {
      length: number;
      wingspan: number;
      height: number;
    };
    roleData: {
      primaryRole: string;
      secondaryRole: string | null;
    };
  };
}

export interface AircraftImageData {
  url: string;
  answers: string[];
}
