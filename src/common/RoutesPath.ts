class RoutesPath {
  public static readonly READING: string = "/read";

  public static readonly CREATION: string = "/create";

  public static readonly LOGIN: string = "/login";

  public static readonly FORGOT_PASSWD: string = "/passwd/forgot";

  public static readonly RESET_PASSWD: string = "/passwd/reset/:token";

  public static readonly UPDATE_PROFILE: string = "/update/profile/:id";

  public static readonly AVATAR_FILES: string = "/files/avatar";

  public static readonly REFRESH_TOKEN: string = "/refresh_token";
}

export { RoutesPath };
