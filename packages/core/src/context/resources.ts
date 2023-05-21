export interface ResourceOptions {
  mapToSrc?: (src: string) => string
}

export class CpuResources {
  constructor(public mapToSrc: (src: string) => string) {}
}
