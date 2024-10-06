declare module 'three/examples/jsm/loaders/SVGLoader' {
  import { Loader, ShapePath } from 'three';

  export class SVGLoader extends Loader {
    constructor();
    load(
      url: string,
      onLoad: (data: { paths: ShapePath[]; xml: XMLDocument }) => void,
      onProgress?: (request: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(text: string): { paths: ShapePath[]; xml: XMLDocument };
  }
}
