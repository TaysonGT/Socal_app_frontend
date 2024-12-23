export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  created_at: Date;
}

export type PostType = {
  id: string;
  user_id: string;
  content: string;
  created_at: Date;
}

export type FriendRequestType = {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
}

export type LikeType = {
  id: string;
  user_id: string;
  type: string;
  comment_id: string | null;
  post_id: string | null;
}

export type CommentType = {
  id: string;
  user_id: string;
  content: string;
  post_id: string;
  created_at: Date;
}