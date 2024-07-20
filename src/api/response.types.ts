export interface ApiResponse<R> {
  results: R;
  info: Info;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export type LoginParams = {
  username: string;
  password: string;
};
