class CustomString {
  private str: string;

  constructor(content = "") {
    this.str = content;
  }

  get toISO(): string {
    return this.str;
  }

  public replaceAll = (
    find: string,
    replace: string,
    caseSensitive = false
  ): CustomString =>
    new CustomString(
      this.str.replace(new RegExp(find, caseSensitive ? "ig" : "g"), replace)
    );

  public normalize = (
    form: "NFC" | "NFD" | "NFKC" | "NFKD" = "NFD"
  ): CustomString =>
    new CustomString(this.str.normalize(form).replace(/[\u0300-\u036f]/g, ""));
}

export { CustomString };
