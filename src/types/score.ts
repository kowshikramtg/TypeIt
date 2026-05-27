export interface Score {
  id: string;

  uid: string;
  name: string;
  photoURL: string;

  wpm: number;
  accuracy: number;
  mistakes: number;

  createdAt: any;
}