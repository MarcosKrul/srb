class RoutesPath {
  public static readonly READING_ROUTE: string = "/read";

  public static readonly CREATION_ROUTE: string = "/create";

  public static readonly LOGIN_ROUTE: string = "/login";

  public static readonly FORGOT_PASSWD: string = "/passwd/forgot";

  public static readonly RESET_PASSWD: string = "/passwd/reset/:token";

  public static readonly EMPLOYEE_ROUTES_PREFIX: string = "/employee";

  public static readonly SESSION_ROUTES_PREFIX: string = "/session";
}

export { RoutesPath };
