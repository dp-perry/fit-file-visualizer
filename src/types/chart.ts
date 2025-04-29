export type DataSetProps = {
  label: string,
  data: number[],
  backgroundColor?: string
  borderColor?: string;
  yAxisID?: string
  fill?: boolean;
  tension?: number;
}

export type YAxisConfig = {
  id: string;
  position: 'left' | 'right';
  title: string;
  stepSize: number;
  gridOnChart?: boolean;
  callback?: (value: any) => string;
  min?: number;
  autoMinFromDataset?: boolean
  max?: number;
}