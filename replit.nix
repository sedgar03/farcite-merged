{ pkgs }: {
  deps = [
    pkgs.python312Full
    pkgs.nodejs-18_x  # Node.js version 18.x
    pkgs.nodePackages.npm
    pkgs.yarn
  ];
}