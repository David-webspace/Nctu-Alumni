export type BoardRegionKey = 'general' | 'taipei' | 'hsinchu' | 'taichung' | 'kaohsiung' | 'shanghai';

export type BoardListFieldKey =
  | 'viceChairmen'
  | 'executiveSecratary'
  | 'executiveDirectors'
  | 'directors'
  | 'altDirectors'
  | 'convener'
  | 'executiveSupervisors'
  | 'supervisors'
  | 'altSupervisors';

export interface Member {
  name: string;
  email: string;
  phone: string;
}

export type BoardRegion = {
  title: string;
  description: string;
  chairman: {
    name: string;
    title: string;
    img: string;
  };
} & {
  [K in BoardListFieldKey]: Member[];
};

export type BoardDataMap = Record<BoardRegionKey, BoardRegion>;