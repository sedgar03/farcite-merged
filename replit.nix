{ pkgs }: {
  deps = [
    pkgs.python312Full
    pkgs.nodejs-16_x
    pkgs.nodePackages.npm
    pkgs.yarn
  ];
}