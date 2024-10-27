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
  imageUrls: string[];
}

export interface AircraftImageData {
  url: string;
  answers: string[];
}
