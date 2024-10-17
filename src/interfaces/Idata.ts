export interface CompleteUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

type uid = Pick<CompleteUser, "id">;

export type User = CompleteUser | uid;

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
