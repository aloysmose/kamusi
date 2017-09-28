export const getLetter = i => String.fromCharCode(65 + i);
export const loadEntries = (dictionary, page) => {
    switch (page) {
      case "a":
        return dictionary.a;
      case "b":
        return dictionary.b;
      case "c":
        return dictionary.c;
      case "d":
        return dictionary.d;
      case "e":
        return dictionary.e;
      case "f":
        return dictionary.f;
      case "g":
        return dictionary.g;
      case "h":
        return dictionary.h;
      case "i":
        return dictionary.i;
      case "j":
        return dictionary.j;
      case "k":
        return dictionary.k;
      case "l":
        return dictionary.l;
      case "m":
        return dictionary.m;
      case "n":
        return dictionary.n;
      case "o":
        return dictionary.o;
      case "p":
        return dictionary.p;
      case "q":
        return dictionary.q || {};
      case "r":
        return dictionary.r;
      case "s":
        return dictionary.s || {};
      case "t":
        return dictionary.t;
      case "u":
        return dictionary.u;
      case "v":
        return dictionary.v;
      case "w":
        return dictionary.w;
      case "x":
        return dictionary.x || {};
      case "y":
        return dictionary.y;
      case "z":
        return dictionary.z;
      default:
        return dictionary.a;
    }
  };