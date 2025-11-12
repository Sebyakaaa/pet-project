export interface PostCardDTO {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface PostDTO extends PostCardDTO {
  content: string;
}
