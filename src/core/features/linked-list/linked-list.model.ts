export type VisualisedLinkedListNode = {
  data: number;
  next: VisualisedLinkedListNode | null;
  x: number;
  y: number;
  linkPrevX: number;
  linkPrevY: number;
  linkToX: number;
  linkToY: number;
  linkFromX: number;
  linkFromY: number;
};

export type NodeCoordinates = {
  nodeX: number;
  nodeY: number;
};

export type DefaultBlock = {
  x: number;
  y: number;
  textX: number;
  textY: number;
  text: string;
  linkX: number;
  linkY: number;
};
