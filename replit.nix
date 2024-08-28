{ pkgs }: {
  deps = [
    pkgs.python38Full
    pkgs.nodejs-16_x
    pkgs.nodePackages.npm
    pkgs.yarn
  ];
}