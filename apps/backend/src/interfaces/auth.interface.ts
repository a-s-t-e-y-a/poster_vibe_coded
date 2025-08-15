export interface UserData {
  id: string;
  primary_email_verified: boolean;
  primary_email_auth_enabled: boolean;
  signed_up_at_millis: number;
  last_active_at_millis: number;
  is_anonymous: boolean;
  primary_email: string;
  display_name: string;
  selected_team_id: string;
  profile_image_url: string;
}

export interface UserRootObject {
  type: string;
  data: UserData;
}